# Endpoints are used from the mongodb with fastapi example here:
# https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, students, tutors, appointments


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(students.router)
app.include_router(tutors.router)
app.include_router(appointments.router)


@app.get("/api/healthchecker")
def root():
    return {"message": "FastAPI with mongodb"}