package main

import (
	"bot-execution/runtime"
	"bot-execution/services"
	"bot-execution/storage"
	"encoding/json"
	"github.com/getsentry/sentry-go"
	"github.com/go-chi/chi"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"net/http"
)

type controller struct {
	UserBotRepo storage.UserBotRepository
	BotRepo     storage.BotRepository
	Rabbitmq    services.RabbitmqChannel
}

func newApiController() controller {
	userRepo := storage.NewUserRedisRepository()
	botRepo := storage.NewBotRedisRepository()
	channel := services.NewRabbitmqChannel()

	return controller{
		UserBotRepo: userRepo,
		BotRepo:     botRepo,
		Rabbitmq:    channel,
	}
}

//updateHandler processes request coming from BotAPI
func (c controller) updateHandler(writer http.ResponseWriter, request *http.Request) {
	botID := chi.URLParam(request, "id")
	update, err := parseUpdateFromBody(request)
	if err != nil {
		sentry.CaptureException(err)
		return
	}
	ctx, err := newContextFromUpdate(botID, update, c.BotRepo, c.UserBotRepo, c.Rabbitmq)
	if err != nil {
		sentry.CaptureException(err)
		return
	}

	err = runtime.ExecuteOnUpdate(ctx)
	if err != nil {
		sentry.CaptureException(err)
	}

	writer.WriteHeader(200)
}

func parseUpdateFromBody(request *http.Request) (*tg.Update, error) {
	var update tg.Update
	err := json.NewDecoder(request.Body).Decode(&update)
	if err != nil {
		return nil, err
	}

	return &update, nil
}
