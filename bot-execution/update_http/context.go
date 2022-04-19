package main

import (
	"bot-execution/runtime"
	"bot-execution/services"
	"bot-execution/storage"
	"errors"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"net/http"
	"strconv"
)

//newContextFromUpdate gathers all needed info for Update processing into ExecutionContext object
func newContextFromUpdate(
	botID string,
	upd *tgbotapi.Update,
	botRepo storage.BotRepository,
	userRepo storage.UserBotRepository,
	rabbitmq services.RabbitmqChannel,
) (*runtime.ExecutionContext, error) {
	// Fetch bot
	bot, err := botRepo.Find(botID)
	if err != nil {
		return nil, err
	}

	// Fetch user
	userProfile, err := getUserInfo(upd)
	if err != nil {
		return nil, err
	}
	userID := strconv.Itoa(userProfile.ID)
	botUser, err := findOrCreateUser(userID, botID, userProfile, userRepo)
	if err != nil {
		return nil, err
	}

	// Create Bot API
	api := tgbotapi.BotAPI{
		Token:  bot.Token,
		Client: &http.Client{},
		Buffer: 100,
	}

	// Select state
	state, ok := bot.States[botUser.State]
	if ok != true {
		//return nil, errors.New("could not find state '" + botUser.State + "' for bot")
	}

	// Create and return context
	return &runtime.ExecutionContext{
		Bot:      bot,
		User:     botUser,
		Upd:      upd,
		State:    &state,
		Api:      api,
		BotDB:    botRepo,
		UserDB:   userRepo,
		Rabbitmq: rabbitmq,
	}, nil
}

func getUserInfo(upd *tgbotapi.Update) (*tgbotapi.User, error) {
	if upd.Message != nil {
		return upd.Message.From, nil
	}
	if upd.CallbackQuery != nil {
		return upd.CallbackQuery.From, nil
	}

	return nil, errors.New("cannot deduce User info from update")
}

func findOrCreateUser(
	userID string,
	botID string,
	profile *tgbotapi.User,
	userRepo storage.UserBotRepository,
) (*storage.BotUser, error) {
	userBot, err := userRepo.Find(botID, userID)
	if err != nil {
		return nil, err
	}

	if userBot == nil {
		userBot = &storage.BotUser{
			BotID:   botID,
			UserID:  userID,
			State:   "init",
			Profile: *profile,
			Db:      map[string]string{},
		}
		err = userRepo.Insert(userBot)
		if err != nil {
			return nil, err
		}
	}

	return userBot, nil
}
