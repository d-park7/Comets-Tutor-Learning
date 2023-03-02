import motor.motor_asyncio
from api.config import settings

try:
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.DATABASE_URL)
    print('Connected to MongoDB...')
except Exception as err:
    print(f"Unexpected {err=}, {type(err)=}")

    
db = client[settings.MONGO_INITDB_DATABASE]


