import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './Navbar';
import AQIGaugeCard from './AQIGaugeCard';
import AQIGaugeCardSkeleton from './AQIGaugeCardSkeleton';

const BACKEND_URL = 'http://localhost:8000'; // Change if needed

// Utility to get flag emoji from country code
function getFlagEmoji(countryCode) {
  if (!countryCode) return '🏳️';
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

export default function Dashboard() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch all cities (with country_rel)
      const citiesRes = await fetch(`${BACKEND_URL}/cities`);
      if (!citiesRes.ok) throw new Error('Failed to fetch cities');
      const cities = await citiesRes.json();

      // 2. For each city, fetch latest AQI and AQI history
      const cityCards = await Promise.all(
        cities.map(async (city) => {
          // Fetch latest AQI
          const latestRes = await fetch(`${BACKEND_URL}/aqi/latest?city_id=${city.id}`);
          let latest = null;
          if (latestRes.ok) {
            latest = await latestRes.json();
          }
          // Fetch AQI history (for forecast)
          const historyRes = await fetch(`${BACKEND_URL}/aqi/history?city_id=${city.id}&limit=8`);
          let history = [];
          if (historyRes.ok) {
            history = await historyRes.json();
          }

          // Map backend fields to AQIGaugeCard props
          return {
            id: city.id,
            aqi: latest ? latest.aqi : 0,
            location: {
              city: city.name,
              country: city.country_rel ? city.country_rel.name : '',
              flag: city.country_rel ? getFlagEmoji(city.country_rel.code) : '🏳️',
            },
            parameters: [
              { label: 'PM2.5', value: latest ? latest.pm25 : 0, unit: 'µg/m³' },
              { label: 'PM10', value: latest ? latest.pm10 : 0, unit: 'µg/m³' },
              { label: 'NO₂', value: latest ? latest.no2 : 0, unit: 'µg/m³' },
              { label: 'O₃', value: latest ? latest.o3 : 0, unit: 'µg/m³' },
            ],
            forecast: {
              points: history.map((h) => h.aqi),
              highlightIndex: history.length - 1,
              times: history.map((h) => new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
              highlightLabel: history.length > 0 ? new Date(history[history.length - 1].timestamp).toLocaleDateString() : '',
              highlightAQI: history.length > 0 ? history[history.length - 1].aqi : 0,
            },
          };
        })
      );
      setCityData(cityCards);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center py-6">Live Dashboard</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[...Array(3)].map((_, i) => <AQIGaugeCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {cityData.map((data) => (
            <AQIGaugeCard key={data.id} {...data} />
          ))}
        </div>
      )}
    </div>
  );
} 