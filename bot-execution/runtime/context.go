package runtime

import (
	"bot-execution/services"
	"bot-execution/storage"

	"github.com/go-telegram-bot-api/telegram-bot-api"
)

type ExecutionContext struct {
	Bot      *storage.DbBot
	User     *storage.BotUser
	Upd      *tgbotapi.Update
	State    *storage.State
	Api      tgbotapi.BotAPI
	BotDB    storage.BotRepository
	UserDB   storage.UserBotRepository
	Rabbitmq services.RabbitmqChannel
}
