import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './Navbar';
import AQIGaugeCard from './AQIGaugeCard';
import AQIGaugeCardSkeleton from './AQIGaugeCardSkeleton';

const BACKEND_URL = 'http://localhost:8000'; // Change if needed

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all cities (with country_rel)
      const citiesRes = await fetch(`${BACKEND_URL}/cities`);
      if (!citiesRes.ok) throw new Error('Failed to fetch cities');
      const citiesData = await citiesRes.json();
      setCities(citiesData);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

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
          {cities.map((city) => (
            <AQIGaugeCard 
              key={city.id}
              cityId={city.id}
              cityName={city.name}
              countryName={city.country_rel ? city.country_rel.name : ''}
              countryCode={city.country_rel ? city.country_rel.code : ''}
            />
          ))}
        </div>
      )}
    </div>
  );
} 