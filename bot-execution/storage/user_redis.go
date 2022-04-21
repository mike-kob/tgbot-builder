package storage

import (
	"bot-execution/services"
	"encoding/json"
)

type userRedisRepo struct {
	rdb services.IRedis
}

//NewUserRedisRepository creates new repository
func NewUserRedisRepository() UserBotRepository {
	rdb := services.NewRedis()

	return userRedisRepo{
		rdb: *rdb,
	}
}

func (r userRedisRepo) Find(botID, userID string) (*BotUser, error) {
	res, err := r.rdb.HGet(botID, userID)
	if err != nil {
		return nil, err
	}
	if res == nil {
		return nil, nil
	}

	var bUser BotUser
	err = json.Unmarshal(res, &bUser)
	if err != nil {
		return nil, err
	}

	return &bUser, nil
}

func (r userRedisRepo) FindMany(botID string, userIDs []string) ([]*BotUser, error) {
	reply, err := r.rdb.HMGet(botID, userIDs...)
	if err != nil {
		return nil, err
	}

	res := make([]*BotUser, len(userIDs))
	for i, v := range reply {
		err = json.Unmarshal([]byte(v.(string)), &res[i])
		if err != nil {
			return nil, err
		}
	}

	return res, nil
}

func (r userRedisRepo) UpdateState(bUser *BotUser, newState string) (*BotUser, error) {
	srcKey := bUser.BotID + ":state_" + bUser.State
	dstKey := bUser.BotID + ":state_" + newState
	err := r.rdb.SMove(srcKey, dstKey, bUser.UserID)
	if err != nil {
		return nil, err
	}

	bUser.State = newState
	return bUser, r.Insert(bUser)
}

func (r userRedisRepo) Insert(bUser *BotUser) error {
	res, err := json.Marshal(bUser)
	if err != nil {
		return err
	}

	setKey := bUser.BotID + ":state_" + bUser.State
	err = r.rdb.SAdd(setKey, bUser.UserID)
	if err != nil {
		return err
	}

	return r.rdb.HSet(bUser.BotID, bUser.UserID, res)
}

func (r userRedisRepo) Delete(botID, userID string) error {
	return r.rdb.HDel(botID, userID)
}
