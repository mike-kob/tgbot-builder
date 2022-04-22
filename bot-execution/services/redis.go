package services

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"os"
)

type ZMember struct {
	Score  float64
	Member interface{}
}

type IRedis interface {
	HGet(key, field string) ([]byte, error)
	HMGet(key string, fields ...string) ([]interface{}, error)
	HSet(key string, values ...interface{}) error
	HDel(key string, fields ...string) error

	SAdd(key string, members ...interface{}) error
	SMove(src, dst string, member interface{}) error
	SMembers(key string) ([]string, error)
	SIsMember(key string, member interface{}) (bool, error)

	ZPopRange(key, min, max string) ([]string, error)
	ZCount(key, min, max string) (int64, error)
	ZAdd(key string, members ...*ZMember) error

	Del(keys ...string) error
	DBSize() (int64, error)
}

type Redis struct {
	Ctx context.Context
	Rdb *redis.Client
}

func NewRedis() *Redis {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:6379", os.Getenv("REDIS_HOST")),
	})

	return &Redis{Ctx: ctx, Rdb: rdb}
}

func (r Redis) HGet(key, field string) ([]byte, error) {
	res := r.Rdb.HGet(r.Ctx, key, field)
	if res.Err() != nil && res.Err().Error() == "redis: nil" {
		return nil, nil
	}
	if res.Err() != nil {
		return nil, res.Err()
	}

	return res.Bytes()
}

func (r Redis) HMGet(key string, fields ...string) ([]interface{}, error) {
	res := r.Rdb.HMGet(r.Ctx, key, fields...)
	if res.Err() != nil {
		return nil, res.Err()
	}

	return res.Val(), nil
}

func (r Redis) HSet(key string, values ...interface{}) error {
	res := r.Rdb.HSet(r.Ctx, key, values...)

	return res.Err()
}

func (r Redis) HDel(key string, fields ...string) error {
	res := r.Rdb.HDel(r.Ctx, key, fields...)
	if res.Err() != nil {
		return res.Err()
	}

	return nil
}

func (r Redis) SAdd(key string, members ...interface{}) error {
	res := r.Rdb.SAdd(r.Ctx, key, members)
	return res.Err()
}

func (r Redis) SMove(src, dst string, member interface{}) error {
	res := r.Rdb.SMove(r.Ctx, src, dst, member)
	return res.Err()
}

func (r Redis) SMembers(key string) ([]string, error) {
	res := r.Rdb.SMembers(r.Ctx, key)
	return res.Result()
}

func (r Redis) SIsMember(key string, member interface{}) (bool, error) {
	res := r.Rdb.SIsMember(r.Ctx, key, member)
	return res.Result()
}

func (r Redis) ZPopRange(key, min, max string) ([]string, error) {
	p := r.Rdb.Pipeline()
	res := p.ZRangeByScore(r.Ctx, key, &redis.ZRangeBy{Min: min, Max: max})
	p.ZRemRangeByScore(r.Ctx, key, min, max)
	_, err := p.Exec(r.Ctx)
	if err != nil {
		return nil, err
	}

	return res.Val(), nil
}

func (r Redis) ZAdd(key string, members ...*ZMember) error {
	zs := make([]*redis.Z, len(members))
	for i, v := range members {
		zs[i] = &redis.Z{
			Score:  v.Score,
			Member: v.Member,
		}
	}
	res := r.Rdb.ZAdd(r.Ctx, key, zs...)
	return res.Err()
}

func (r Redis) ZCount(key, min, max string) (int64, error) {
	res := r.Rdb.ZCount(r.Ctx, key, min, max)
	return res.Val(), res.Err()
}

func (r Redis) Del(keys ...string) error {
	res := r.Rdb.Del(r.Ctx, keys...)
	return res.Err()
}

func (r Redis) DBSize() (int64, error) {
	res := r.Rdb.DBSize(r.Ctx)
	return res.Result()
}
