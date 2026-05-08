const QuickViewModal = ({ property, onClose, onBook, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <div className="relative">
          <img src={property.image} alt={property.title} className="h-96 w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-slate-900 shadow-lg"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">{property.title}</h2>
              <p className="mt-2 text-slate-600">{property.address} · {property.location}</p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-3xl font-semibold text-slate-900">₹{property.price.toLocaleString()}</p>
              <button
                type="button"
                onClick={onToggleWishlist}
                className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900"
              >
                {isWishlisted ? "Remove wishlist" : "Add to wishlist"}
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <h3 className="text-xl font-semibold text-slate-900">Overview</h3>
                <p className="mt-3 text-slate-600">{property.description}</p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-5">
                <h3 className="text-xl font-semibold text-slate-900">Details</h3>
                <ul className="mt-4 space-y-3 text-slate-600">
                  <li>Type: {property.type}</li>
                  <li>Rating: {property.rating.toFixed(1)} ⭐</li>
                  <li>Reviews: {property.reviews}</li>
                  <li>Status: {property.available ? "Available" : "Fully booked"}</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[28px] bg-slate-50 p-5">
              <h3 className="text-xl font-semibold text-slate-900">Amenities</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onBook}
              className="rounded-3xl bg-blue-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-blue-700 transition duration-200"
            >
              {property.available ? "Book now" : "Request waitlist"}
            </button>
            <p className="text-sm text-slate-500">Click book to reserve your chosen stay instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
