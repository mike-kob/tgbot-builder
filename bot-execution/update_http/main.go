package main

import (
	"bot-execution/services"
	"context"
	"fmt"
	"github.com/go-chi/chi/middleware"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/go-chi/chi"
)

func NewRouter() http.Handler {
	router := chi.NewRouter()

	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)
	controller := newApiController()

	router.Post("/update/{id}", controller.updateHandler)

	return router
}

func main() {
	// Setting up Sentry logging
	err := sentry.Init(sentry.ClientOptions{
		Dsn:         os.Getenv("SENTRY_DSN"),
		Environment: os.Getenv("RUN_ENV"),
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
	defer sentry.Flush(2 * time.Second)

	port := services.GetEnvFallback("PORT", "8088")
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: NewRouter(),
	}
	go srv.ListenAndServe()

	log.Println(fmt.Sprintf("Server listening on %s", port))

	// Wait for an interrupt
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c

	// Attempt a graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	srv.Shutdown(ctx)
}
