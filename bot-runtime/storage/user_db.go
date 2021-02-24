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

type userRepo struct {
	Ctx        context.Context
	Collection mongo.Collection
}

//NewUserBotRepository creates new repository
func NewUserBotRepository() UserBotRepository {
	ctx := context.Background()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("DB_STRING")))
	if err != nil {
		log.Fatal(err)
	}

	database := client.Database("quickstart")
	col := database.Collection("bot_users")

	return userRepo{
		Ctx:        ctx,
		Collection: *col,
	}
}

func (r userRepo) Find(userID, botID string) (*BotUser, error) {
	var bUser BotUser
	parsedBotID, err := primitive.ObjectIDFromHex(botID)
	if err != nil {
		return nil, err
	}

	cursor, err := r.Collection.Find(r.Ctx, bson.M{"bot_id": parsedBotID, "user_id": userID})
	if err != nil {
		return nil, err
	}
	if cursor.Next(r.Ctx) {
		err = cursor.Decode(&bUser)
		if err != nil {
			return nil, err
		}
		return &bUser, nil
	} else {
		return nil, nil
	}

}

func (r userRepo) UpdateDb(bUser *BotUser, db map[string]string) (*BotUser, error) {
	update := bson.M{"db": db}
	res := r.Collection.FindOneAndUpdate(r.Ctx, bson.M{"_id": bUser.ID}, update)
	if res.Err() != nil {
		return nil, res.Err()
	}
	bUser.Db = db
	return bUser, nil
}

func (r userRepo) UpdateState(bUser *BotUser, state string) (*BotUser, error) {
	update := bson.M{"$set": bson.M{"state": state}}
	res := r.Collection.FindOneAndUpdate(r.Ctx,  bson.M{"_id": bUser.ID}, update)
	if res.Err() != nil {
		return nil, res.Err()
	}
	bUser.State = state
	return bUser, nil
}

func (r userRepo) Insert(bUser *BotUser) error {
	_, err := r.Collection.InsertOne(r.Ctx, bUser)
	if err != nil {
		return err
	}

	return nil
}

func (r userRepo) Delete(id string) error {
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
