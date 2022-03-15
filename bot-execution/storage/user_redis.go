package storage

import (
	"context"
	"encoding/json"
	"github.com/go-redis/redis/v8"
)

type userRedisRepo struct {
	Ctx context.Context
	Rdb redis.Client
}

//NewUserRedisRepository creates new repository
func NewUserRedisRepository() UserBotRepository {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})

	return userRedisRepo{
		Ctx: ctx,
		Rdb: *rdb,
	}
}

func (r userRedisRepo) Find(userID, botID string) (*BotUser, error) {
	var bUser BotUser
	var reply = r.Rdb.HGet(r.Ctx, botID, "user_"+userID)
	res, err := reply.Bytes()
	if err != nil {
		if err.Error() == "redis: nil" {
			return nil, nil
		} else {
			return nil, err
		}
	}
	err = json.Unmarshal(res, &bUser)
	if err != nil {
		return nil, err
	}
	return &bUser, nil

}

func (r userRedisRepo) UpdateState(bUser *BotUser, state string) (*BotUser, error) {
	bUser.State = state
	return bUser, r.Insert(bUser)
}

func (r userRedisRepo) Insert(bUser *BotUser) error {
	res, err := json.Marshal(bUser)
	if err != nil {
		return err
	}
	reply := r.Rdb.HSet(r.Ctx, bUser.BotID.Hex(), "user_"+bUser.UserID, res)
	return reply.Err()
}

func (r userRedisRepo) Delete(userID, botID string) error {
	reply := r.Rdb.HDel(r.Ctx, botID, "user_"+userID)
	return reply.Err()
}
