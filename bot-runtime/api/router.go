package api

import (
	"net/http"

	"bot-runtime/storage"

	"github.com/go-chi/chi"
)

type IApiController interface {
	CreateBotHandler(writer http.ResponseWriter, r *http.Request)
	UpdateBotHandler(writer http.ResponseWriter, r *http.Request)
	DeleteBotHandler(writer http.ResponseWriter, r *http.Request)
}

type apiController struct {
	UserBotRepo storage.UserBotRepository
	BotRepo     storage.BotRepository
}

func newApiController() IApiController {
	userRepo := storage.NewUserBotRepository()
	botRepo := storage.NewBotRepository()

	return apiController{
		UserBotRepo: userRepo,
		BotRepo:     botRepo,
	}
}

// ApiRouter - sub-router for bot-management
func ApiRouter() http.Handler {
	router := chi.NewRouter()

	controller := newApiController()

	router.Post("/bot", controller.CreateBotHandler)
	router.Put("/bot/{id}", controller.UpdateBotHandler)
	router.Delete("/bot/{id}", controller.DeleteBotHandler)

	return router
}
