package main

import (
	"bot-execution/runtime"
	"bot-execution/scheduling"
	"bot-execution/services"
	"bot-execution/storage"
	"errors"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"net/http"
)

//newContextFromUpdate gathers all needed info for Update processing into ExecutionContext object
func newContextFromTask(
	task *scheduling.Task,
	botRepo *storage.BotRepository,
	userRepo *storage.UserBotRepository,
	rabbitmq *services.RabbitmqChannel,
) (*runtime.ExecutionContext, error) {
	// Fetch bot
	bot, err := (*botRepo).Find(task.BotID)
	if err != nil {
		return nil, err
	}

	// Select state
	state, ok := bot.States[task.StateID]
	if ok != true {
		return nil, errors.New("could not find state '" + task.StateID + "' for bot")
	}

	// Create Bot API
	api := &tgbotapi.BotAPI{
		Token:  bot.Token,
		Client: &http.Client{},
		Buffer: 100,
	}

	// Create and return context
	return &runtime.ExecutionContext{
		Bot:      bot,
		User:     nil,
		Upd:      nil,
		State:    &state,
		Api:      *api,
		BotDB:    *botRepo,
		UserDB:   *userRepo,
		Rabbitmq: *rabbitmq,
	}, nil
}
