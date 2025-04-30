import redis
from os import getenv
from dotenv import load_dotenv

load_dotenv()

r = redis.Redis(
    host=getenv("REDIS_HOST", "redis"),
    port=6379,
    decode_responses=True
)
