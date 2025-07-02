from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CityBase(BaseModel):
    name: str
    country: str
    country_code: str
    

class CityCreate(CityBase):
    pass

class CityRead(CityBase):
    id: int
    class Config:
        orm_mode = True

class AQIRecordBase(BaseModel):
    aqi: int
    pm25: float
    pm10: float
    no2: float
    o3: float

class AQIRecordCreate(AQIRecordBase):
    city_id: int

class AQIRecordRead(AQIRecordBase):
    id: int
    city_id: int
    timestamp: datetime
    class Config:
        orm_mode = True

class CityWithAQI(CityRead):
    aqi_records: List[AQIRecordRead] = [] 