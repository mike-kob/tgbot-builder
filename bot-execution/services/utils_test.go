package services

import (
	"os"
	"testing"
)

func TestGetEnvFallback_setVar(t *testing.T) {
	key := "GOTEST_ENV"
	value := "VAL"
	err := os.Unsetenv(key)
	if err != nil {
		t.Errorf("Fail to unset env var %s", err)
	}
	err = os.Setenv(key, value)
	if err != nil {
		t.Errorf("Fail to set env var %s", err)
	}

	res := GetEnvFallback(key, "DEFAULT")
	if res != value {
		t.Errorf("Expected '%s', got '%s'", value, res)
	}
}

func TestGetEnvFallback_defaultVar(t *testing.T) {
	key := "GOTEST_ENV"
	err := os.Unsetenv(key)
	if err != nil {
		t.Errorf("Fail to unset env var %s", err)
	}

	res := GetEnvFallback(key, "DEFAULT")
	if res != "DEFAULT" {
		t.Errorf("Expected 'DEFAULT', got '%s'", res)
	}
}
