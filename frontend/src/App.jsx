// import './App.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="relative min-h-[100vh] flex flex-col">
        {/* Hero Section Background (full section, including behind Navbar) */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <img
            src="src/assets/hero bg.png"
            alt="cityscape background"
            className="w-full h-full object-cover"
          />
        </div>
        <Navbar />
        <div className="flex items-center flex-1 pt-8 md:pt-20 px-8 md:px-20">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-10 md:p-14 max-w-xl shadow-lg border border-white/30 flex flex-col items-start gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-2 drop-shadow-sm">
              Every Breath, Monitored. Every Space, Purified.
            </h1>
            <p className="text-gray-800 text-lg font-medium">
              Real-time air quality monitoring and advanced filtration for a healthier tomorrow.
            </p>
            <p className="text-sky-700 text-base font-semibold">
              Breathe better, live better — with Wotarvo.
            </p>
          </div>
        </div>
      </section>
      {/* Modern Feature Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 px-8 md:px-20 py-16 bg-white/80">
        {/* Device Image Placeholder */}
        <div className="flex-1 flex justify-center">
          <div className="w-96 h-64 bg-gray-200 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
            {/* Replace with actual device image */}
            <span className="text-gray-400 text-7xl">🌀</span>
          </div>
        </div>
        {/* Content Side */}
        <div className="flex-1 max-w-xl flex flex-col gap-6">
          <span className="inline-block bg-sky-100 text-sky-700 px-4 py-1 rounded-full text-xs font-semibold self-start mb-2">About Product</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Revolutionary devices for measuring, filtering, and transforming air quality.
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            The world's first <span className="font-semibold text-sky-700">Turbo Mechanism</span> based ambient air filters that actively capture PM2.5 to PM10 pollutants while providing real-time monitoring—making clean air accessible to everyone, not just the privileged few.
          </p>
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-white/80 border border-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">Turbo Filtration</span>
            <span className="bg-white/80 border border-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">Real-time Monitoring</span>
            <span className="bg-white/80 border border-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">PM2.5 & PM10 Capture</span>
            <span className="bg-white/80 border border-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">Accessible to All</span>
          </div>
          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 mt-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-sky-700">98%</span>
              <span className="text-xs text-gray-500">PM2.5 Capture Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-sky-700">4+</span>
              <span className="text-xs text-gray-500">Devices Deployed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-sky-700">84%</span>
              <span className="text-xs text-gray-500">User Satisfaction</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-sky-700">10+</span>
              <span className="text-xs text-gray-500">Clients Served</span>
            </div>
          </div>
        </div>
      </section>
      {/* Modern Unique Grid Section */}
      <section className="w-full bg-gray-900 py-16 px-4 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 grid-rows-6 md:grid-rows-3 gap-6 md:gap-8">
          {/* Image Placeholder (replace 'grid-image-main' with your image later) */}
          <div className="bg-gray-700 rounded-2xl row-span-2 md:row-span-3 col-span-2 flex items-center justify-center" style={{minHeight:'220px'}}>
            <span className="text-white text-lg">grid-image-main</span>
          </div>
          {/* Card: Higher Efficiency */}
          <div className="bg-lime-100 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-gray-900">40%</span>
            <div className="text-gray-700 font-medium mt-2">Higher Efficiency</div>
            <div className="text-xs text-gray-500 mt-4">Compared to conventional air filters</div>
          </div>
          {/* Card: Cost Reduction */}
          <div className="bg-lime-100 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-gray-900">70%</span>
            <div className="text-gray-700 font-medium mt-2">Cost Reduction</div>
            <div className="text-xs text-gray-500 mt-4">Lower operational costs for users</div>
          </div>
          {/* Card: Installation Time */}
          <div className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-gray-900">24hrs</span>
            <div className="text-gray-700 font-medium mt-2">Installation Time</div>
            <div className="text-xs text-gray-500 mt-4">Quick and easy setup</div>
          </div>
          {/* Card: Filter Replacements */}
          <div className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-gray-900">0</span>
            <div className="text-gray-700 font-medium mt-2">Filter Replacements</div>
            <div className="text-xs text-gray-500 mt-4">No recurring filter costs</div>
          </div>
          {/* Card: Devices Deployed */}
          <div className="bg-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-sky-400">4+</span>
            <div className="text-gray-200 font-medium mt-2">Devices Deployed</div>
          </div>
          {/* Card: User Satisfaction */}
          <div className="bg-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-sky-400">84%</span>
            <div className="text-gray-200 font-medium mt-2">User Satisfaction</div>
          </div>
          {/* Card: Clients Served */}
          <div className="bg-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-sky-400">10+</span>
            <div className="text-gray-200 font-medium mt-2">Clients Served</div>
          </div>
          {/* Card: PM2.5 Capture Rate */}
          <div className="bg-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <span className="text-3xl font-bold text-sky-400">98%</span>
            <div className="text-gray-200 font-medium mt-2">PM2.5 Capture Rate</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
