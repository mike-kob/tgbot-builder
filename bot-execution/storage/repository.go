package storage

type BotRepository interface {
	Find(id string) (*DbBot, error)
	Update(bot *DbBot) error
	Insert(bot *DbBot) error
	Delete(id string) error
}

type UserBotRepository interface {
	Find(userID, botID string) (*BotUser, error)
	UpdateState(bUser *BotUser, state string) (*BotUser, error)
	Insert(bUser *BotUser) error
	Delete(userID, botID string) error
}
