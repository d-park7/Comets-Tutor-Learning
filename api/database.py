# Motor vs PyMongo
# Motor allows for async operations
# PyMongo is for synch operations
# Using Motor because we have async operations
import motor.motor_asyncio
from api.config import settings

try:
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.DATABASE_URL)
    print('Connected to MongoDB...')
except Exception as err:
    print(f"Unexpected {err=}, {type(err)=}")

# settings.MONGO_INITDB_DATABASE grabs the name of the Collection from the
# config.py which grabs the name from .env
db = client[settings.MONGO_INITDB_DATABASE]