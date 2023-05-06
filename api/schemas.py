# This file creates all of our schemas for mongodb
from pydantic import BaseModel, Field
from typing import Optional
from datetime import time, date
from bson import ObjectId


# MongoDB stores data as BSON. FastAPI encodes and decodes data as JSON strings.
# BSON has support for additional non-JSON-native data types, including ObjectId 
# which can't be directly encoded as JSON. Because of this, we convert ObjectIds 
# to strings before storing them as the _id.
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

    

class Tutor(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    profile_pic: Optional[str]
    about_me: str
    email: str = Field(...)
    name: str
    date_of_birth: date
    available_times: list
    subject: str
    total_time: int
    
    class Config:
        json_encoders = {ObjectId: str}        
        
class TutorInDB(Tutor):
    hashed_password: str

class UpdateTutorModel(BaseModel):
    profile_pic: Optional[str]
    about_me: Optional[str]
    email: Optional[str]
    name: Optional[str]
    date_of_birth: Optional[date]
    available_times: list
    subject: Optional[str]
    total_time: Optional[str]

    class Config:
        json_encoders = {ObjectId: str}

class Student(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    profile_pic: str
    email: str
    name: str = Field(...)
    date_of_birth: date = Field(...)
    favorites: list
    total_time: int
    
    class Config:
        json_encoders = {ObjectId: str}


class StudentInDB(Student):
    hashed_password: str


class UpdateStudentModel(BaseModel):
    profile_pic: Optional[str]
    email: Optional[str]
    name: Optional[str]
    date_of_birth: Optional[date]
    favorites: Optional[list]
    total_time: Optional[str]

    class Config:
        json_encoders = {ObjectId: str}

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None
    
class TableTutor(BaseModel):
    tutor_name: str
    tutor_email: str

class TableStudent(BaseModel):
    student_name: str
    student_email: str

class Appointment(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    tutor_info: TableTutor
    student_info: TableStudent
    time: time
    date: date 
    subject: str

    class Config:
        json_encoders = {ObjectId: str}



class UpdateAppointmentModel(BaseModel):
    tutor_info: Optional[str]
    student_info: Optional[str]
    time: Optional[time]
    date: Optional[date]
    subject: Optional[str]

    class Config:
        json_encoders = {ObjectId: str}