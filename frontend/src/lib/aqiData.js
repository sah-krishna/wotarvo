const aqiData = [
  {
    aqi: 20,
    location: { city: 'Washington, D.C.', country: 'United States', flag: '🇺🇸' },
    parameters: [
      { label: 'PM2.5', value: 10.05, unit: 'µg/m³' },
      { label: 'PM10', value: 12.43, unit: 'µg/m³' },
      { label: 'NO₂', value: 8.57, unit: 'µg/m³' },
      { label: 'O₃', value: 30.0, unit: 'µg/m³' },
    ],
    forecast: {
      points: [40, 35, 38, 30, 32, 28, 34, 30],
      highlightIndex: 5,
      times: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
      highlightLabel: '08.29',
      highlightAQI: 20,
    },
  },
  {
    aqi: 75,
    location: { city: 'Los Angeles', country: 'United States', flag: '🇺🇸' },
    parameters: [
      { label: 'PM2.5', value: 22.1, unit: 'µg/m³' },
      { label: 'PM10', value: 30.2, unit: 'µg/m³' },
      { label: 'NO₂', value: 15.7, unit: 'µg/m³' },
      { label: 'O₃', value: 40.0, unit: 'µg/m³' },
    ],
    forecast: {
      points: [50, 55, 60, 65, 70, 75, 80, 78],
      highlightIndex: 4,
      times: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
      highlightLabel: '08.29',
      highlightAQI: 75,
    },
  },
  {
    aqi: 130,
    location: { city: 'Delhi', country: 'India', flag: '🇮🇳' },
    parameters: [
      { label: 'PM2.5', value: 60.5, unit: 'µg/m³' },
      { label: 'PM10', value: 80.2, unit: 'µg/m³' },
      { label: 'NO₂', value: 30.7, unit: 'µg/m³' },
      { label: 'O₃', value: 50.0, unit: 'µg/m³' },
    ],
    forecast: {
      points: [120, 125, 130, 135, 140, 130, 120, 110],
      highlightIndex: 2,
      times: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
      highlightLabel: '08.29',
      highlightAQI: 130,
    },
  },
  {
    aqi: 210,
    location: { city: 'Beijing', country: 'China', flag: '🇨🇳' },
    parameters: [
      { label: 'PM2.5', value: 90.5, unit: 'µg/m³' },
      { label: 'PM10', value: 110.2, unit: 'µg/m³' },
      { label: 'NO₂', value: 40.7, unit: 'µg/m³' },
      { label: 'O₃', value: 60.0, unit: 'µg/m³' },
    ],
    forecast: {
      points: [200, 205, 210, 215, 220, 210, 200, 190],
      highlightIndex: 3,
      times: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
      highlightLabel: '08.29',
      highlightAQI: 210,
    },
  },
];

export default aqiData; 