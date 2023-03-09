# Endpoints are used from the mongodb with fastapi example here:
# https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List

from api.schemas import Student, Tutor, Appointment, UpdateStudentModel, UpdateTutorModel, UpdateAppointmentModel
from api.database import db


app = FastAPI()

# testing purposes
@app.get("/api/healthchecker")
def root():
    return {"message": "FastAPI with mongodb"}

# Student crud ops
@app.post("/createstudent", response_description="Add new student", response_model=Student)
async def create_student(student: Student = Body(...)):
    student = jsonable_encoder(student)
    new_student = await db["students"].insert_one(student)
    created_student = await db["students"].find_one({"_id": new_student.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_student)


@app.get("/students", response_description="List all students", response_model=List[Student])
async def list_students():
    students = await db["students"].find().to_list(1000)
    return students


@app.get("/student/{id}", response_description="Get a single student", response_model=Student)
async def show_student(id: str):
    if (student := await db["students"].find_one({"_id": id})) is not None:
        return student

    raise HTTPException(status_code=404, detail=f"Student {id} not found line 39")


@app.put("/updatestudent/{id}", response_description="Update a student", response_model=UpdateStudentModel)
async def update_student(id: str, student: UpdateStudentModel = Body(...)):
    student = {k: v for k, v in student.dict().items() if v is not None}

    if len(student) >= 1:
        update_result = await db["students"].update_one({"_id": id}, {"$set": student})

        if update_result.modified_count == 1:
            if (
                updated_student := await db["students"].find_one({"_id": id})
            ) is not None:
                return updated_student

    if (existing_student := await db["students"].find_one({"_id": id})) is not None:
        return existing_student

    raise HTTPException(status_code=404, detail=f"Student {id} not found")


@app.delete("/student/{id}", response_description="Delete a student")
async def delete_student(id: str):
    delete_result = await db["students"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Student {id} not found")
    

# # Tutor crud ops
@app.post("/create_tutor", response_description="Add new tutors", response_model=Tutor)
async def create_tutor(tutor: Tutor = Body(...)):
    tutor = jsonable_encoder(tutor)
    new_tutor = await db["tutors"].insert_one(tutor)
    created_tutor = await db["tutors"].find_one({"_id": new_tutor.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_tutor)


@app.get("/tutors", response_description="List all tutors", response_model=List[Tutor])
async def list_tutors():
    tutors = await db["tutors"].find().to_list(1000)
    return tutors

@app.get("/tutors/{id}", response_description="Get a single tutor", response_model=Tutor)
async def show_tutors(id: str):
    if (tutor := await db["tutors"].find_one({"_id": id})) is not None:
        return tutor

    raise HTTPException(status_code=404, detail=f"Tutor {id} not found")


@app.put("/updatetutor/{id}", response_description="Update a tutor", response_model=UpdateTutorModel)
async def update_tutor(id: str, tutor: UpdateTutorModel = Body(...)):
    tutor = {k: v for k, v in tutor.dict().items() if v is not None}

    if len(tutor) >= 1:
        update_result = await db["tutors"].update_one({"_id": id}, {"$set": tutor})

        if update_result.modified_count == 1:
            if (
                update_tutor := await db["tutors"].find_one({"_id": id})
            ) is not None:
                return update_tutor

    if (existing_tutor := await db["tutors"].find_one({"_id": id})) is not None:
        return existing_tutor

    raise HTTPException(status_code=404, detail=f"Tutor {id} not found")


@app.delete("/tutors/{id}", response_description="Delete a tutor")
async def delete_tutor(id: str):
    delete_result = await db["tutors"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Tutor {id} not found")


# Appointment crud ops
@app.post("/createappointment", response_description="Add new appointment", response_model=Appointment)
async def create_appointment(appointment: Appointment = Body(...)):
    appointment = jsonable_encoder(appointment)
    new_appointment = await db["appointments"].insert_one(appointment)
    created_appointment = await db["appointments"].find_one({"_id": new_appointment.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_appointment)


@app.get("/appointment", response_description="List all appointments", response_model=List[Appointment])
async def list_appointments():
    appointments = await db["appointments"].find().to_list(1000)
    return appointments 


@app.get("/appointment/{id}", response_description="Get a single student", response_model=Appointment)
async def show_appointments(id: str):
    if (appointment := await db["appointments"].find_one({"_id": id})) is not None:
        return appointment 

    raise HTTPException(status_code=404, detail=f"Appointment {id} not found")


@app.put("/updateappointment/{id}", response_description="Update an appointment", response_model=UpdateAppointmentModel)
async def update_student(id: str, appointment: UpdateAppointmentModel= Body(...)):
    appointment = {k: v for k, v in appointment.dict().items() if v is not None}

    if len(appointment) >= 1:
        update_result = await db["appointments"].update_one({"_id": id}, {"$set": appointment})

        if update_result.modified_count == 1:
            if (
                updated_appointment := await db["appointments"].find_one({"_id": id})
            ) is not None:
                return updated_appointment 

    if (existing_appointment := await db["appointments"].find_one({"_id": id})) is not None:
        return existing_appointment

    raise HTTPException(status_code=404, detail=f"Appointment {id} not found")


@app.delete("/appointment/{id}", response_description="Delete an appointment")
async def delete_appointment(id: str):
    delete_result = await db["appointments"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Appointment {id} not found")