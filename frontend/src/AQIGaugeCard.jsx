import React from 'react';

function getAQIReview(aqi) {
  if (aqi <= 50) return { emoji: '😍', label: 'Very Good', color: 'green' };
  if (aqi <= 100) return { emoji: '😊', label: 'Good', color: 'yellow' };
  if (aqi <= 150) return { emoji: '😐', label: 'Moderate', color: 'orange' };
  if (aqi <= 200) return { emoji: '😷', label: 'Unhealthy', color: 'red' };
  return { emoji: '☠️', label: 'Hazardous', color: 'purple' };
}

function AQIGauge({ value }) {
  // SVG gauge for AQI (0-300)
  const percent = Math.min(Math.max(value, 0), 300) / 300;
  const angle = percent * 180;
  const r = 32;
  const cx = 40;
  const cy = 40;
  // Color stops for AQI
  let needleColor = '#22c55e';
  if (value > 200) needleColor = '#a21caf';
  else if (value > 150) needleColor = '#ef4444';
  else if (value > 100) needleColor = '#f59e42';
  else if (value > 50) needleColor = '#eab308';
  return (
    <svg width="80" height="48" viewBox="0 0 80 48">
      <defs>
        <linearGradient id="aqi-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="33%" stopColor="#eab308" />
          <stop offset="66%" stopColor="#f59e42" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path d="M8,40 A32,32 0 0,1 72,40" fill="none" stroke="url(#aqi-gradient)" strokeWidth="8" />
      <circle cx={cx} cy={cy} r="28" fill="none" stroke="#f3f4f6" strokeWidth="4" />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={cx + r * Math.cos(Math.PI - angle * Math.PI / 180)} y2={cy - r * Math.sin(Math.PI - angle * Math.PI / 180)} stroke={needleColor} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function AQIGaugeCard({
  aqi = 20,
  review,
  location = { city: 'Washington, D.C.', country: 'United States', flag: '🇺🇸' },
  parameters = [
    { label: 'PM2.5', value: 10.05, unit: 'µg/m³' },
    { label: 'PM10', value: 12.43, unit: 'µg/m³' },
    { label: 'NO₂', value: 8.57, unit: 'µg/m³' },
    { label: 'O₃', value: 30.0, unit: 'µg/m³' },
  ],
  forecast = {
    points: [40, 35, 38, 30, 32, 28, 34, 30],
    highlightIndex: 5,
    times: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
    highlightLabel: '08.29',
    highlightAQI: 20,
  },
}) {
  const computedReview = review || getAQIReview(aqi);
  const reviewBg = computedReview.color === 'green' ? 'bg-green-100 text-green-700' :
    computedReview.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
    computedReview.color === 'orange' ? 'bg-orange-100 text-orange-700' :
    computedReview.color === 'red' ? 'bg-red-100 text-red-700' :
    'bg-purple-100 text-purple-700';
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-xl w-full relative">
      {/* AQI Review */}
      <div className={`absolute left-6 top-6 flex items-center gap-2 ${reviewBg} px-3 py-1 rounded-full text-sm font-semibold shadow`}>
        <span className="text-lg">{computedReview.emoji}</span> {computedReview.label}
      </div>
      {/* AQI Meter */}
      <div className="absolute right-6 top-6 flex flex-col items-center">
        <AQIGauge value={aqi} />
        <div className="text-center mt-1">
          <div className="text-2xl font-bold text-gray-800">{aqi}</div>
          <div className="text-xs text-gray-400 -mt-1">AQI</div>
        </div>
      </div>
      {/* Location */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{location.flag}</span>
          <span className="text-lg font-semibold text-gray-800">{location.city}</span>
        </div>
        <div className="text-gray-400 text-sm">{location.country}</div>
      </div>
      {/* Parameters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {parameters.map((p, i) => (
          <div key={p.label} className="bg-gray-50 rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-gray-800">{p.value}</div>
            <div className="text-xs text-gray-500">{p.label}<br />{p.unit}</div>
          </div>
        ))}
      </div>
      {/* Air Quality Forecast Chart (SVG placeholder) */}
      <div className="mt-2">
        <div className="font-semibold text-gray-700 mb-2">Air Quality Forecast</div>
        <div className="bg-gray-100 rounded-xl p-4">
          <svg viewBox="0 0 320 60" width="100%" height="60">
            {/* X axis */}
            <line x1="20" y1="50" x2="300" y2="50" stroke="#d1d5db" strokeWidth="2" />
            {/* Y axis */}
            <line x1="20" y1="10" x2="20" y2="50" stroke="#d1d5db" strokeWidth="2" />
            {/* Forecast line */}
            <polyline fill="none" stroke="#22c55e" strokeWidth="3" points={forecast.points.map((y, i) => `${20 + i * 40},${y}`).join(' ')} />
            {/* Highlighted point */}
            <circle cx={20 + forecast.highlightIndex * 40} cy={forecast.points[forecast.highlightIndex]} r="5" fill="#fff" stroke="#22c55e" strokeWidth="3" />
            {/* Tooltip box */}
            <rect x={30 + forecast.highlightIndex * 40} y="10" width="60" height="28" rx="8" fill="#fff" stroke="#e5e7eb" />
            <text x={60 + forecast.highlightIndex * 40} y="26" textAnchor="middle" fontSize="12" fill="#222">{forecast.highlightLabel}</text>
            <text x={60 + forecast.highlightIndex * 40} y="40" textAnchor="middle" fontSize="10" fill="#888">{forecast.highlightAQI} AQI</text>
          </svg>
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
            {forecast.times.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
} 