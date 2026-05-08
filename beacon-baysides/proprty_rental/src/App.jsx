
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Properties from "./pages/Properties";
// import PropertyDetails from "./pages/PropertyDetails";
// import Booking from "./pages/Booking";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Users from "./pages/Users";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/properties" element={<Properties />} />
//         <Route path="/property/:id" element={<PropertyDetails />} />
//         <Route path="/booking" element={<Booking />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/analytics" element={<Analytics />} />
//         <Route path="/users" element={<Users />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Analytics from "./pages/Analytics";
import Booking from "./pages/Booking";
import BookingForm from "./pages/BookingForm";
import Confirmation from "./pages/Confirmation";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Register from "./pages/Register";
import Users from "./pages/Users";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1f4d] text-white px-6">
      <div className="max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl shadow-black/20">
        <h1 className="text-5xl font-bold mb-4">Page not found</h1>
        <p className="text-lg text-slate-200 mb-6">The page you requested is unavailable. Please return to the home page or try again.</p>
        <a href="/" className="inline-flex rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-cyan-400 transition">
          Go Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/users" element={<Users />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;