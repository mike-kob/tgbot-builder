package api

import (
	"fmt"
	"github.com/getsentry/sentry-go"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
)

//CreateBotHandler receives JSON representation of and creates runnable bot in DB
func (c apiController) CreateBotHandler(writer http.ResponseWriter, request *http.Request) {
	// Decode JSON body into Bot
	bot, err := parseBotFromBody(request)
	if err != nil {
		sentry.CaptureException(err)
		writer.Write([]byte("Cannot parse bot"))
		writer.WriteHeader(400)
		return
	}

	// Confirm telegram knows the bot
	api, err := tg.NewBotAPI(bot.Token)
	if err != nil {
		sentry.CaptureException(err)
		writer.Write([]byte("Invalid token"))
		writer.WriteHeader(400)
		return
	}

	// Insert bot into db
	err = c.BotRepo.Insert(bot)
	if err != nil {
		sentry.CaptureException(err)
		writer.WriteHeader(500)
		return
	}

	// Set webhook for bot
	url := fmt.Sprintf("%s/update/%s", os.Getenv("RUNTIME_URL"), bot.ID.Hex())
	_, err = api.SetWebhook(tg.NewWebhook(url))
	if err != nil {
		writer.WriteHeader(500)
		sentry.CaptureException(err)
		return
	}
}

//UpdateBotHandler updates existing in DB bot
func (c apiController) UpdateBotHandler(writer http.ResponseWriter, request *http.Request) {
	botID, err := parseBotIdFromRequest(request)
	if err != nil {
		sentry.CaptureException(err)
		return
	}

	bot, err := parseBotFromBody(request)
	if err != nil {
		sentry.CaptureException(err)
		return
	}
	bot.ID = *botID

	err = c.BotRepo.Update(bot)
	if err != nil {
		sentry.CaptureException(err)
		return
	}
}

//DeleteBotHandler deletes bot from DB
func (c apiController) DeleteBotHandler(writer http.ResponseWriter, request *http.Request) {
	botID := chi.URLParam(request, "id")
	err := c.BotRepo.Delete(botID)
	if err != nil {
		sentry.CaptureException(err)
	}
}
