package main

import (
	"bot-execution/services"
	"github.com/go-co-op/gocron"
	"io"
	"os"
	"time"

	"github.com/getsentry/sentry-go"
	log "github.com/sirupsen/logrus"
)

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

	// Setting up logger
	fileName := services.GetEnvFallback("SCHEDULE_LOG_FILE", "schedule.log")
	file, err := os.OpenFile(fileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err == nil {
		mw := io.MultiWriter(os.Stdout, file)
		log.SetOutput(mw)
	} else {
		log.Fatalf("Failed to log to file")
		return
	}

	// Schedule consumer
	consumer := NewTaskQueueConsumer()
	s := gocron.NewScheduler(time.UTC)
	_, err = s.Every("1m").Do(consumer.Consume)
	if err != nil {
		log.Fatalf("Failed to schedule consumer job: %s", err.Error())
	}

	s.StartBlocking()
}
