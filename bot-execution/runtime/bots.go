package runtime

import (
	"bot-execution/storage"

	"errors"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"regexp"
)

func runUpdate(
	botID string,
	upd *tg.Update,
	userRepo *storage.UserBotRepository,
	botRepo *storage.BotRepository,
) error {
	updCtx, err := newUpdateContext(botID, upd, botRepo, userRepo)
	if err != nil {
		return err
	}

	switch true {
	case isCommandUpdate(upd):
		return runCommand(updCtx)
	case isMessageUpdate(upd):
		return runMessage(updCtx)
	default:
		return errors.New("update type not recognized")
	}
}

func runCommand(updCtx *updateContext) error {
	state, ok := updCtx.bot.States[updCtx.user.State]
	if !ok {
		return errors.New("failed to find state")
	}

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

func runMessage(updCtx *updateContext) error {
	state := getState(updCtx)
	if state == nil {
		return errors.New("failed to find state")
	}

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
	default:
		return errors.New("action not recognized")
	}
}
