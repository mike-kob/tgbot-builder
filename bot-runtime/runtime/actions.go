package runtime

import (
	"bot-runtime/storage"
	"strings"

	tg "github.com/go-telegram-bot-api/telegram-bot-api"
)

//sendMessage sends message to telegram user
func sendMessage(trigger *storage.Action, updCtx *updateContext) error {
	text := trigger.Options["text"].(string)
	var input string
	if updCtx.upd.Message != nil {
		input = updCtx.upd.Message.Text
	} else {
		input = ""
	}

	newText := strings.Replace(text, "{input}", input, -1)
	msg := tg.NewMessage(updCtx.upd.Message.Chat.ID, newText)
	_, err := updCtx.api.Send(msg)
	return err
}

//changeState changes user state in DB
func changeState(trigger *storage.Action, updCtx *updateContext) error {
	newState := trigger.Options["state"]
	user, err := (*updCtx.userDB).UpdateState(updCtx.user, newState.(string))
	if err != nil {
		return err
	}
	updCtx.user = user
	return nil
}
