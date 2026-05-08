import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const defaultUser = {
  name: "Aisha Sharma",
  email: "aisha.sharma@example.com",
  phone: "+91 98765 43210",
  photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
};

const bookingHistory = [
  { id: 1023, title: "Luxury Villa", dates: "Jun 12 - Jun 16", status: "Confirmed", amount: 104000 },
  { id: 2045, title: "Beach Resort", dates: "May 20 - May 23", status: "Pending", amount: 54000 },
  { id: 3098, title: "Mountain Cabin", dates: "Jul 1 - Jul 6", status: "Completed", amount: 76000 },
];

const wishlistItems = [
  { id: 1, title: "Oceanfront Apartment", location: "Goa" },
  { id: 2, title: "Heritage Bungalow", location: "Jaipur" },
  { id: 3, title: "Lakeview Suite", location: "Udaipur" },
];

const reviews = [
  { id: 1, property: "Downtown Loft", rating: 5, comment: "Amazing stay with great service." },
  { id: 2, property: "Forest Retreat", rating: 4, comment: "Peaceful escape and beautiful views." },
];

const tabs = ["Profile", "My Bookings", "My Wishlist", "My Reviews"];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incomingUser = location.state?.user || defaultUser;
  const [activeTab, setActiveTab] = useState("Profile");
  const [user, setUser] = useState({ ...incomingUser });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoPreview, setPhotoPreview] = useState(incomingUser.photo || "");
  const [message, setMessage] = useState("");

  const stats = useMemo(
    () => [
      { title: "Bookings", value: bookingHistory.length },
      { title: "Wishlist", value: wishlistItems.length },
      { title: "Reviews", value: reviews.length },
    ],
    []
  );

  const handleProfileSave = (event) => {
    event.preventDefault();
    setMessage("Profile updated successfully.");
    setTimeout(() => setMessage(""), 2500);
  };

  const handlePasswordSave = (event) => {
    event.preventDefault();
    if (!password || !newPassword || !confirmPassword) {
      alert("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    setMessage("Password changed successfully.");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setMessage(""), 2500);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setUser((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">User account</p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">My profile</h1>
              <p className="mt-2 text-slate-600">Update your details, manage bookings, wishlist, and reviews from a single dashboard.</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Back to app
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.title} className="rounded-3xl bg-slate-50 p-6 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{stat.title}</p>
                <p className="mt-4 text-4xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src={photoPreview || defaultUser.photo}
                alt="Profile"
                className="h-28 w-28 rounded-full object-cover border-4 border-cyan-500"
              />
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{user.name}</h2>
                <p className="text-slate-500">{user.email}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tab ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            {message && <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-800 shadow-sm">{message}</div>}

            {activeTab === "Profile" && (
              <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">Edit personal info</h2>
                <form onSubmit={handleProfileSave} className="mt-8 space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Name</span>
                      <input
                        value={user.name}
                        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Email</span>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Phone</span>
                      <input
                        type="tel"
                        value={user.phone}
                        onChange={(e) => setUser((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Profile photo</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none" />
                    </label>
                  </div>

                  <button className="rounded-3xl bg-cyan-600 px-6 py-3 text-white font-semibold hover:bg-cyan-700">
                    Save changes
                  </button>
                </form>

                <div className="mt-10 rounded-3xl bg-slate-50 p-6">
                  <h3 className="text-xl font-semibold text-slate-900">Change password</h3>
                  <form onSubmit={handlePasswordSave} className="mt-6 space-y-4">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Current password"
                        className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                    </div>
                    <button className="rounded-3xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800">
                      Update password
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "My Bookings" && (
              <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">My Bookings</h2>
                <div className="mt-8 space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Booking ID #{booking.id}</p>
                          <h3 className="text-xl font-semibold text-slate-900">{booking.title}</h3>
                          <p className="mt-2 text-slate-600">{booking.dates}</p>
                        </div>
                        <div className="space-y-2 text-right">
                          <p className="text-lg font-semibold text-slate-900">₹{booking.amount.toLocaleString()}</p>
                          <span className={`inline-flex rounded-full px-3 py-1 text-sm ${
                            booking.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : booking.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "My Wishlist" && (
              <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">My Wishlist</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-200 p-5">
                      <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-slate-600">{item.location}</p>
                      <button className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                        View listing
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "My Reviews" && (
              <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">My Reviews</h2>
                <div className="mt-8 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-slate-900">{review.property}</h3>
                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-800">
                          {review.rating} ★
                        </span>
                      </div>
                      <p className="mt-3 text-slate-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
