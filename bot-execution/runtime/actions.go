package runtime

import (
	"bot-execution/storage"
	"errors"
	"net/http"
	"strings"

	tg "github.com/go-telegram-bot-api/telegram-bot-api"
)

//sendMessage sends message to telegram User
func sendMessage(trigger *storage.Action, ctx *ExecutionContext) error {
	text := trigger.Options["text"].(string)
	text = RenderTemplate(text, ctx.Upd, ctx.User)
	msgConfig := tg.NewMessage(int64(ctx.User.Profile.ID), text)
	msg, err := ctx.Api.Send(msgConfig)
	if err != nil {
		return err
	}

	return ctx.Rabbitmq.PublishSendMessage(ctx.Bot.ID, &msg)
}

//changeState changes User state in DB
func changeState(trigger *storage.Action, ctx *ExecutionContext) error {
	oldStateId := ctx.User.State
	newStateId := trigger.Options["state"].(string)
	state, ok := ctx.Bot.States[newStateId]
	if !ok {
		return errors.New("failed to find state")
	}

	user, err := ctx.UserDB.UpdateState(ctx.User, newStateId)
	if err != nil {
		return err
	}
	ctx.User = user

	for _, trigger := range state.DefaultTriggers {
		err := runAction(&trigger, ctx)
		if err != nil {
			return err
		}
	}

	return ctx.Rabbitmq.PublishChangeState(ctx.Bot.ID, oldStateId, newStateId, &ctx.User.Profile)
}

//makeRequest makes request to API
func makeRequest(trigger *storage.Action, ctx *ExecutionContext) error {
	method := trigger.Options["method"].(string)
	url := trigger.Options["url"].(string)
	headers := trigger.Options["headers"].(map[string]interface{})
	body := trigger.Options["body"].(string)

	url = RenderTemplate(url, ctx.Upd, ctx.User)
	body = RenderTemplate(body, ctx.Upd, ctx.User)

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

	return ctx.Rabbitmq.PublishMakeRequest(ctx.Bot.ID, &ctx.User.Profile, req, res, err)
}

//saveUserData saves data to User storage
func saveUserData(trigger *storage.Action, ctx *ExecutionContext) error {
	key := trigger.Options["key"].(string)
	value := trigger.Options["value"].(string)

	value = RenderTemplate(value, ctx.Upd, ctx.User)

	ctx.User.Db[key] = value
	err := ctx.UserDB.Insert(ctx.User)
	if err != nil {
		return err
	}

	return ctx.Rabbitmq.PublishSaveUserData(ctx.Bot.ID, &ctx.User.Profile, key, value)
}
