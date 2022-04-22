package main

import (
	"bot-execution/scheduling"
	"bot-execution/services"
	"context"
	"fmt"
	"github.com/go-chi/chi/middleware"
	"github.com/go-co-op/gocron"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/go-chi/chi"
)

func prometheusMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
		services.MetricTotalRequests.Inc()
	})
}

func collectRedisMetrics() {
	redis := services.NewRedis()
	dbSize, err := redis.DBSize()
	if err != nil {
		return
	}
	services.MetricNumberKeys.Set(float64(dbSize))

	queue := scheduling.NewRedisTaskQueue()
	size, err := queue.Size()
	if err != nil {
		return
	}
	services.MetricTaskQueueSize.Set(float64(size))
}

func init() {
	prometheus.MustRegister(services.MetricTotalRequests)
	prometheus.MustRegister(services.MetricNumberKeys)
	prometheus.MustRegister(services.MetricTaskQueueSize)
}

func NewRouter() http.Handler {
	router := chi.NewRouter()

	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)
	router.Use(prometheusMiddleware)
	controller := newApiController()

	router.Post("/update/{id}", controller.updateHandler)
	router.Handle("/metrics", promhttp.Handler())

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

	s := gocron.NewScheduler(time.UTC)
	s.Every("1m").Do(collectRedisMetrics)
	s.StartAsync()

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
