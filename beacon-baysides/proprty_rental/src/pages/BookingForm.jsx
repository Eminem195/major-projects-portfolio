import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const propertySummary = {
  title: "Sunset Beach Villa",
  location: "Goa, India",
  description:
    "A premium beachfront villa with private pool, sunrise terrace, and concierge service.",
  pricePerNight: 9500,
  rating: 4.9,
  reviews: 184,
  image:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
};

const BookingForm = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.round((end - start) / msPerDay);
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const subtotal = nights * propertySummary.pricePerNight;
  const serviceCharge = Math.round(subtotal * 0.08);
  const total = subtotal + serviceCharge;

  const navigate = useNavigate();

  const handleContinue = () => {
    if (!fullName || !email || !phone || !checkIn || !checkOut || nights < 1) {
      alert("Please complete all fields and select valid dates.");
      return;
    }

    navigate("/payment", {
      state: {
        booking: {
          property: propertySummary,
          checkIn,
          checkOut,
          adults,
          children,
          fullName,
          email,
          phone,
          notes,
          nights,
          subtotal,
          serviceCharge,
          total,
          bookingId: Math.floor(100000 + Math.random() * 900000),
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <p className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-800">
            Booking form
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Reserve your stay</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Fill in your dates and guest information, then continue to secure payment.
          </p>
        </div>

        <Link
          to="/bookings"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
        >
          View booking management
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">Property summary</h2>
              <p className="mt-2 text-slate-500">{propertySummary.description}</p>
            </div>
            <span className="rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {propertySummary.rating} ★ {propertySummary.reviews} reviews
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
            <img
              src={propertySummary.image}
              alt={propertySummary.title}
              className="h-72 w-full rounded-3xl object-cover shadow-xl"
            />

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">{propertySummary.title}</h3>
                <p className="mt-2 text-slate-600">{propertySummary.location}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Price / night</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">₹{propertySummary.pricePerNight}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{propertySummary.location.split(",")[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-slate-900">Guest details</h2>
            <p className="text-slate-500 mt-2">Complete guest and date details before continuing to payment.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Check-in</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Check-out</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Adults</span>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Children</span>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
          </div>

          <div className="mt-6 space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Full name</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Mobile number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Special requests</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Late arrival, extra towels, high floor..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </label>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between gap-4 text-slate-600">
              <span>Nights</span>
              <span>{nights || 0}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-slate-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-slate-600">
              <span>Service charge</span>
              <span>₹{serviceCharge.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="mt-6 w-full rounded-2xl bg-cyan-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Continue to payment
          </button>
        </section>
      </div>
    </div>
  );
};

export default BookingForm;
