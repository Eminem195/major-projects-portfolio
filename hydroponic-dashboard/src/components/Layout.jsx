import { motion } from "framer-motion";
import { useState } from "react";
import {
    FaBars,
    FaBell,
    FaChartLine, FaCog,
    FaCompress,
    FaHome,
    FaLeaf,
    FaSignOutAlt,
    FaTimes
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    { path: "/farms", icon: <FaLeaf />, label: "My Farms" },
    { path: "/comparison", icon: <FaCompress />, label: "Compare" },
    { path: "/reports", icon: <FaChartLine />, label: "Reports" },
    { path: "/settings", icon: <FaCog />, label: "Settings" },
    { path: "/alerts", icon: <FaBell />, label: "Alerts" },
  ];

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <motion.aside 
        className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 80 }}
      >
        <div className="sidebar-header">
          {sidebarOpen && (
            <motion.div 
              className="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="logo-icon">
                <FaLeaf />
              </div>
              <span>Hydroponic</span>
            </motion.div>
          )}
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && (
                <motion.span 
                  className="nav-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;