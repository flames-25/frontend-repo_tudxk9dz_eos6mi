import { Plane, Train, Hotel, Search } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 grid place-items-center text-white font-bold">TB</div>
          <span className="text-xl font-bold tracking-tight">Travel Buddy</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-gray-900 transition" href="#flights">Flights</a>
          <a className="hover:text-gray-900 transition" href="#hotels">Hotels</a>
          <a className="hover:text-gray-900 transition" href="#trains">Trains</a>
        </nav>
        <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">
          <Search size={16} /> Explore
        </button>
      </div>
    </header>
  )
}
