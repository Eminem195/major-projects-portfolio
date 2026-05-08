const MapView = ({ properties }) => {
  return (
    <section className="rounded-[32px] bg-white p-6 shadow-xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Map summary</h2>
          <p className="mt-2 text-slate-600">Review where your filtered stays are located.</p>
        </div>
        <div className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          {properties.length} locations shown
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-slate-100 p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_35%)]" />
          <div className="relative h-[360px] rounded-3xl bg-[radial-gradient(circle,_rgba(56,189,248,0.16),_transparent_40%)]">
            <div className="absolute left-8 top-10 rounded-3xl bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg">
              Map preview
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <div className="mb-3 text-4xl">🗺️</div>
                <div className="text-sm">Interactive map preview coming soon</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {properties.slice(0, 5).map((property) => (
            <div key={property.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{property.location}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{property.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{property.address}</p>
              <p className="mt-3 text-sm text-slate-700">Rating {property.rating.toFixed(1)} · {property.amenities.slice(0, 2).join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapView;
