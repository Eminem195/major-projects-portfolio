// const Login = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >

//       <div
//         style={{
//           width: "350px",
//           padding: "30px",
//           boxShadow: "0px 0px 10px gray",
//           borderRadius: "20px",
//         }}
//       >

//         <h1>Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           style={{
//             width: "100%",
//             padding: "12px",
//             marginTop: "20px",
//           }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           style={{
//             width: "100%",
//             padding: "12px",
//             marginTop: "20px",
//           }}
//         />

//         <button
//           style={{
//             width: "100%",
//             padding: "12px",
//             marginTop: "20px",
//             background: "blue",
//             color: "white",
//             border: "none",
//           }}
//         >
//           Login
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Login;


// function Login() {
//   return (
//     <div className="p-10 text-3xl font-bold">
//       Login Page
//     </div>
//   );
// }

// export default Login;

// import Navbar from "../components/Navbar";

// function Login() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="flex justify-center items-center mt-16">
//         <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
//           <h1 className="text-3xl font-bold text-center mb-6">
//             Login
//           </h1>

//           <form className="space-y-5">
//             <div>
//               <label className="block mb-2 font-semibold">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold">
//                 Password
//               </label>

//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-center mt-5 text-gray-600">
//             Don’t have an account?
//             <span className="text-blue-600 cursor-pointer ml-1">
//               Register
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    navigate("/verify-otp", {
      state: {
        action: "login",
        email,
      },
    });
  };

  const handleOAuth = (provider) => {
    alert(`Mock ${provider} OAuth flow started.`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-cyan-700">
      <Navbar />

      <div className="flex justify-center items-center py-16 px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">Welcome Back 👋</h1>
            <p className="text-gray-200 mt-2">Login to manage your bookings and profile.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-slate-200">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-white/10 text-cyan-500 focus:ring-cyan-400"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-cyan-300 hover:text-white">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white py-3 rounded-xl font-semibold text-lg shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => handleOAuth("Google")}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition hover:bg-white/20"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("Facebook")}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition hover:bg-white/20"
            >
              Continue with Facebook
            </button>
          </div>

          <p className="text-center mt-6 text-gray-200">
            Don’t have an account?
            <Link to="/register" className="text-cyan-300 font-semibold ml-2 hover:text-white">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;



