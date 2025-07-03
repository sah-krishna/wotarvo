// import './App.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="src/assets/hero bg.png"
          alt="cityscape background"
          className="w-full h-full object-cover"
        />
      </div>
      <Navbar />
      <section className="flex items-center min-h-[70vh] pt-16 md:pt-28 px-8 md:px-20">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-10 md:p-14 max-w-xl shadow-lg border border-white/30 flex flex-col items-start gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 mb-2 drop-shadow-sm">
            Every Breath, Monitored. Every Space, Purified.
          </h1>
          <p className="text-gray-800 text-lg font-medium">
            Real-time air quality monitoring and advanced filtration for a healthier tomorrow.
          </p>
          <p className="text-sky-700 text-base font-semibold">
            Breathe better, live better — with Wotarvo.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
