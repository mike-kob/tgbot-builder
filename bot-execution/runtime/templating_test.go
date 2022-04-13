package runtime

import (
	"bot-execution/storage"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"testing"
)

var testUpdate = tg.Update{
	UpdateID: 1,
	Message: &tg.Message{
		MessageID: 1,
		Text:      "Some text",
		Date:      1649851462,
		Chat: &tg.Chat{
			ID:          1,
			Description: "Chat description",
			FirstName:   "First",
			LastName:    "Last",
			UserName:    "username",
			Title:       "Chat title",
			Type:        "private",
		},
		From: &tg.User{
			ID:           1,
			FirstName:    "First",
			LastName:     "Last",
			UserName:     "username",
			LanguageCode: "en",
		},
	},
	CallbackQuery: nil,
}

var testUser = storage.BotUser{
	Db: map[string]string{
		"key1": "val1",
		"key2": "val2",
		"key3": "val3",
	},
}

func TestRenderTemplate(t *testing.T) {
	type args struct {
		content string
		upd     *tg.Update
		user    *storage.BotUser
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			name: "No template",
			args: args{content: "Hello everybody!", upd: &testUpdate, user: &testUser},
			want: "Hello everybody!",
		},
		{
			name: "Template message text",
			args: args{content: "You wrote: {{ UPD.message_text }}", upd: &testUpdate, user: &testUser},
			want: "You wrote: Some text",
		},
		{
			name: "Template name",
			args: args{content: "You are {{ UPD.message_from_username }}", upd: &testUpdate, user: &testUser},
			want: "You are username",
		},
		{
			name: "Template data",
			args: args{content: "{{ DB.key1 }} {{ DB.key2 }} {{ DB.key3 }}", upd: &testUpdate, user: &testUser},
			want: "val1 val2 val3",
		},
		{
			name: "Broken template 1",
			args: args{content: "{{ DB.key1 }}}", upd: &testUpdate, user: &testUser},
			want: "val1}",
		},
		{
			name: "Broken template 2",
			args: args{content: "{{{ DB.key2 }}}", upd: &testUpdate, user: &testUser},
			want: "{val2}",
		},
		{
			name: "Broken template 3",
			args: args{content: "{ DB.key2 }", upd: &testUpdate, user: &testUser},
			want: "{ DB.key2 }",
		},
		{
			name: "Unknown key",
			args: args{content: "key: {{ DB.key5 }}-{{ AAA.bbb }}", upd: &testUpdate, user: &testUser},
			want: "key: -",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := RenderTemplate(tt.args.content, tt.args.upd, tt.args.user); got != tt.want {
				t.Errorf("RenderTemplate() = '%v', want '%v'", got, tt.want)
			}
		})
	}
}
