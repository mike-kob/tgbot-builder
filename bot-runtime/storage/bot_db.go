package storage

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

type repo struct {
	Ctx        context.Context
	Collection mongo.Collection
}

//NewMongoRepository creates new repository
func NewBotRepository() BotRepository {
	ctx := context.Background()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("DB_STRING")))
	if err != nil {
		log.Fatal(err)
	}

	database := client.Database("quickstart")
	botsCollection := database.Collection("bots")

	return repo{
		Ctx:        ctx,
		Collection: *botsCollection,
	}
}

func (r repo) Find(id string) (*DbBot, error) {
	var bot DbBot
	parsedID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	err = r.Collection.FindOne(r.Ctx, bson.M{"_id": parsedID}).Decode(&bot)
	if err != nil {
		return nil, err
	}

	return &bot, nil
}

func (r repo) Update(bot *DbBot) error {
	res := r.Collection.FindOneAndUpdate(r.Ctx, bson.M{"_id": bot.ID}, bot)
	if res.Err() != nil {
		return res.Err()
	}

	return nil
}

func (r repo) Insert(bot *DbBot) error {
	res, err := r.Collection.InsertOne(r.Ctx, bot)
	if err != nil {
		return err
	}
	bot.ID = res.InsertedID.(primitive.ObjectID)

	return nil
}

func (r repo) Delete(id string) error {
	parsedID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.Collection.DeleteOne(r.Ctx, bson.M{"_id": parsedID})
	if err != nil {
		return err
	}

	return nil
}
