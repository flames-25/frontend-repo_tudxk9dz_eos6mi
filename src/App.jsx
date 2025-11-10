import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Results from './components/Results'

function App() {
  const [activeTab, setActiveTab] = useState('flights')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    function onClick(e) {
      if (e.target.id === 'searchFlights') {
        const origin = document.getElementById('from').value
        const destination = document.getElementById('to').value
        const date = document.getElementById('date').value
        search('flights', { origin, destination, date })
      }
      if (e.target.id === 'searchHotels') {
        const city = document.getElementById('city').value
        const checkin = document.getElementById('checkin').value
        const checkout = document.getElementById('checkout').value
        search('hotels', { city, checkin, checkout })
      }
      if (e.target.id === 'searchTrains') {
        const origin = document.getElementById('fromTrain').value
        const destination = document.getElementById('toTrain').value
        const date = document.getElementById('dateTrain').value
        search('trains', { origin, destination, date })
      }
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  const search = async (type, params) => {
    setActiveTab(type)
    setLoading(true)
    setError('')
    setItems([])
    try {
      let url = ''
      if (type === 'flights') {
        const { origin, destination, date } = params
        url = `${baseUrl}/api/search/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`
      } else if (type === 'hotels') {
        const { city, checkin, checkout } = params
        url = `${baseUrl}/api/search/hotels?city=${encodeURIComponent(city)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}`
      } else if (type === 'trains') {
        const { origin, destination, date } = params
        url = `${baseUrl}/api/search/trains?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />
      <Hero onTabChange={setActiveTab} activeTab={activeTab} />
      <Results type={activeTab} items={items} loading={loading} error={error} />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-3">Recent searches</h2>
        <Recent baseUrl={baseUrl} onReSearch={search} />
      </section>

      <footer className="text-center text-sm text-gray-500 py-10">Made for travel lovers ✈️</footer>
    </div>
  )
}

function Recent({ baseUrl, onReSearch }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/searches?limit=8`)
        const data = await res.json()
        setItems(data.items || [])
      } catch {}
    }
    fetchRecent()
  }, [baseUrl])

  if (!items.length) return null
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((it, i) => (
        <button
          key={i}
          className="rounded-xl border p-3 text-left hover:bg-white/60"
          onClick={() => onReSearch(it.type, it)}
        >
          <p className="font-medium capitalize">{it.type}</p>
          <p className="text-sm text-gray-600">
            {it.type === 'hotels' ? (
              <>
                {it.city} • {it.checkin} → {it.checkout}
              </>
            ) : (
              <>
                {it.origin} → {it.destination} • {it.date}
              </>
            )}
          </p>
        </button>
      ))}
    </div>
  )
}

export default App
