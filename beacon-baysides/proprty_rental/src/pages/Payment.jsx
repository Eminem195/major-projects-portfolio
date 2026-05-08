import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const paymentTabs = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "upi", label: "UPI" },
  { id: "wallet", label: "Wallet" },
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [walletId, setWalletId] = useState("");

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-lg ring-1 ring-slate-200 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">No booking data found</h1>
          <p className="mt-4 text-slate-600">Please start from the booking form to complete your reservation.</p>
          <Link
            to="/booking"
            className="mt-8 inline-flex rounded-2xl bg-cyan-600 px-6 py-3 text-white shadow-lg hover:bg-cyan-700"
          >
            Open booking form
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    if (method === "card" && (!cardNumber || !expiry || !cvv)) {
      alert("Please complete all card details.");
      return;
    }
    if (method === "upi" && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }
    if (method === "wallet" && !walletId) {
      alert("Please enter your wallet ID.");
      return;
    }

    navigate("/confirmation", {
      state: {
        booking,
        paymentMethod: paymentTabs.find((item) => item.id === method)?.label || "Card",
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <p className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Payment gateway
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Secure payment</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Choose your preferred payment method and complete the booking safely.
          </p>
        </div>
        <Link
          to="/booking"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
        >
          Back to booking form
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-6 flex flex-wrap gap-3">
            {paymentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMethod(tab.id)}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  method === tab.id
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Booking total</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">₹{booking.total.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                {booking.nights} nights
              </div>
            </div>

            {method === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Card number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Expiry date</span>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">CVV</span>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                    />
                  </label>
                </div>
                <div className="rounded-3xl bg-slate-900 p-4 text-white">
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Stripe / Razorpay</p>
                  <p className="mt-3 text-sm text-slate-100">Secure payment is protected by industry-standard encryption.</p>
                </div>
              </div>
            )}

            {method === "upi" && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Use your preferred UPI ID to complete the payment.</p>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="example@okaxis"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                />
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Mock Razorpay</p>
                  <p className="mt-2 text-slate-600">A payment request will be generated once you submit.</p>
                </div>
              </div>
            )}

            {method === "wallet" && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Pay instantly with your wallet account.</p>
                <input
                  type="text"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  placeholder="Paytm / PhonePe / Google Pay ID"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                />
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Wallet balance</p>
                  <p className="mt-2 text-slate-600">Available balance will be used for checkout.</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handlePayment}
            className="mt-8 w-full rounded-2xl bg-cyan-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-cyan-700"
          >
            Pay ₹{booking.total.toLocaleString()} now
          </button>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Booking details</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{booking.property.title}</h2>
            <p className="mt-2 text-slate-600">{booking.property.location}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Check-in</p>
                <p className="mt-2 text-slate-900">{booking.checkIn}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Check-out</p>
                <p className="mt-2 text-slate-900">{booking.checkOut}</p>
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Guests</p>
              <p className="mt-2 text-slate-900">{booking.adults} adults, {booking.children} children</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Payment summary</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-slate-600">
                <span>Room total</span>
                <span>₹{booking.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Service charge</span>
                <span>₹{booking.serviceCharge.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                <span>Payable</span>
                <span>₹{booking.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Payment;
