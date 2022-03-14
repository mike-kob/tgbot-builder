package runtime

import (
	"bot-execution/storage"
	"github.com/getsentry/sentry-go"
	"github.com/go-chi/chi"
	"net/http"
)

type iController interface {
	updateHandler(writer http.ResponseWriter, r *http.Request)
}

type controller struct {
	UserBotRepo storage.UserBotRepository
	BotRepo     storage.BotRepository
}

func newApiController() iController {
	userRepo := storage.NewUserRedisRepository()
	botRepo := storage.NewBotRedisRepository()

	return controller{
		UserBotRepo: userRepo,
		BotRepo:     botRepo,
	}
}

//updateHandler processes request coming from BotAPI
func (c controller) updateHandler(writer http.ResponseWriter, request *http.Request) {
	botID := chi.URLParam(request, "id")
	update, err := parseUpdateFromBody(request)
	if err != nil {
		sentry.CaptureException(err)
		return
	}

	err = runUpdate(botID, update, &c.UserBotRepo, &c.BotRepo)
	if err != nil {
		sentry.CaptureException(err)
		return
	}
}
