import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

const BACKEND_URL = 'http://localhost:8000';

// Utility to get flag emoji from country code
function getFlagEmoji(countryCode) {
  if (!countryCode) return '🏳️';
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

function getAQIReview(aqi) {
  if (aqi <= 50) return { emoji: '\ud83d\ude0d', label: 'Very Good', color: 'green' };
  if (aqi <= 100) return { emoji: '\ud83d\ude0a', label: 'Good', color: 'yellow' };
  if (aqi <= 150) return { emoji: '\ud83d\ude10', label: 'Moderate', color: 'orange' };
  if (aqi <= 200) return { emoji: '\ud83d\ude37', label: 'Unhealthy', color: 'red' };
  return { emoji: '\u2620\ufe0f', label: 'Hazardous', color: 'purple' };
}

// Animated AQI Gauge
function AQIGauge({ value, onDisplayValueChange }) {
  const [displayValue, setDisplayValue] = useState(value);
  const rafRef = useRef();

  useEffect(() => {
    if (displayValue === value) return;
    let start = null;
    const duration = 800; // ms
    const initial = displayValue;
    const delta = value - initial;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const newValue = initial + delta * progress;
      setDisplayValue(newValue);
      if (onDisplayValueChange) onDisplayValueChange(newValue);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        if (onDisplayValueChange) onDisplayValueChange(value);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line
  }, [value]);

  const percent = Math.min(Math.max(displayValue, 0), 300) / 300;
  const angle = percent * 180;
  const r = 36; // needle length
  const cx = 40;
  const cy = 40;
  const needleWidth = 6; // width of the base of the needle
  let needleColor = '#ef4444'; // red by default
  if (displayValue > 200) needleColor = '#a21caf';
  else if (displayValue > 150) needleColor = '#ef4444';
  else if (displayValue > 100) needleColor = '#f59e42';
  else if (displayValue > 50) needleColor = '#eab308';
  else needleColor = '#22c55e';

  // Calculate needle triangle points
  const theta = (Math.PI - angle * Math.PI / 180);
  const tipX = cx + r * Math.cos(theta);
  const tipY = cy - r * Math.sin(theta);
  const baseLeftX = cx + (needleWidth / 2) * Math.cos(theta + Math.PI / 2);
  const baseLeftY = cy - (needleWidth / 2) * Math.sin(theta + Math.PI / 2);
  const baseRightX = cx + (needleWidth / 2) * Math.cos(theta - Math.PI / 2);
  const baseRightY = cy - (needleWidth / 2) * Math.sin(theta - Math.PI / 2);

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
      {/* Speedometer-style pointed needle */}
      <g>
        <polygon
          points={`
            ${tipX},${tipY}
            ${baseLeftX},${baseLeftY}
            ${baseRightX},${baseRightY}
          `}
          fill={needleColor}
          style={{ filter: 'drop-shadow(0 1px 2px #0003)', transition: 'fill 0.3s' }}
        />
        {/* Needle base (pivot) */}
        <circle cx={cx} cy={cy} r="5" fill="#222" stroke="#fff" strokeWidth="2" />
      </g>
    </svg>
  );
}

function normalizePoints(points, minY = 20, maxY = 90) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  if (max === min) return points.map(() => (minY + maxY) / 2);
  return points.map(v => maxY - ((v - min) / (max - min)) * (maxY - minY));
}

