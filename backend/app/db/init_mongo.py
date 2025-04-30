from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv
from faker import Faker
from app.core.security import get_password_hash

load_dotenv()
MONGO_URI = getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["rbc_demo"]
users = db["users"]
messages = db["messages"]

# ✅ Seed users
if users.count_documents({}) == 0:
    users.insert_many([
        {
            "username": "admin",
            "password": get_password_hash("adminpass"),
            "role": "admin"
        },
        {
            "username": "viewer",
            "password": get_password_hash("viewerpass"),
            "role": "readonly"
        }
    ])
    print("✅ MongoDB initialized with default users.")
else:
    print("ℹ️ Users already exist. Skipping init.")

# ✅ Seed messages
fake = Faker()
if messages.count_documents({}) == 0:
    fake_messages = [
        {
            "userID": fake.user_name(),
            "message": fake.text(max_nb_chars=200)
        }
        for _ in range(100)
    ]
    messages.insert_many(fake_messages)
    print("✅ MongoDB initialized with 100 random messages.")
else:
    print("ℹ️ Messages already exist. Skipping init.")
