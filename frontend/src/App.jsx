// import './App.css'
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
      <header className="flex justify-between items-center pt-10 px-8 md:px-20">
        <div className="flex items-center gap-2">
          <img src="https://via.placeholder.com/60x40?text=Logo" alt="Logo" className="h-12 drop-shadow" />
          <span className="font-bold text-xl text-sky-700 tracking-tight hidden sm:inline">WETAIRY</span>
        </div>
        <nav className="bg-white/80 backdrop-blur rounded-full px-8 py-2 flex gap-6 shadow-md border border-gray-100">
          <Link to="/" className="text-gray-700 text-base px-4 py-2 rounded-full hover:bg-gray-100 transition font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 text-base px-4 py-2 rounded-full hover:bg-gray-100 transition font-medium">About</Link>
          <Link to="/dashboard" className="flex items-center gap-1 bg-gray-900 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-800 transition">
            <span className="text-lg">📊</span> Dashboard
          </Link>
        </nav>
      </header>
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
