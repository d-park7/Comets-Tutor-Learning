from fastapi import APIRouter, Body, status, HTTPException 
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from typing import List


from api.schemas import Tutor, UpdateTutorModel
from api.database import db


router = APIRouter()

# # Tutor crud ops
@router.post("/create_tutor", response_description="Add new tutors", response_model=Tutor)
async def create_tutor(tutor: Tutor = Body(...)):
    tutor = jsonable_encoder(tutor)
    new_tutor = await db["tutors"].insert_one(tutor)
    created_tutor = await db["tutors"].find_one({"_id": new_tutor.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_tutor)


@router.get("/tutors", response_description="List all tutors", response_model=List[Tutor])
async def list_tutors():
    tutors = await db["tutors"].find().to_list(1000)
    return tutors

@router.get("/tutors/{id}", response_description="Get a single tutor", response_model=Tutor)
async def show_tutors(id: str):
    if (tutor := await db["tutors"].find_one({"_id": id})) is not None:
        return tutor

    raise HTTPException(status_code=404, detail=f"Tutor {id} not found")


@router.put("/updatetutor/{id}", response_description="Update a tutor", response_model=UpdateTutorModel)
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


@router.delete("/tutors/{id}", response_description="Delete a tutor")
async def delete_tutor(id: str):
    delete_result = await db["tutors"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Tutor {id} not found")