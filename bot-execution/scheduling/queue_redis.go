package scheduling

import (
	"bot-execution/services"
	"encoding/json"
	"strconv"
	"time"
)

type redisTaskQueue struct {
	rdb  services.IRedis
	qKey string
}

func NewRedisTaskQueue() *redisTaskQueue {
	return &redisTaskQueue{
		rdb:  services.NewRedis(),
		qKey: "bot_schedule",
	}
}

func (q redisTaskQueue) Size() (int, error) {
	res, err := q.rdb.ZCount(q.qKey, "-inf", "+inf")
	return int(res), err
}

func (q redisTaskQueue) Fetch(start, end time.Time) ([]*Task, error) {
	min := strconv.FormatInt(start.UnixMilli(), 10)
	max := strconv.FormatInt(end.UnixMilli(), 10)

	res, err := q.rdb.ZPopRange(q.qKey, min, max)
	if err != nil {
		return nil, err
	}

	tasks := make([]*Task, len(res))
	for i, v := range res {
		err := json.Unmarshal([]byte(v), &tasks[i])
		if err != nil {
			return nil, err
		}
	}

	return tasks, nil
}

func (q redisTaskQueue) Insert(task *Task) error {
	score := task.Date
	data, err := json.Marshal(task)
	if err != nil {
		return err
	}

	return q.rdb.ZAdd(q.qKey, &services.ZMember{
		Score:  float64(score),
		Member: data,
	})
}
