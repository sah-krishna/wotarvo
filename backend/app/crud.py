from sqlalchemy.future import select
from sqlalchemy import desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import NoResultFound
from . import models, schemas
from typing import List, Optional
from sqlalchemy.orm import joinedload

async def get_countries(db: AsyncSession):
    result = await db.execute(select(models.Country))
    return result.scalars().all()

async def create_country(db: AsyncSession, country: schemas.CountryCreate):
    db_country = models.Country(**country.dict())
    db.add(db_country)
    await db.commit()
    await db.refresh(db_country)
    return db_country

async def get_country_by_id(db: AsyncSession, country_id: int):
    result = await db.execute(select(models.Country).where(models.Country.id == country_id))
    return result.scalar_one_or_none()

async def get_cities(db: AsyncSession):
    result = await db.execute(select(models.City).options(joinedload(models.City.country_rel)))
    return result.scalars().all()

async def get_city(db: AsyncSession, city_id: int) -> Optional[models.City]:
    result = await db.execute(select(models.City).where(models.City.id == city_id))
    return result.scalar_one_or_none()

async def create_city(db: AsyncSession, city: schemas.CityCreate) -> models.City:
    db_city = models.City(**city.dict())
    db.add(db_city)
    await db.commit()
    await db.refresh(db_city)
    return db_city

async def get_latest_aqi(db: AsyncSession, city_id: int) -> Optional[models.AQIRecord]:
    result = await db.execute(
        select(models.AQIRecord)
        .where(models.AQIRecord.city_id == city_id)
        .order_by(desc(models.AQIRecord.timestamp))
        .limit(1)
    )
    return result.scalar_one_or_none()

async def get_aqi_history(db: AsyncSession, city_id: int, limit: int = 24) -> List[models.AQIRecord]:
    result = await db.execute(
        select(models.AQIRecord)
        .where(models.AQIRecord.city_id == city_id)
        .order_by(desc(models.AQIRecord.timestamp))
        .limit(limit)
    )
    return list(reversed(result.scalars().all()))

async def create_aqi_record(db: AsyncSession, record: schemas.AQIRecordCreate) -> models.AQIRecord:
    db_record = models.AQIRecord(**record.dict())
    db.add(db_record)
    await db.commit()
    await db.refresh(db_record)
    return db_record 