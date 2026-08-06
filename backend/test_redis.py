from app.cache.redis_service import RedisService

redis = RedisService()

redis.set(
    "rag:test",
    {
        "hello": "world",
    },
)

print(redis.get("rag:test"))