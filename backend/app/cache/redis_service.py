import json

import redis

from app.core.settings import settings


class RedisService:

    _client = None

    def __init__(self):

        if RedisService._client is None:

            print("Connecting to Redis...")

            RedisService._client = redis.from_url(
                settings.REDIS_URL,
                decode_responses=True,
            )

            print("✅ Redis Connected")

        self.client = RedisService._client

    def get(
        self,
        key: str,
    ):

        value = self.client.get(key)

        if value is None:
            return None

        return json.loads(value)

    def set(
        self,
        key: str,
        value,
        ttl: int = settings.REDIS_TTL,
    ):

        self.client.set(
            key,
            json.dumps(value),
            ex=ttl,
        )

    def delete(
        self,
        key: str,
    ):

        self.client.delete(key)