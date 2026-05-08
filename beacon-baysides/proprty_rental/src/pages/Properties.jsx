import { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import Sidebar from "../components/Sidebar";
import propertiesData from "../data/properties";

function Properties() {
  const [wishlist, setWishlist] = useState([]);

  const handleToggleWishlist = (id) => {
    setWishlist((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      return next;
    });
  };

  const handleBook = (property) => {
    if (!property.available) {
      alert("This property is booked for now. Try another stay.");
      return;
    }
    alert(`Booking requested for ${property.title}`);
  };

  const handleViewDetails = (property) => {
    alert(`Viewing details for ${property.title}`);
  };

  return (
    <div className="flex min-h-screen bg-[#0B1F4D]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-10">
          Properties
        </h1>

        {/* Property Cards */}
        {Array.isArray(propertiesData) && propertiesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {propertiesData.map((property) => (
              <PropertyCard
                key={property?.id ?? Math.random()}
                property={property ?? {}}
                isWishlisted={wishlist.includes(property?.id)}
                onToggleWishlist={() => handleToggleWishlist(property?.id)}
                onBook={() => handleBook(property ?? {})}
                onQuickView={() => handleViewDetails(property ?? {})}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white/10 p-10 text-center text-white shadow-lg">
            <h2 className="text-3xl font-semibold">No properties available</h2>
            <p className="mt-3 text-slate-300">Please refresh or return to the home page.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;
