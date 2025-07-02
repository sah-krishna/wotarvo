// import './App.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      {/* Background cityscape illustration (placeholder) */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
          alt="cityscape background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95" />
      </div>
      <Navbar />
      <section className="flex flex-col md:flex-row items-center min-h-[70vh] pt-16 md:pt-28 px-8 md:px-20">
        <div className="max-w-xl md:mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight drop-shadow-sm">
            Fighting Air Pollution,<br />
            <span className="text-gray-400 font-semibold">One Breath at a Time</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">Learn how we monitor and fight air pollution for a healthier tomorrow.</p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-gray-800 transition">
            <span className="text-xl">📊</span> Dashboard
          </Link>
        </div>
      </section>
    </div>
  )
}

export default App
