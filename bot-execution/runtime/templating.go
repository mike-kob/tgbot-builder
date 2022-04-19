package runtime

import (
	"bot-execution/storage"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"regexp"
	"strconv"
	"time"
)

var templateVarPattern = regexp.MustCompile("\\{\\{ (\\w+)\\.(\\w+) \\}\\}")

func createUpdateDict(upd *tg.Update) map[string]string {
	if upd == nil {
		return map[string]string{}
	}

	return map[string]string{
		"message_message_id":         strconv.Itoa(upd.Message.MessageID),
		"message_date":               time.Unix(int64(upd.Message.Date), 0).Format(time.RFC822),
		"message_time":               time.Unix(int64(upd.Message.Date), 0).Format("15:04:05"),
		"message_text":               upd.Message.Text,
		"message_from_id":            strconv.Itoa(upd.Message.From.ID),
		"message_from_first_name":    upd.Message.From.FirstName,
		"message_from_last_name":     upd.Message.From.LastName,
		"message_from_username":      upd.Message.From.UserName,
		"message_from_language_code": upd.Message.From.LanguageCode,
		"message_chat_type":          upd.Message.Chat.Type,
		"message_chat_title":         upd.Message.Chat.Title,
		"message_chat_username":      upd.Message.Chat.UserName,
		"message_chat_first_name":    upd.Message.Chat.FirstName,
		"message_chat_last_name":     upd.Message.Chat.LastName,
		"message_chat_description":   upd.Message.Chat.Description,
	}
}

func RenderTemplate(content string, upd *tg.Update, user *storage.BotUser) string {
	updDict := createUpdateDict(upd)

	replaceSingleVariable := func(expr string) string {
		match := templateVarPattern.FindStringSubmatch(expr)

		source := match[1]
		key := match[2]

		switch source {
		case "DB":
			return user.Db[key]
		case "UPD":
			return updDict[key]
		default:
			return ""
		}
	}

	return templateVarPattern.ReplaceAllStringFunc(content, replaceSingleVariable)
}
