import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">About</h1>
        <p className="text-gray-700 text-lg">This is a demo air quality dashboard built with React, Vite, and Tailwind CSS. More info coming soon.</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
