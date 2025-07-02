from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from . import crud, schemas, database

router = APIRouter()

@router.get('/cities', response_model=List[schemas.CityRead])
async def list_cities(db: AsyncSession = Depends(database.get_db)):
    return await crud.get_cities(db)

@router.post('/cities/', response_model=schemas.CityRead)
async def create_city(city: schemas.CityCreate, db: AsyncSession = Depends(database.get_db)):
    return await crud.create_city(db, city)

@router.get('/aqi/latest', response_model=schemas.AQIRecordRead)
async def get_latest_aqi(city_id: int = Query(...), db: AsyncSession = Depends(database.get_db)):
    record = await crud.get_latest_aqi(db, city_id)
    if not record:
        raise HTTPException(status_code=404, detail="No AQI data found for this city.")
    return record

@router.get('/aqi/history', response_model=List[schemas.AQIRecordRead])
async def get_aqi_history(city_id: int = Query(...), limit: int = Query(24), db: AsyncSession = Depends(database.get_db)):
    return await crud.get_aqi_history(db, city_id, limit)

@router.post('/aqi/', response_model=schemas.AQIRecordRead)
async def create_aqi_record(record: schemas.AQIRecordCreate, db: AsyncSession = Depends(database.get_db)):
    return await crud.create_aqi_record(db, record) 