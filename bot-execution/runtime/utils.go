package runtime

import (
	"strings"

	tg "github.com/go-telegram-bot-api/telegram-bot-api"
)

func isCommandUpdate(upd *tg.Update) bool {
	return upd.Message != nil && strings.HasPrefix(upd.Message.Text, "/")
}

func isMessageUpdate(upd *tg.Update) bool {
	return upd.Message != nil && !strings.HasPrefix(upd.Message.Text, "/")
}
