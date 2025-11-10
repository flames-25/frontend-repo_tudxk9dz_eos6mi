import { Plane, Train, Hotel } from 'lucide-react'

export default function Hero({ onTabChange, activeTab }) {
  const tabs = [
    { key: 'flights', label: 'Flights', icon: Plane },
    { key: 'hotels', label: 'Hotels', icon: Hotel },
    { key: 'trains', label: 'Trains', icon: Train },
  ]

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2000&auto=format&fit=crop"
          alt="Travel"
          className="w-full h-[420px] object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"/>
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Discover. Compare. Travel smarter.
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Find best prices on flights, hotels and trains in one place – inspired by top travel platforms.
        </p>

        <div className="mt-6 bg-white/90 backdrop-blur rounded-xl shadow-lg p-4">
          <div className="flex gap-2 mb-3">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border ${
                  activeTab === key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
          {activeTab === 'flights' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input className="input" placeholder="From (e.g., DEL)" id="from" />
              <input className="input" placeholder="To (e.g., BOM)" id="to" />
              <input className="input" type="date" id="date" />
              <button id="searchFlights" className="btn-primary">Search Flights</button>
            </div>
          )}
          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input className="input" placeholder="City" id="city" />
              <input className="input" type="date" id="checkin" />
              <input className="input" type="date" id="checkout" />
              <button id="searchHotels" className="btn-primary">Search Hotels</button>
            </div>
          )}
          {activeTab === 'trains' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input className="input" placeholder="From (e.g., NDLS)" id="fromTrain" />
              <input className="input" placeholder="To (e.g., BCT)" id="toTrain" />
              <input className="input" type="date" id="dateTrain" />
              <button id="searchTrains" className="btn-primary">Search Trains</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
