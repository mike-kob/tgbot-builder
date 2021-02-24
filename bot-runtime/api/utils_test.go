package api

import (
	"bot-runtime/storage"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"reflect"
	"testing"
)

func Test_decodeBodyIntoBot(t *testing.T) {
	type args struct {
		request *http.Request
	}
	tests := []struct {
		name    string
		args    args
		want    *storage.DbBot
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := parseBotFromBody(tt.args.request)
			if (err != nil) != tt.wantErr {
				t.Errorf("parseBotFromBody() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("parseBotFromBody() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_parseBotIdFromRequest(t *testing.T) {
	type args struct {
		request *http.Request
	}
	tests := []struct {
		name    string
		args    args
		want    *primitive.ObjectID
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := parseBotIdFromRequest(tt.args.request)
			if (err != nil) != tt.wantErr {
				t.Errorf("parseBotIdFromRequest() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("parseBotIdFromRequest() got = %v, want %v", got, tt.want)
			}
		})
	}
}