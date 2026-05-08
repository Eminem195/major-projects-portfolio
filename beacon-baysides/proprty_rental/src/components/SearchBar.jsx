import { useMemo } from "react";

const propertyTypes = ["Villa", "Apartment", "Cabin", "Beach House", "Farm House", "Penthouse"];
const starOptions = ["0", "3", "4", "4.5", "5"];
const sortOptions = [
  { value: "price_low", label: "Price: low to high" },
  { value: "price_high", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Top rated" },
];
const amenityOptions = [
  { key: "WiFi", label: "Free Wi-Fi" },
  { key: "Pool", label: "Pool" },
  { key: "AC", label: "Air conditioning" },
  { key: "Parking", label: "Parking" },
  { key: "Pet-friendly", label: "Pet friendly" },
];

const SearchBar = ({ filters, onFiltersChange, onSearch, suggestionOptions, onToggleMap }) => {
  const suggestions = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    if (!query) return [];

    return [...new Set(
      suggestionOptions
        .filter((option) => option.toLowerCase().includes(query))
        .slice(0, 6)
    )];
  }, [filters.query, suggestionOptions]);

  const updateField = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const toggleAmenity = (key) => {
    onFiltersChange({
      ...filters,
      amenities: {
        ...filters.amenities,
        [key]: !filters.amenities[key],
      },
    });
  };

  const updateGuestCount = (field, delta) => {
    onFiltersChange({
      ...filters,
      [field]: Math.max(0, filters[field] + delta),
    });
  };

  return (
    <section className="mx-8 mt-10 bg-white/90 backdrop-blur-lg shadow-2xl rounded-[35px] p-8 border border-gray-200 transition duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
          Search Properties
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Filter stays instantly with location, dates, ratings, and amenities.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <input
                type="search"
                placeholder="🔍 Search city, property name, type..."
                value={filters.query}
                onChange={(e) => updateField("query", e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-300 text-lg shadow-sm"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-20 mt-2 w-full rounded-3xl border border-gray-200 bg-white shadow-xl">
                  {suggestions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("query", option)}
                      className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-cyan-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Check-in</label>
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => updateField("checkIn", e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-300 text-lg"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Check-out</label>
                <input
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => updateField("checkOut", e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-300 text-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">Adults</label>
              <div className="flex items-center gap-3 rounded-3xl border border-gray-300 bg-slate-50 p-3">
                <button
                  type="button"
                  onClick={() => updateGuestCount("adults", -1)}
                  className="rounded-full bg-white px-3 py-2 text-lg shadow-sm"
                >
                  −
                </button>
                <span className="font-semibold">{filters.adults}</span>
                <button
                  type="button"
                  onClick={() => updateGuestCount("adults", 1)}
                  className="rounded-full bg-white px-3 py-2 text-lg shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">Children</label>
              <div className="flex items-center gap-3 rounded-3xl border border-gray-300 bg-slate-50 p-3">
                <button
                  type="button"
                  onClick={() => updateGuestCount("children", -1)}
                  className="rounded-full bg-white px-3 py-2 text-lg shadow-sm"
                >
                  −
                </button>
                <span className="font-semibold">{filters.children}</span>
                <button
                  type="button"
                  onClick={() => updateGuestCount("children", 1)}
                  className="rounded-full bg-white px-3 py-2 text-lg shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={onSearch}
              className="h-full rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold shadow-lg hover:scale-[1.01] transition duration-300"
            >
              Apply Filters
            </button>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-slate-50 p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Filter summary</h3>
                <p className="text-sm text-slate-500">Use the controls to refine your search instantly.</p>
              </div>
              <div className="rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-inner">
                {filters.showMap ? "Map view active" : "List view active"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-gray-200 bg-slate-50 p-5 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-800">Advanced filters</h3>
            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Property type</label>
                <select
                  value={filters.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-300 text-lg bg-white"
                >
                  <option value="">All property types</option>
                  {propertyTypes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Star rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => updateField("rating", e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-300 text-lg bg-white"
                >
                  {starOptions.map((value) => (
                    <option key={value} value={value}>
                      {value === "0" ? "All ratings" : `${value}+ stars`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Sort by</label>
                <select
                  value={filters.sort}
                  onChange={(e) => updateField("sort", e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-300 text-lg bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <span className="text-sm font-semibold text-slate-700">Amenities</span>
              <div className="grid grid-cols-2 gap-3">
                {amenityOptions.map((option) => (
                  <label
                    key={option.key}
                    className="flex items-center gap-3 rounded-3xl border border-gray-300 bg-white p-3 text-sm cursor-pointer transition duration-200 hover:border-cyan-400"
                  >
                    <input
                      type="checkbox"
                      checked={filters.amenities[option.key] || false}
                      onChange={() => toggleAmenity(option.key)}
                      className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-slate-50 p-5 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-800">Map view</h3>
            <button
              type="button"
              onClick={onToggleMap}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 text-white font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition duration-300"
            >
              {filters.showMap ? "Hide map" : "Show map"}
            </button>
            <p className="mt-4 text-sm text-slate-500">
              Toggle the map summary for the current selection of properties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
