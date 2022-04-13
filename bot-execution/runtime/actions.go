package runtime

import (
	"bot-execution/storage"
	"errors"
	"net/http"
	"strings"

	tg "github.com/go-telegram-bot-api/telegram-bot-api"
)

//sendMessage sends message to telegram user
func sendMessage(trigger *storage.Action, updCtx *updateContext) error {
	text := trigger.Options["text"].(string)
	text = RenderTemplate(text, updCtx.upd, updCtx.user)

	msgConfig := tg.NewMessage(updCtx.upd.Message.Chat.ID, text)
	msg, err := updCtx.api.Send(msgConfig)
	if err != nil {
		return err
	}

	return updCtx.rabbitmq.PublishSendMessage(updCtx.bot.ID.Hex(), &msg)
}

//changeState changes user state in DB
func changeState(trigger *storage.Action, updCtx *updateContext) error {
	oldState := updCtx.user.State
	newState := trigger.Options["state"].(string)
	state, ok := updCtx.bot.States[newState]
	if !ok {
		return errors.New("failed to find state")
	}

	user, err := (*updCtx.userDB).UpdateState(updCtx.user, state.Name)
	if err != nil {
		return err
	}
	updCtx.user = user

	for _, trigger := range state.DefaultTriggers {
		err := runAction(&trigger, updCtx)
		if err != nil {
			return err
		}
	}

	return updCtx.rabbitmq.PublishChangeState(updCtx.bot.ID.Hex(), oldState, newState, updCtx.upd.Message.Chat)
}

//makeRequest makes request to API
func makeRequest(trigger *storage.Action, updCtx *updateContext) error {
	method := trigger.Options["method"].(string)
	url := trigger.Options["url"].(string)
	headers := trigger.Options["headers"].(map[string]interface{})
	body := trigger.Options["body"].(string)

	url = RenderTemplate(url, updCtx.upd, updCtx.user)
	body = RenderTemplate(body, updCtx.upd, updCtx.user)

	req, err := http.NewRequest(method, url, strings.NewReader(body))
	if err != nil {
		return err
	}
	req.Header = http.Header{}
	for key, val := range headers {
		req.Header.Add(key, val.(string))
	}

	client := http.Client{}
	res, err := client.Do(req)

	return updCtx.rabbitmq.PublishMakeRequest(updCtx.bot.ID.Hex(), updCtx.upd.Message.Chat, req, res, err)
}

//saveUserData saves data to user storage
func saveUserData(trigger *storage.Action, updCtx *updateContext) error {
	key := trigger.Options["key"].(string)
	value := trigger.Options["value"].(string)

	value = RenderTemplate(value, updCtx.upd, updCtx.user)

	updCtx.user.Db[key] = value
	err := (*updCtx.userDB).Insert(updCtx.user)
	if err != nil {
		return err
	}

	return updCtx.rabbitmq.PublishSaveUserData(updCtx.bot.ID.Hex(), updCtx.upd.Message.Chat, key, value)
}
