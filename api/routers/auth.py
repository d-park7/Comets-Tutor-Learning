from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

from api.config import settings
from api.database import db


SECRET_KEY = settings.JWT_PRIVATE_KEY #b2a5e51ba122185d424b184c8a037a77ad43cd6b6df196d0f9dd90c0fca3bc87
ALGORITHM = settings.JWT_ALGORITHM #HS256

# If we want to import token expiration later (otherwise delete)
#ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRES_IN


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(db, email: str):
    if (student := await db["students"].find_one({"email": email})) is not None:
        return student, 0
        #return student
    elif (tutor := await db["tutors"].find_one({"email": email})) is not None:
        return tutor, 1

async def authenticate_user(db, email: str, password: str):
    user, account= await get_user(db, email) 
    if not user:
        return False, account
    if verify_password(password, user["hashed_password"]):
        return user, account

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user, account = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=404, detail=f"Incorrect username or password")
    
    # Base 

    return {"access_token": user["_id"], "token_type": "bearer", "user": account}


@router.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"token": token}