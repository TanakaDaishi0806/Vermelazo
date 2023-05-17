package store

import (
	"context"
	"fmt"
	"time"

	"github.com/TanakaDaishi0806/Vermelazo.git/backend/config"
	"github.com/TanakaDaishi0806/Vermelazo.git/backend/entity"
	"github.com/go-redis/redis"
)

func NewKVS(ctx context.Context, cfg *config.Config) (*KVS, error) {
	cli := redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:%d", cfg.RedisHost, cfg.RedisPort),
	})

	if err := cli.Ping().Err(); err != nil {
		return nil, err
	}
	return &KVS{Cli: cli}, nil
}

type KVS struct {
	Cli *redis.Client
}

func (kvs *KVS) Save(ctx context.Context, key string, UserId entity.UserId) error {
	id := int64(UserId)
	return kvs.Cli.Set(key, id, 30*time.Minute).Err()
}

func (kvs *KVS) Load(ctx context.Context, key string) (entity.UserId, error) {
	id, err := kvs.Cli.Get(key).Int64()

	if err != nil {
		return 0, fmt.Errorf("failed to get %q:%w", key, err)
	}

	return entity.UserId(id), nil
}
