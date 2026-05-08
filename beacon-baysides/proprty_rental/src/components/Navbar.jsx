// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div
//       style={{
//         background: "#2563eb",
//         color: "white",
//         padding: "20px",
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >

//       <h1>Rentify</h1>

//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//         }}
//       >

//         <Link
//           to="/"
//           style={{ color: "white" }}
//         >
//           Home
//         </Link>

//         <Link
//           to="/login"
//           style={{ color: "white" }}
//         >
//           Login
//         </Link>

//         <Link
//           to="/register"
//           style={{ color: "white" }}
//         >
//           Register
//         </Link>

//       </div>

//     </div>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/properties", label: "Properties" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="relative inline-flex items-center justify-center rounded-3xl bg-white/10 p-3 shadow-lg border border-white/15 text-cyan-200">
              <svg viewBox="0 0 48 48" className="h-8 w-8 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 20L24 8l14 12" />
                <path d="M16 44V28h16v16" />
                <path d="M8 22v20h12" />
                <path d="M28 22v20h12" />
              </svg>
              <span className="absolute -top-2 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-400 text-[10px] font-bold text-white">★</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Beacon Baysides</h1>
              <p className="text-xs text-cyan-200 hidden sm:block">Luxury Coastal Properties</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.to}>
                <Link
                  to={item.to}
                  className="text-white hover:text-cyan-300 transition-colors duration-300 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-cyan-300 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/20 backdrop-blur-md rounded-lg mt-2 p-4 transition duration-300 opacity-100">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-cyan-300 transition-colors duration-300 font-medium block py-2"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

