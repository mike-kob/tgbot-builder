package storage

import (
	"bot-execution/services"
	"encoding/json"
)

type botRedisRepo struct {
	rdb services.IRedis
}

//NewBotRedisRepository creates new repository
func NewBotRedisRepository() BotRepository {
	rdb := services.NewRedis()

	return botRedisRepo{
		rdb: *rdb,
	}
}

func (r botRedisRepo) Find(botID string) (*DbBot, error) {
	res, err := r.rdb.HGet(botID, "_info")
	if err != nil {
		return nil, err
	}
	v, err := r.rdb.HGet(botID, "_version")
	if err != nil {
		return nil, err
	}

	var bot DbBot
	err = json.Unmarshal(res, &bot)
	if err != nil {
		return nil, err
	}
	bot.Version = string(v[:])
	return &bot, nil
}

func (r botRedisRepo) Insert(bot *DbBot) error {
	res, err := json.Marshal(bot)
	if err != nil {
		return err
	}

	return r.rdb.HSet(bot.ID, "_info", res)
}

func (r botRedisRepo) Delete(botID string) error {
	return r.rdb.Del(botID)
}

func (r botRedisRepo) GetUserIDsByState(botID, state string) ([]string, error) {
	setKey := botID + ":state_" + state
	return r.rdb.SMembers(setKey)
}
