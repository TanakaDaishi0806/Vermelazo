package config

import (
	"github.com/caarlos0/env/v6"
)

type Config struct {
	Env        string `env:"ENV" envDefault:"div"`
	Port       int    `env:"PORT" envDefault:"80"`
	DBHost     string `env:"HOST_PRODUCT" envDefault:"121.0.0.1:3306"`
	DBUser     string `env:"DB_USER" envDefault:"vermelazo"`
	DBPassword string `env:"DB_PASSWORD" envDefault:"vermelazo"`
	DBName     string `env:"DB_NAME" envDefault:"vermelazo"`
}

func New() (*Config, error) {
	cfg := &Config{}

	if err := env.Parse(cfg); err != nil {
		return nil, err
	}

	return cfg, nil

}
