package services

import (
	"encoding/json"
	"fmt"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"github.com/streadway/amqp"
	"log"
	"net/http"
	"os"
	"time"
)

const updatesExchange = "updates"

type RabbitmqChannel struct {
	Channel *amqp.Channel
}

func NewRabbitmqChannel() RabbitmqChannel {
	conn, err := amqp.Dial(fmt.Sprintf("amqp://guest:guest@%s:5672/", os.Getenv("RABBITMQ_HOST")))
	if err != nil {
		panic(err)
	}

	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	err = ch.ExchangeDeclare(
		updatesExchange,
		"topic",
		true,
		false,
		false,
		false,
		nil)
	if err != nil {
		panic(err)
	}
	return RabbitmqChannel{
		Channel: ch,
	}
}

func (ch RabbitmqChannel) PublishUpdate(botID string, update *tg.Update) error {
	bytes, err := json.Marshal(update)
	if err != nil {
		return err
	}
	return ch.publish("bot."+botID+".update", bytes)
}

func (ch RabbitmqChannel) PublishSendMessage(botID string, msg *tg.Message) error {
	bytes, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	return ch.publish("bot."+botID+".action.send_message", bytes)
}

func (ch RabbitmqChannel) PublishChangeState(botID, oldState, newState string, chat *tg.User) error {
	bytes, err := json.Marshal(map[string]interface{}{
		"oldState": oldState,
		"newState": newState,
		"chat":     chat,
		"date":     time.Now().Unix(),
	})
	if err != nil {
		return err
	}
	return ch.publish("bot."+botID+".action.change_state", bytes)
}

func (ch RabbitmqChannel) PublishMakeRequest(botID string, chat *tg.User, req *http.Request, res *http.Response, err error) error {
	info := map[string]interface{}{
		"chat":   chat,
		"url":    req.URL.String(),
		"method": req.Method,
		"date":   time.Now().Unix(),
	}
	if res != nil {
		info["status"] = res.Status
	}
	if err != nil {
		info["status"] = "failed"
		info["error"] = err.Error()
	}
	bytes, err := json.Marshal(info)
	if err != nil {
		return err
	}
	return ch.publish("bot."+botID+".action.make_request", bytes)
}

func (ch RabbitmqChannel) PublishSaveUserData(botID string, chat *tg.User, key, value string) error {
	info := map[string]interface{}{
		"key":   key,
		"value": value,
		"chat":  chat,
		"date":  time.Now().Unix(),
	}
	bytes, err := json.Marshal(info)
	if err != nil {
		return err
	}
	return ch.publish("bot."+botID+".action.save_user_data", bytes)
}

func (ch RabbitmqChannel) publish(key string, msg []byte) error {
	log.Println("Publishing message with key", key)
	return ch.Channel.Publish(
		updatesExchange,
		key,
		false,
		false,
		amqp.Publishing{
			ContentType: "application/json",
			Body:        msg,
		})
}
