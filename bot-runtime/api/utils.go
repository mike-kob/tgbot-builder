package api

import (
	"bot-runtime/storage"
	"encoding/json"
	"github.com/go-chi/chi"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

func parseBotFromBody(request *http.Request) (*storage.DbBot, error) {
	var bot storage.DbBot
	err := json.NewDecoder(request.Body).Decode(&bot)
	if err != nil {
		return nil, err
	}

	return &bot, nil
}

func parseBotIdFromRequest(request *http.Request) (*primitive.ObjectID, error)  {
	botID := chi.URLParam(request, "id")
	parsedBotID, err := primitive.ObjectIDFromHex(botID)
	if err != nil {
		return nil, err
	}

	return &parsedBotID, nil
}