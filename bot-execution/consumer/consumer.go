package main

import (
	"bot-execution/runtime"
	"bot-execution/scheduling"
	"bot-execution/services"
	"bot-execution/storage"
	"time"

	"github.com/getsentry/sentry-go"
	log "github.com/sirupsen/logrus"
)

type taskQueueConsumer struct {
	queue       scheduling.TaskQueue
	UserBotRepo storage.UserBotRepository
	BotRepo     storage.BotRepository
	Rabbitmq    services.RabbitmqChannel
}

func NewTaskQueueConsumer() *taskQueueConsumer {
	queue := scheduling.NewRedisTaskQueue()
	userRepo := storage.NewUserRedisRepository()
	botRepo := storage.NewBotRedisRepository()
	channel := services.NewRabbitmqChannel()

	return &taskQueueConsumer{
		queue:       queue,
		UserBotRepo: userRepo,
		BotRepo:     botRepo,
		Rabbitmq:    channel,
	}
}

func (c *taskQueueConsumer) Consume() {
	log.Info("Consumer startup")
	start := time.Now().Add(-24 * time.Hour)
	end := time.Now()
	log.Infof("Consuming for interval [%s, %s]", start, end)

	size, err := c.queue.Size()
	if err != nil {
		sentry.CaptureException(err)
		log.Errorf("Error getting queue size %s", err)
	}

	if size == 0 {
		log.Info("Queue is empty. Finishing.")
		return
	}

	tasks, err := c.queue.Fetch(start, end)
	if err != nil {
		sentry.CaptureException(err)
		log.Errorf("Error fetching tasks %s", err)
	}

	log.Infof("Processing %d tasks", len(tasks))
	for _, task := range tasks {
		err := c.consumeOneTask(task)
		if err != nil {
			sentry.CaptureException(err)
			log.Errorf("Error executing task %s", err)
		}
	}
}

func (c *taskQueueConsumer) consumeOneTask(task *scheduling.Task) error {
	ctx, err := newContextFromTask(task, &c.BotRepo, &c.UserBotRepo, &c.Rabbitmq)
	if err != nil {
		return err
	}

	if !ctx.Bot.Active || ctx.Bot.Version != task.BotVersion {
		return nil
	}

	userIDs, err := c.BotRepo.GetUserIDsByState(task.BotID, task.StateID)
	if err != nil {
		return err
	}

	botUsers, err := c.UserBotRepo.FindMany(task.BotID, userIDs)
	if err != nil {
		return err
	}

	for _, botUser := range botUsers {
		ctx.User = botUser
		err := runtime.ExecuteOnTask(ctx, task.ScheduleID)
		if err != nil {
			sentry.CaptureException(err)
			log.Errorf("Error executing task for user: %s", err)
		}
	}

	return nil
}
