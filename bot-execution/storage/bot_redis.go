package storage

import (
	"os"
	"fmt"
	"context"
	"encoding/json"
	"github.com/go-redis/redis/v8"
)

type botRedisRepo struct {
	Ctx context.Context
	Rdb redis.Client
}

//NewBotRedisRepository creates new repository
func NewBotRedisRepository() BotRepository {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:6379", os.Getenv("REDIS_HOST")),
	})

	return botRedisRepo{
		Ctx: ctx,
		Rdb: *rdb,
	}
}

func (r botRedisRepo) Find(id string) (*DbBot, error) {
	var bot DbBot
	var reply = r.Rdb.HGet(r.Ctx, id, "_info")
	res, err := reply.Bytes()
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(res, &bot)
	if err != nil {
		return nil, err
	}
	return &bot, nil
}

func (r botRedisRepo) Update(bot *DbBot) error {
	return r.Insert(bot)
}

func (r botRedisRepo) Insert(bot *DbBot) error {
	res, err := json.Marshal(bot)
	if err != nil {
		return err
	}
	reply := r.Rdb.HSet(r.Ctx, bot.ID.String(), "_info", res)
	return reply.Err()
}

func (r botRedisRepo) Delete(id string) error {
	reply := r.Rdb.Del(r.Ctx, id)
	return reply.Err()
}