// Custom hook for animating a number value
function useAnimatedNumber(value, duration = 800) {
  const [displayValue, setDisplayValue] = useState(value);
  const rafRef = useRef();
  useEffect(() => {
    if (displayValue === value) return;
    let start = null;
    const initial = displayValue;
    const delta = value - initial;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplayValue(initial + delta * progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [value, duration]);
  return displayValue;
}

// Custom hook for managing live air quality data
function useLiveAQIData(cityId, cityName, countryName, countryCode) {
  const [data, setData] = useState({
    aqi: 0,
    parameters: [
      { label: 'PM2.5', value: 0, unit: 'µg/m³' },
      { label: 'PM10', value: 0, unit: 'µg/m³' },
      { label: 'NO₂', value: 0, unit: 'µg/m³' },
      { label: 'O₃', value: 0, unit: 'µg/m³' },
    ],
    forecast: {
      points: [],
      highlightIndex: 0,
      times: [],
      highlightLabel: '',
      highlightAQI: 0,
    },
    location: {
      city: cityName,
      country: countryName,
      flag: getFlagEmoji(countryCode),
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // Fetch latest AQI
      const latestRes = await fetch(`${BACKEND_URL}/aqi/latest?city_id=${cityId}`);
      let latest = null;
      if (latestRes.ok) {
        latest = await latestRes.json();
      }

      // Fetch AQI history (for forecast)
      const historyRes = await fetch(`${BACKEND_URL}/aqi/history?city_id=${cityId}&limit=8`);
      let history = [];
      if (historyRes.ok) {
        history = await historyRes.json();
      }

      // Update state with new data
      setData(prevData => ({
        ...prevData,
        aqi: latest ? latest.aqi : 0,
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
      }));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [cityId]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up interval for live updates
  useEffect(() => {
    const interval = setInterval(fetchData, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Memoized AQIGaugeCard component
const AQIGaugeCard = React.memo(function AQIGaugeCard({ 
  cityId, 
  cityName, 
  countryName, 
  countryCode 
}) {
  const { data, loading, error } = useLiveAQIData(cityId, cityName, countryName, countryCode);
  
  const computedReview = useMemo(() => getAQIReview(data.aqi), [data.aqi]);
  
  const reviewBg = useMemo(() => {
    return computedReview.color === 'green' ? 'bg-green-100 text-green-700' :
      computedReview.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
      computedReview.color === 'orange' ? 'bg-orange-100 text-orange-700' :
      computedReview.color === 'red' ? 'bg-red-100 text-red-700' :
      'bg-purple-100 text-purple-700';
  }, [computedReview.color]);

  // Animate AQI number in sync with needle
  const [animatedAQI, setAnimatedAQI] = useState(data.aqi);
  useEffect(() => { setAnimatedAQI(data.aqi); }, [data.aqi]);

  // Animate parameter values individually
  const animatedPM25 = useAnimatedNumber(data.parameters[0]?.value || 0, 800);
  const animatedPM10 = useAnimatedNumber(data.parameters[1]?.value || 0, 800);
  const animatedNO2 = useAnimatedNumber(data.parameters[2]?.value || 0, 800);
  const animatedO3 = useAnimatedNumber(data.parameters[3]?.value || 0, 800);

  // Create animated parameters array
  const animatedParams = useMemo(() => [
    { label: 'PM2.5', value: data.parameters[0]?.value || 0, animatedValue: animatedPM25, unit: 'µg/m³' },
    { label: 'PM10', value: data.parameters[1]?.value || 0, animatedValue: animatedPM10, unit: 'µg/m³' },
    { label: 'NO₂', value: data.parameters[2]?.value || 0, animatedValue: animatedNO2, unit: 'µg/m³' },
    { label: 'O₃', value: data.parameters[3]?.value || 0, animatedValue: animatedO3, unit: 'µg/m³' },
  ], [data.parameters, animatedPM25, animatedPM10, animatedNO2, animatedO3]);

  // Normalize forecast points for SVG
  const { normPoints, highlightY, minVal, maxVal, midVal } = useMemo(() => {
    const points = data.forecast.points;
    if (points.length === 0) {
      return { normPoints: [], highlightY: 0, minVal: 0, maxVal: 0, midVal: 0 };
    }
    const normPoints = normalizePoints(points);
    const highlightY = normPoints[data.forecast.highlightIndex] || 0;
    const minVal = Math.min(...points);
    const maxVal = Math.max(...points);
    const midVal = Math.round((minVal + maxVal) / 2);
    return { normPoints, highlightY, minVal, maxVal, midVal };
  }, [data.forecast]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-xl w-full relative animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-xl w-full relative">
        <div className="text-center text-red-500 py-8">
          <div className="text-lg font-semibold mb-2">Error Loading Data</div>
          <div className="text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-xl w-full relative">
      {/* AQI Review */}
      <div className={`absolute left-6 top-6 flex items-center gap-2 ${reviewBg} px-3 py-1 rounded-full text-sm font-semibold shadow`}>
        <span className="text-lg">{computedReview.emoji}</span> {computedReview.label}
      </div>
      {/* AQI Meter */}
      <div className="absolute right-6 top-6 flex flex-col items-center">
        <AQIGauge value={data.aqi} onDisplayValueChange={setAnimatedAQI} />
        <div className="text-center mt-1">
          <div className="text-2xl font-bold text-gray-800">{Math.round(animatedAQI)}</div>
          <div className="text-xs text-gray-400 -mt-1">AQI</div>
        </div>
      </div>
      {/* Location */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{data.location.flag}</span>
          <span className="text-lg font-semibold text-gray-800">{data.location.city}</span>
        </div>
        <div className="text-gray-400 text-sm">{data.location.country}</div>
      </div>
      {/* Parameters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {animatedParams.map((p, i) => (
          <div key={p.label} className="bg-gray-50 rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-gray-800">{p.animatedValue.toFixed(1)}</div>
            <div className="text-xs text-gray-500">{p.label}<br />{p.unit}</div>
          </div>
        ))}
      </div>
      {/* Air Quality Forecast Chart */}
      <div className="mt-2">
        <div className="font-semibold text-gray-700 mb-2">Air Quality Forecast</div>
        <div className="bg-gray-100 rounded-xl p-4">
          <svg viewBox="0 0 320 100" width="100%" height="100">
            {/* X axis */}
            <line x1="20" y1="90" x2="300" y2="90" stroke="#d1d5db" strokeWidth="2" />
            {/* Y axis */}
            <line x1="20" y1="20" x2="20" y2="90" stroke="#d1d5db" strokeWidth="2" />
            {/* Y axis ticks and labels */}
            <g>
              <line x1="16" y1="90" x2="24" y2="90" stroke="#d1d5db" strokeWidth="2" />
              <text x="8" y="94" fontSize="10" fill="#888" textAnchor="start">{minVal}</text>
              <line x1="16" y1="55" x2="24" y2="55" stroke="#d1d5db" strokeWidth="2" />
              <text x="8" y="59" fontSize="10" fill="#888" textAnchor="start">{midVal}</text>
              <line x1="16" y1="20" x2="24" y2="20" stroke="#d1d5db" strokeWidth="2" />
              <text x="8" y="24" fontSize="10" fill="#888" textAnchor="start">{maxVal}</text>
            </g>
            {/* Forecast line */}
            {normPoints.length > 0 && (
              <polyline fill="none" stroke="#22c55e" strokeWidth="3" points={normPoints.map((y, i) => `${20 + i * 40},${y}`).join(' ')} />
            )}
            {/* Highlighted point */}
            {normPoints.length > 0 && (
              <circle cx={20 + data.forecast.highlightIndex * 40} cy={highlightY} r="5" fill="#fff" stroke="#22c55e" strokeWidth="3" />
            )}
            {/* Tooltip box */}
            {normPoints.length > 0 && (
              <>
                <rect x={30 + data.forecast.highlightIndex * 40} y="20" width="60" height="28" rx="8" fill="#fff" stroke="#e5e7eb" />
                <text x={60 + data.forecast.highlightIndex * 40} y="36" textAnchor="middle" fontSize="12" fill="#222">{data.forecast.highlightLabel}</text>
                <text x={60 + data.forecast.highlightIndex * 40} y="50" textAnchor="middle" fontSize="10" fill="#888">{data.forecast.highlightAQI} AQI</text>
              </>
            )}
          </svg>
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
            {data.forecast.times.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AQIGaugeCard; 