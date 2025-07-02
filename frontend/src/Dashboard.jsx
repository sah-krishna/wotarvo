import React from 'react';
import AQIGaugeCard from './AQIGaugeCard';
import aqiData from './lib/aqiData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">Live Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {aqiData.map((data, idx) => (
          <AQIGaugeCard key={data.location.city + idx} {...data} />
        ))}
      </div>
    </div>
  );
} 