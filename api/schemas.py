# This file creates all of our schemas for mongodb
from pydantic import BaseModel, Field, EmailStr
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
    profile_pic: str
    about_me: str
    email: str = Field(...)
    password: str = Field(...) # hashed
    name: str
    date_of_birth: str
    subject: str
    availability_days: list
    total_time: int
    
    class Config:
        json_encoders = {ObjectId: str}
        

class UpdateTutorModel(BaseModel):
    profile_pic: Optional[str]
    about_me: Optional[str]
    email: Optional[str]
    password: Optional[str]
    name: Optional[str]
    date_of_birth: Optional[str]
    availability_days: Optional[str]
    subject: Optional[str]
    total_time: Optional[str]

    class Config:
        json_encoders = {ObjectId: str}

class Student(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    profile_pic: str
    email: str
    password: str = Field(...) # hashed
    name: str = Field(...)
    date_of_birth: str = Field(...)
    availability_days: list
    favorites: str
    
    class Config:
        json_encoders = {ObjectId: str}


class UpdateStudentModel(BaseModel):
    profile_pic: Optional[str]
    email: Optional[str]
    password: Optional[str]
    name: Optional[str]
    date_of_birth: Optional[str]
    availability_days: Optional[str]
    favorites: Optional[str]

    class Config:
        json_encoders = {ObjectId: str}


class Appointment(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    tutor_info: str
    student_info: str
    time: str 
    date: str 
    subject: str

    class Config:
        json_encoders = {ObjectId: str}

class UpdateAppointmentModel(BaseModel):
    tutor_info: Optional[str]
    student_info: Optional[str]
    time: Optional[str]
    date: Optional[str]
    subject: Optional[str]

    class Config:
        json_encoders = {ObjectId: str}