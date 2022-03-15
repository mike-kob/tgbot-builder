package runtime

import (
	"bot-execution/storage"
	"errors"

	"encoding/json"
	"net/http"
	"strings"

	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func parseUpdateFromBody(request *http.Request) (*tg.Update, error) {
	var update tg.Update
	err := json.NewDecoder(request.Body).Decode(&update)
	if err != nil {
		return nil, err
	}

	return &update, nil
}

func isCommandUpdate(upd *tg.Update) bool {
	return upd.Message != nil && strings.HasPrefix(upd.Message.Text, "/")
}

func isMessageUpdate(upd *tg.Update) bool {
	return upd.Message != nil && !strings.HasPrefix(upd.Message.Text, "/")
}

func getUserInfo(upd *tg.Update) (*tg.User, error) {
	if upd.Message != nil {
		return upd.Message.From, nil
	}
	if upd.CallbackQuery != nil {
		return upd.CallbackQuery.From, nil
	}

	return nil, errors.New("cannot deduce user info from update")
}

func findOrCreateUser(
	userID string,
	botID string,
	user *tg.User,
	userRepo *storage.UserBotRepository,
) (*storage.BotUser, error) {

	parsedBotID, err := primitive.ObjectIDFromHex(botID)
	if err != nil {
		return nil, err
	}

	userBot, err := (*userRepo).Find(userID, botID)
	if err != nil {
		return nil, err
	}

	if userBot == nil {
		userBot = &storage.BotUser{
			BotID:  parsedBotID,
			UserID: userID,
			// TODO constants
			State:   "init",
			Profile: *user,
			Db:      map[string]string{},
		}
		err = (*userRepo).Insert(userBot)
		if err != nil {
			return nil, err
		}
	}

	return userBot, nil
}
