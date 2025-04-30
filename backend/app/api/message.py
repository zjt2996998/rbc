from fastapi import APIRouter, Depends, Query
from app.core.deps import get_current_user, require_admin
from app.db.mongo import messages_collection
from app.models.message import MessageOut, MessageCreate
from redis import Redis
from typing import List
import json

router = APIRouter()
r = Redis(host="redis", port=6379, decode_responses=True)

@router.get("/messages", response_model=List[MessageOut])
async def get_messages(
    user = Depends(get_current_user),
    page: int = Query(1, ge=1),
    limit: int = Query(10, le=100)
):
    cache_key = f"messages:page:{page}:limit:{limit}"

    cached = r.get(cache_key)
    if cached:
        print(f"🟢 缓存命中：{cache_key}")
        return json.loads(cached)

    print(f"🔴 缓存未命中：{cache_key}")
    skip = (page - 1) * limit
    cursor = messages_collection.find({}, {"_id": 0}).sort("_id", -1).skip(skip).limit(limit)
    result = [doc async for doc in cursor]
    r.setex(cache_key, 60, json.dumps(result))
    return result

@router.post("/messages", response_model=dict)
async def post_message(payload: MessageCreate, user=Depends(require_admin)):
    await messages_collection.insert_one({
        "userID": payload.user_id,
        "message": payload.message
    })
    for i in range(1, 6):
        key = f"messages:page:{i}:limit:5"
        r.delete(key)
    return {"status": "Message added"}


