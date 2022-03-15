package storage

import (
	"encoding/json"
	tg "github.com/go-telegram-bot-api/telegram-bot-api"
	"github.com/streadway/amqp"
	"net/http"
)

const updatesExchange = "updates"

type RabbitmqChannel struct {
	Channel *amqp.Channel
}

func NewRabbitmqChannel() RabbitmqChannel {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
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
	return ch.publish("bot."+botID+".action.message", bytes)
}

func (ch RabbitmqChannel) PublishChangeState(botID, oldState, newState string) error {
	bytes, err := json.Marshal(map[string]string{"oldState": oldState, "newState": newState})
	if err != nil {
		return err
	}
	return ch.publish("bot."+botID+".action.change_state", bytes)
}

func (ch RabbitmqChannel) PublishMakeRequest(botID string, req *http.Request, res *http.Response) error {
	bytes, err := json.Marshal(map[string]string{
		"url":    req.URL.String(),
		"method": req.Method,
		"status": res.Status,
	})
	if err != nil {
		return err
	}
	return ch.publish("bot."+botID+".action.make_request", bytes)
}

func (ch RabbitmqChannel) publish(key string, msg []byte) error {
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
