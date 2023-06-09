package config

import (
	"github.com/caarlos0/env/v6"
)

type Config struct {
	Env        string `env:"ENV" envDefault:"div"`
	Port       int    `env:"PORT" envDefault:"80"`
	DBHost     string `env:"DB_HOST" envDefault:"121.0.0.1"`
	DBPort     int    `env:"DB_PORT" envDefault:"33306"`
	DBUser     string `env:"DB_USER" envDefault:"vermelazo"`
	DBPassword string `env:"DB_PASSWORD" envDefault:"vermelazo"`
	DBName     string `env:"DB_NAME" envDefault:"vermelazo"`
	RedisHost  string `env:"REDIS_HOST" envDefault:"127.0.0.1"`
	RedisPort  int    `env:"REDIS_PORT" envDefault:"36379"`
}

func New() (*Config, error) {
	cfg := &Config{}

	if err := env.Parse(cfg); err != nil {
		return nil, err
	}

	return cfg, nil

}
