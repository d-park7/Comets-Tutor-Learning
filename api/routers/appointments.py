from fastapi import APIRouter, Body, status, HTTPException
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from typing import List

from api.database import db
from api.schemas import Appointment, UpdateAppointmentModel 

router =  APIRouter()


@router.post("/createappointment", response_description="Add new appointment", response_model=Appointment)
async def create_appointment(appointment: Appointment = Body(...)):
    appointment = jsonable_encoder(appointment)
    new_appointment = await db["appointments"].insert_one(appointment)
    created_appointment = await db["appointments"].find_one({"_id": new_appointment.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_appointment)


@router.get("/appointment", response_description="List all appointments", response_model=List[Appointment])
async def list_appointments():
    appointments = await db["appointments"].find().to_list(1000)
    return appointments 


@router.get("/appointment/{id}", response_description="Get a single student", response_model=Appointment)
async def show_appointments(id: str):
    if (appointment := await db["appointments"].find_one({"_id": id})) is not None:
        return appointment 

    raise HTTPException(status_code=404, detail=f"Appointment {id} not found")


@router.put("/updateappointment/{id}", response_description="Update an appointment", response_model=UpdateAppointmentModel)
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


@router.delete("/appointment/{id}", response_description="Delete an appointment")
async def delete_appointment(id: str):
    delete_result = await db["appointments"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Appointment {id} not found")
