// import './App.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

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
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 md:p-14 max-w-xl shadow-lg border border-white/20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">
            Clean Air. Clear Mind.
          </h1>
          <p className="text-gray-800 text-lg mb-6 font-medium">
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
