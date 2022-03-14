package runtime

import (
	"bot-execution/storage"

	"net/http"
	"strconv"

	"github.com/go-telegram-bot-api/telegram-bot-api"
)

type updateContext struct {
	api    *tgbotapi.BotAPI
	bot    *storage.DbBot
	user   *storage.BotUser
	upd    *tgbotapi.Update
	botDB  *storage.BotRepository
	userDB *storage.UserBotRepository
}

//newUpdateContext gathers all needed info for Update processing into updateContext object
func newUpdateContext(
	botID string,
	upd *tgbotapi.Update,
	botRepo *storage.BotRepository,
	userRepo *storage.UserBotRepository,
) (*updateContext, error) {
	// Fetch bot
	bot, err := (*botRepo).Find(botID)
	if err != nil {
		return nil, err
	}

	// Fetch user
	userProfile, err := getUserInfo(upd)
	if err != nil {
		return nil, err
	}
	userID := strconv.Itoa(userProfile.ID)
	userBot, err := findOrCreateUser(userID, botID, userProfile, userRepo)
	if err != nil {
		return nil, err
	}

	// Create Bot API
	api := &tgbotapi.BotAPI{
		Token:  bot.Token,
		Client: &http.Client{},
		Buffer: 100,
	}

	// Create and return context
	return &updateContext{
		api:    api,
		bot:    bot,
		user:   userBot,
		upd:    upd,
		botDB:  botRepo,
		userDB: userRepo,
	}, nil
}
