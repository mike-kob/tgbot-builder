package scheduling

import "time"

type Task struct {
	Date       int64  `json:"date"`
	BotID      string `json:"botId"`
	BotVersion string `json:"botVersion"`
	StateID    string `json:"stateId"`
	ScheduleID string `json:"scheduleId"`
}

type TaskQueue interface {
	Size() (int, error)
	Fetch(start, end time.Time) ([]*Task, error)
	Insert(task *Task) error
}
