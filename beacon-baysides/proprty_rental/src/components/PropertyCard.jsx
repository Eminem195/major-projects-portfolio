// import { Link } from "react-router-dom";

// const PropertyCard = ({ property }) => {
//   return (
//     <div
//       style={{
//         background: "white",
//         borderRadius: "20px",
//         overflow: "hidden",
//         boxShadow: "0px 0px 10px gray",
//       }}
//     >

//       <img
//         src={property.image}
//         alt=""
//         style={{
//           width: "100%",
//           height: "250px",
//           objectFit: "cover",
//         }}
//       />

//       <div style={{ padding: "20px" }}>

//         <h1>{property.title}</h1>

//         <p>{property.location}</p>

//         <h2>{property.price}</h2>

//         <Link to="/property">

//           <button
//             style={{
//               background: "blue",
//               color: "white",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "10px",
//               cursor: "pointer",
//             }}
//           >
//             View Details
//           </button>

//         </Link>

//       </div>

//     </div>
//   );
// };

// export default PropertyCard;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PropertyCard = ({ property }) => {

//   const [liked, setLiked] = useState(false);

//   const navigate = useNavigate();

//   // Book Property
//   const bookProperty = () => {
//     alert(`${property.title} booked successfully`);
//   };

//   // View Details
//   const viewDetails = () => {

//     // Check property id
//     if (!property?.id) {
//       alert("Property ID not found");
//       return;
//     }

//     navigate(`/propertydetails/${property.id}`);
//   };

//   return (
//     <div
//       style={{
//         background: "white",
//         borderRadius: "20px",
//         overflow: "hidden",
//         boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
//         position: "relative",
//         transition: "0.3s",
//       }}
//     >

//       {/* Wishlist Button */}
//       <button
//         onClick={() => setLiked(!liked)}
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "10px",
//           border: "none",
//           background: "white",
//           borderRadius: "30px",
//           padding: "8px 14px",
//           cursor: "pointer",
//           fontSize: "16px",
//           fontWeight: "bold",
//           zIndex: 10,
//           transition: "0.3s",
//         }}
//       >
//      {liked ? "❤️ Added" : "🤍 Wishlist"}
//       </button>

//       {/* Image */}
//       <img
//         src={property.image}
//         alt={property.title}
//         style={{
//           width: "100%",
//           height: "250px",
//           objectFit: "cover",
//         }}
//       />

//       {/* Content */}
//       <div style={{ padding: "20px" }}>

//         <h2
//           style={{
//             fontSize: "28px",
//             marginBottom: "10px",
//           }}
//         >
//           {property.title}
//         </h2>

//         <p
//           style={{
//             color: "gray",
//             marginBottom: "10px",
//             fontSize: "18px",
//           }}
//         >
//           📍 {property.location}
//         </p>

//         <h3
//           style={{
//             color: "#16a34a",
//             fontSize: "24px",
//           }}
//         >
//           {property.price}
//         </h3>

//         {/* Buttons */}
//         <div
//           style={{
//             display: "flex",
//             gap: "10px",
//             marginTop: "20px",
//           }}
//         >

//           {/* Book Button */}
//           <button
//             onClick={bookProperty}
//             style={{
//               background: "#2563eb",
//               color: "white",
//               border: "none",
//               padding: "12px 20px",
//               borderRadius: "10px",
//               cursor: "pointer",
//               fontWeight: "bold",
//               fontSize: "16px",
//             }}
//           >
//             Book Now
//           </button>

//           {/* View Details Button */}
//           <button
//             onClick={viewDetails}
//             style={{
//               background: "#06b6d4",
//               color: "white",
//               border: "none",
//               padding: "12px 20px",
//               borderRadius: "10px",
//               cursor: "pointer",
//               fontWeight: "bold",
//               fontSize: "16px",
//             }}
//           >
//             View Details
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default PropertyCard;




const formatPrice = (value) => {
  const amount = Number(value || 0);
  return `₹${amount.toLocaleString()}`;
};

const PropertyCard = ({ property = {}, isWishlisted, onToggleWishlist, onBook, onQuickView }) => {
  const starCount = Math.round(property.rating || 0);
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const remainingAmenities = amenities.length > 3 ? amenities.length - 3 : 0;

  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-xl transition duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="h-80 w-full object-cover"
        />
        <button
          type="button"
          onClick={onToggleWishlist}
          className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-lg shadow-md"
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
        {property.isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">
            New
          </span>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{property.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{property.location} · {property.type}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-slate-900">{formatPrice(property.price)}</p>
            {property.originalPrice && property.originalPrice > property.price && (
              <p className="text-sm text-slate-500 line-through">{formatPrice(property.originalPrice)}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={index < starCount ? "text-amber-500" : "text-slate-300"}>
              ★
            </span>
          ))}
          <span className="ml-2 font-semibold text-slate-700">{property.rating ? property.rating.toFixed(1) : "0.0"}</span>
          <span className="text-slate-500">({property.reviews ?? 0} reviews)</span>
        </div>

        <p className="text-slate-600">{property.description ?? "Coastal retreat with premium amenities and a relaxing stay."}</p>

        <div className="grid gap-2 sm:grid-cols-2">
          {amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
              {amenity}
            </span>
          ))}
          {remainingAmenities > 0 && (
            <span className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
              +{remainingAmenities} more
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBook}
            className={`rounded-3xl px-6 py-3 text-sm font-semibold text-white transition ${property.available ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-400 cursor-not-allowed"}`}
            disabled={!property.available}
          >
            {property.available ? "Book now" : "Fully booked"}
          </button>
          <button
            type="button"
            onClick={onQuickView}
            className="rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Quick view
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;