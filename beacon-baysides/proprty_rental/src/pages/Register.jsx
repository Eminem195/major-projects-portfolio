

// import Navbar from "../components/Navbar";

// function Register() {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100">
//       <Navbar />

//       <div className="flex justify-center items-center py-16 px-4">
//         <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl">
          
//           <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold text-gray-800">
//               Create Account
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Register to continue booking properties
//             </p>
//           </div>

//           <form className="space-y-5">

//             <div>
//               <label className="block mb-2 font-semibold text-gray-700">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold text-gray-700">
//                 Email Address
//               </label>

//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold text-gray-700">
//                 Password
//               </label>

//               <input
//                 type="password"
//                 placeholder="Create password"
//                 className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold text-gray-700">
//                 Confirm Password
//               </label>

//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold hover:scale-105 duration-300"
//             >
//               Create Account
//             </button>
//           </form>

//           <p className="text-center mt-6 text-gray-600">
//             Already have an account?
//             <span className="text-blue-600 font-semibold cursor-pointer ml-1 hover:underline">
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;


import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-cyan-700">

      <Navbar />

      <div className="flex justify-center items-center py-16 px-4">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 w-full max-w-md p-8 rounded-3xl shadow-2xl">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white">
              Create Account 🚀
            </h1>

            <p className="text-gray-200 mt-2">
              Register to continue booking properties
            </p>

          </div>

          <form className="space-y-5">

            <div>
              <label className="block mb-2 font-semibold text-white">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-white">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-white">
                Password
              </label>

              <input
                type="password"
                placeholder="Create password"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-white">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-6 text-gray-200">

            Already have an account?

            <Link
              to="/login"
              className="text-cyan-300 font-semibold ml-2 hover:text-white"
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;