package runtime

import (
	"bot-execution/storage"
	"github.com/getsentry/sentry-go"
	log "github.com/sirupsen/logrus"

	"errors"
	"regexp"
)

func ExecuteOnUpdate(ctx *ExecutionContext) error {
	err := ctx.Rabbitmq.PublishUpdate(ctx.Bot.ID, ctx.Upd)
	if err != nil {
		log.Errorf("Error publishing update: %s", err)
		sentry.CaptureException(err)
	}

	if !ctx.Bot.Active {
		return nil
	}

	switch true {
	case isCommandUpdate(ctx.Upd):
		return runCommand(ctx)
	case isMessageUpdate(ctx.Upd):
		return runMessage(ctx)
	default:
		return errors.New("update type not recognized")
	}
}

func ExecuteOnTask(ctx *ExecutionContext, scheduleID string) error {
	if !ctx.Bot.Active {
		return nil
	}

	for _, trigger := range ctx.State.ScheduleTriggers[scheduleID] {
		err := runAction(&trigger, ctx)
		if err != nil {
			return err
		}
	}

	return nil
}

func runCommand(ctx *ExecutionContext) error {
	cmdStr := ctx.Upd.Message.Text

	for cmd, triggers := range ctx.State.CmdTriggers {
		if cmdStr == cmd {
			for _, trigger := range triggers {
				err := runAction(&trigger, ctx)
				if err != nil {
					return err
				}
			}
		}
	}

	return nil
}

func runMessage(ctx *ExecutionContext) error {
	msg := ctx.Upd.Message.Text

	for pattern, triggers := range ctx.State.MsgTriggers {
		match, _ := regexp.MatchString(pattern, msg)
		if match {
			for _, trigger := range triggers {
				err := runAction(&trigger, ctx)
				if err != nil {
					return err
				}
			}
			break
		}
	}

	return nil
}

func runAction(action *storage.Action, ctx *ExecutionContext) error {
	switch action.Type {
	case "send_message":
		return sendMessage(action, ctx)
	case "change_state":
		return changeState(action, ctx)
	case "make_request":
		return makeRequest(action, ctx)
	case "save_user_data":
		return saveUserData(action, ctx)
	default:
		return errors.New("action not recognized")
	}
}
