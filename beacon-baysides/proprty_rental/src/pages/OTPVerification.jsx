import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!state?.email) {
      navigate("/login", { replace: true });
    }
  }, [navigate, state]);

  const handleVerify = (event) => {
    event.preventDefault();
    if (otp.trim().length < 4) {
      setMessage("Please enter the 4-digit code.");
      return;
    }
    setMessage("Verification successful! Redirecting...");
    setTimeout(() => {
      navigate("/profile", {
        state: {
          user: {
            name: state?.data?.name || "Guest User",
            email: state.email,
            phone: state?.data?.phone || "",
            photo: state?.data?.photoPreview || "",
          },
          action: state.action,
        },
      });
    }, 800);
  };

  const handleResend = () => {
    alert("A fresh OTP has been sent to your email.");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-200">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Email verification</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Enter OTP</h1>
          <p className="mt-3 text-slate-600">
            We sent a 4-digit code to <span className="font-semibold text-slate-900">{state?.email || "your email"}</span>.
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-10 space-y-6">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Verification code</span>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              placeholder="1234"
              className="mt-2 w-full rounded-3xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </label>

          {message && <p className="text-sm text-rose-500">{message}</p>}

          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-600 px-6 py-3 text-white font-semibold transition hover:bg-cyan-700"
          >
            Verify OTP
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <button onClick={handleResend} className="text-cyan-600 hover:text-cyan-800">
            Resend code
          </button>
          <Link to="/login" className="text-slate-500 hover:text-slate-900">
            Change email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
