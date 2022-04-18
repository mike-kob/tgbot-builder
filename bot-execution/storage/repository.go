package storage

type BotRepository interface {
	Find(botID string) (*DbBot, error)
	Insert(bot *DbBot) error
	Delete(botID string) error
	GetUserIDsByState(botID, state string) ([]string, error)
}

type UserBotRepository interface {
	Find(botID, userID string) (*BotUser, error)
	FindMany(botID string, userIDs []string) ([]*BotUser, error)
	UpdateState(bUser *BotUser, state string) (*BotUser, error)
	Insert(bUser *BotUser) error
	Delete(botID, userID string) error
}
