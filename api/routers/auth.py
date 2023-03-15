from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from api.database import db


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_user(db, email: str):
    if (student := await db["students"].find_one({"email": email})) is not None:
        return student
    elif (tutor := await db["tutors"].find_one({"email": email})) is not None:
        return tutor


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user(db, form_data.username)
    if not user:
        raise HTTPException(status_code=404, detail=f"Incorrect username or password")

    password = form_data.password
    if not password == user["password"]:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user["name"], "token_type": "bearer"}


@router.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"token": token}