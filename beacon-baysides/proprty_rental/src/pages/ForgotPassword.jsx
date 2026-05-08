import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-200">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Forgot Password</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Reset your password</h1>
          <p className="mt-3 text-slate-600">Enter your email and we’ll send a reset link right away.</p>
        </div>

        {sent ? (
          <div className="space-y-6">
            <div className="rounded-3xl bg-emerald-50 p-6 text-emerald-900">
              <p className="font-semibold">Reset link sent!</p>
              <p className="mt-2 text-sm text-emerald-700">Check your inbox for instructions to reset your password.</p>
            </div>
            <Link
              to="/login"
              className="inline-flex w-full justify-center rounded-3xl bg-cyan-600 px-6 py-3 text-white font-semibold hover:bg-cyan-700"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-cyan-600 px-6 py-3 text-white font-semibold hover:bg-cyan-700"
            >
              Send reset link
            </button>
            <p className="text-center text-sm text-slate-500">
              Remembered your password?
              <Link to="/login" className="text-cyan-600 font-semibold ml-1 hover:text-cyan-700">
                Login now
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
