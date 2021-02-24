package storage

import (
	"go.mongodb.org/mongo-driver/bson/primitive"

	tg "github.com/go-telegram-bot-api/telegram-bot-api"
)

type DbBot struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name   string             `bson:"name,omitempty" json:"name"`
	Author primitive.ObjectID `bson:"author,omitempty" json:"author"`
	Token  string             `bson:"token,omitempty" json:"token"`
	States []State            `bson:"states,omitempty" json:"states"`
}

type State struct {
	Name            string              `bson:"name,omitempty" json:"name"`
	DefaultTriggers []Action            `bson:"default_trigger,omitempty" json:"default_triggers"`
	CmdTriggers     map[string][]Action `bson:"cmd_triggers,omitempty" json:"cmd_triggers"`
	MsgTriggers     map[string][]Action `bson:"msg_triggers,omitempty" json:"msg_triggers"`
}

type Action struct {
	Type    string                 `bson:"type,omitempty" json:"type"`
	Options map[string]interface{} `bson:"options,omitempty" json:"options"`
}

type BotUser struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"`
	BotID   primitive.ObjectID `bson:"bot_id,omitempty"`
	UserID  string             `bson:"user_id,omitempty"`
	State   string             `bson:"state,omitempty"`
	Profile tg.User            `bson:"profile,omitempty"`
	Db      map[string]string  `bson:"db,omitempty"`
}
