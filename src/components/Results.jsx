export default function Results({ type, items, loading, error }) {
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-gray-600">Searching {type}...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }
  if (!items || items.length === 0) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-xl font-semibold mb-4 capitalize">{type} results</h3>
      <div className="space-y-3">
        {type === 'flights' && items.map((f, i) => (
          <div key={i} className="rounded-xl border p-4 flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold">{f.airline} • {f.flight_number}</p>
              <p className="text-sm text-gray-600">{f.origin} {"→"} {f.destination} • {f.duration}</p>
              <p className="text-sm text-gray-500">{new Date(f.depart_time).toLocaleString()} - {new Date(f.arrive_time).toLocaleString()}</p>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p className="text-xl font-bold">${f.price.toFixed(2)}</p>
              <button className="btn-secondary mt-2">View</button>
            </div>
          </div>
        ))}

        {type === 'hotels' && items.map((h, i) => (
          <div key={i} className="rounded-xl border p-4 flex items-center gap-4">
            {h.image && <img src={h.image} alt={h.name} className="w-28 h-20 object-cover rounded-lg" />}
            <div className="flex-1">
              <p className="font-semibold">{h.name}</p>
              <p className="text-sm text-gray-600">{h.location} • ⭐ {h.rating}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">${h.price_per_night.toFixed(2)}<span className="text-sm font-normal text-gray-600">/night</span></p>
              <button className="btn-secondary mt-2">View</button>
            </div>
          </div>
        ))}

        {type === 'trains' && items.map((t, i) => (
          <div key={i} className="rounded-xl border p-4 flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold">{t.train_name} • {t.train_number}</p>
              <p className="text-sm text-gray-600">{t.origin} {"→"} {t.destination} • {t.duration}</p>
              <p className="text-sm text-gray-500">{new Date(t.depart_time).toLocaleString()} - {new Date(t.arrive_time).toLocaleString()}</p>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p className="text-xl font-bold">${t.price.toFixed(2)}</p>
              <button className="btn-secondary mt-2">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
