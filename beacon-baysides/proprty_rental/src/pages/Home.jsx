import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import MapView from "../components/MapView";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import QuickViewModal from "../components/QuickViewModal";
import ReviewSection from "../components/ReviewSection";
import SearchBar from "../components/SearchBar";
import Toast from "../components/Toast";
import propertiesData from "../data/properties";

const PAGE_SIZE = 6;

const initialFilters = {
  query: "",
  type: "",
  rating: "0",
  sort: "price_low",
  checkIn: "",
  checkOut: "",
  adults: 2,
  children: 0,
  amenities: {
    WiFi: false,
    Pool: false,
    AC: false,
    Parking: false,
    "Pet-friendly": false,
  },
  showMap: false,
};

function Home() {
  const [filters, setFilters] = useState(initialFilters);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [page, setPage] = useState(1);

  const suggestionOptions = useMemo(
    () => [
      ...new Set(
        propertiesData.flatMap((property) => [
          property.location,
          property.title,
          property.type,
          property.address,
        ])
      ),
    ],
    []
  );

  const filteredProperties = useMemo(() => {
    const activeAmenities = Object.entries(filters.amenities)
      .filter(([, value]) => value)
      .map(([name]) => name);

    return propertiesData
      .filter((property) => {
        const query = filters.query.trim().toLowerCase();
        const target = `${property.title} ${property.location} ${property.type} ${property.address}`.toLowerCase();
        if (query && !target.includes(query)) {
          return false;
        }

        if (filters.type && property.type !== filters.type) {
          return false;
        }

        if (filters.rating !== "0" && property.rating < Number(filters.rating)) {
          return false;
        }

        if (
          activeAmenities.length > 0 &&
          !activeAmenities.every((amenity) => property.amenities.includes(amenity))
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sort === "price_low") {
          return a.price - b.price;
        }
        if (filters.sort === "price_high") {
          return b.price - a.price;
        }
        if (filters.sort === "newest") {
          return Number(b.isNew) - Number(a.isNew) || b.id - a.id;
        }
        if (filters.sort === "popular") {
          return Number(b.isPopular) - Number(a.isPopular) || b.rating - a.rating;
        }
        return 0;
      });
  }, [filters]);

  const visibleProperties = filteredProperties.slice(0, page * PAGE_SIZE);

  const updateFilters = (nextFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const showToast = (message) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleToggleWishlist = (id) => {
    setWishlist((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      showToast(next.includes(id) ? "Added to wishlist" : "Removed from wishlist");
      return next;
    });
  };

  const handleBook = (property) => {
    if (!property.available) {
      showToast("This property is booked for now. Try another stay.");
      return;
    }

    showToast(`Booking requested for ${property.title}`);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleToggleMap = () => {
    updateFilters({ ...filters, showMap: !filters.showMap });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Luxury Coastal Living
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-cyan-100 font-light">
            Premium villas and beachside properties for your perfect escape
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/properties"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Properties
            </Link>
            <button
              onClick={() => showToast("Booking feature coming soon!")}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <div className="bg-slate-100 pt-16">
        <SearchBar
          filters={filters}
          onFiltersChange={updateFilters}
          onSearch={() => showToast(`Filters applied — ${filteredProperties.length} properties found.`)}
          suggestionOptions={suggestionOptions}
          onToggleMap={handleToggleMap}
        />

        <main className="py-10 px-6">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-slate-900">Find your perfect stay</h1>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
              Browse curated properties with live search, advanced filters, and an interactive map view.
            </p>
          </div>
          <div className="rounded-3xl bg-white px-6 py-4 shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Results</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredProperties.length}</p>
            <p className="text-sm text-slate-500">{wishlist.length} saved to wishlist</p>
          </div>
        </div>

        {filters.showMap && (
          <div className="mb-10">
            <MapView properties={filteredProperties} />
          </div>
        )}

        <section className="grid gap-8 xl:grid-cols-3 lg:grid-cols-2">
          {visibleProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isWishlisted={wishlist.includes(property.id)}
              onToggleWishlist={() => handleToggleWishlist(property.id)}
              onBook={() => handleBook(property)}
              onQuickView={() => handleViewDetails(property)}
            />
          ))}
        </section>

        {filteredProperties.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900">No properties match your filters</h2>
            <p className="mt-4 text-slate-600">Try a broader search or remove a filter to explore more stays.</p>
          </div>
        )}

        {visibleProperties.length < filteredProperties.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              className="rounded-full bg-blue-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-blue-700 transition duration-200"
            >
              Load more properties
            </button>
          </div>
        )}

        <div className="mt-16">
          <ReviewSection />
        </div>
      </main>
      </div>

      {selectedProperty && (
        <QuickViewModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onBook={() => handleBook(selectedProperty)}
          onToggleWishlist={() => handleToggleWishlist(selectedProperty.id)}
          isWishlisted={wishlist.includes(selectedProperty.id)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}

export default Home;
