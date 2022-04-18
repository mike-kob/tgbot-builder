package storage

type DbBot struct {
	ID     string           `json:"id,omitempty"`
	Token  string           `json:"token"`
	Active bool             `json:"active"`
	States map[string]State `json:"states"`
}

type State struct {
	Name             string              `json:"name"`
	DefaultTriggers  []Action            `json:"default_triggers"`
	CmdTriggers      map[string][]Action `json:"cmd_triggers"`
	MsgTriggers      map[string][]Action `json:"msg_triggers"`
	ScheduleTriggers map[string][]Action `json:"schedule_triggers"`
}

type Action struct {
	Type    string                 `json:"type"`
	Options map[string]interface{} `json:"options"`
}

type BotUser struct {
	UserID string            `json:"user_id"`
	BotID  string            `json:"bot_id"`
	State  string            `json:"state"`
	Db     map[string]string `json:"db"`
}
