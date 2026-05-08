

import { useState } from "react";
import Navbar from "../components/Navbar";

const Bookings = () => {

  // Booking State
  const [bookings, setBookings] = useState([
    {
      id: 1023,
      title: "Luxury Villa",
      location: "Goa",
      price: "₹25,000",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
      status: "Confirmed",
    },

    {
      id: 2045,
      title: "Beach Resort",
      location: "Mumbai",
      price: "₹18,000",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      status: "Pending",
    },

    {
      id: 3098,
      title: "Mountain Cabin",
      location: "Manali",
      price: "₹12,500",
      image:
        "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80",
      status: "Confirmed",
    },

    {
      id: 4567,
      title: "Modern Apartment",
      location: "Delhi",
      price: "₹15,000",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
      status: "Cancelled",
    },
  ]);

  // Form show hide
  const [showForm, setShowForm] = useState(false);

  // Input States
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  // Add Booking Function
  const handleAddBooking = () => {

    if (!title || !location || !price) {
      alert("Please fill all fields");
      return;
    }

   const statusOptions = [
  "Pending",
  "Confirmed",
  "Cancelled",
];

const randomStatus =
  statusOptions[
    Math.floor(Math.random() * statusOptions.length)
  ];

const newBooking = {
  id: Math.floor(Math.random() * 10000),
  title,
  location,
  price,
  image:
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",

  status: randomStatus,
};

    setBookings([newBooking, ...bookings]);

    // Clear Inputs
    setTitle("");
    setLocation("");
    setPrice("");

    alert("New Booking Added Successfully");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-900 to-blue-700 p-8">

      {/* Heading */}
      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-bold text-white">
          Bookings
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200"
        >
          + New Booking
        </button>

      </div>

      {/* Add Booking Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-3xl shadow-2xl mb-10">

          <h2 className="text-3xl font-bold mb-5 text-gray-800">
            Add New Booking
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Property Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded-xl border outline-none"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 rounded-xl border outline-none"
            />

            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 rounded-xl border outline-none"
            />

          </div>

          <button
            onClick={handleAddBooking}
            className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Save Booking
          </button>

        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {bookings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300"
          >

            <img
              src={item.image}
              alt={item.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">

              <h2 className="text-3xl font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="text-gray-500 mt-2">
                📍 {item.location}
              </p>

              <p className="text-blue-600 font-semibold mt-3">
                Booking ID: #{item.id}
              </p>

              <p className="text-2xl font-bold text-gray-800 mt-4">
                {item.price}
              </p>

              <button
                className={`mt-5 px-4 py-2 rounded-xl text-white font-semibold ${
                  item.status === "Confirmed"
                    ? "bg-green-500"
                    : item.status === "Pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {item.status}
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Bookings;