package runtime

import (
	"net/http"

	"github.com/go-chi/chi"
)

// Router makes a sub-router for handling updates from BotAPI
func Router() http.Handler {
	router := chi.NewRouter()
	controller := newApiController()

	router.Post("/{id}", controller.updateHandler)

	return router
}
