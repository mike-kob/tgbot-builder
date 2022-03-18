package runtime

import (
	"bot-execution/storage"
	"github.com/getsentry/sentry-go"

	"errors"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"regexp"
)

func runUpdate(
	botID string,
	upd *tg.Update,
	userRepo *storage.UserBotRepository,
	botRepo *storage.BotRepository,
	rabbitmq *storage.RabbitmqChannel,
) error {
	updCtx, err := newUpdateContext(botID, upd, botRepo, userRepo, rabbitmq)
	if err != nil {
		return err
	}
	err = rabbitmq.PublishUpdate(updCtx.bot.ID.Hex(), upd)
	if err != nil {
		sentry.CaptureException(err)
	}
	state, ok := updCtx.bot.States[updCtx.user.State]
	if !ok {
		return errors.New("failed to find state")
	}

	switch true {
	case isCommandUpdate(upd):
		return runCommand(updCtx, &state)
	case isMessageUpdate(upd):
		return runMessage(updCtx, &state)
	default:
		return errors.New("update type not recognized")
	}
}

func runCommand(updCtx *updateContext, state *storage.State) error {
	cmdStr := updCtx.upd.Message.Text

	for cmd, triggers := range state.CmdTriggers {
		if cmdStr == cmd {
			for _, trigger := range triggers {
				err := runAction(&trigger, updCtx)
				if err != nil {
					return err
				}
			}
		}
	}

	return nil
}

func runMessage(updCtx *updateContext, state *storage.State) error {
	msg := updCtx.upd.Message.Text

	for pattern, triggers := range state.MsgTriggers {
		match, _ := regexp.MatchString(pattern, msg)
		if match {
			for _, trigger := range triggers {
				err := runAction(&trigger, updCtx)
				if err != nil {
					return err
				}
			}
			break
		}
	}

	return nil
}

func runAction(action *storage.Action, updCtx *updateContext) error {
	switch action.Type {
	case "send_message":
		return sendMessage(action, updCtx)
	case "change_state":
		return changeState(action, updCtx)
	case "make_request":
		return makeRequest(action, updCtx)
	default:
		return errors.New("action not recognized")
	}
}
