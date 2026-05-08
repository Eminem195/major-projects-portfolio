import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FaBell,
    FaChartLine,
    FaCog,
    FaHome,
    FaLeaf,
    FaPlus,
    FaTimes
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const actions = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaLeaf />, label: "Add Farm", path: "/farms" },
    { icon: <FaChartLine />, label: "Reports", path: "/reports" },
    { icon: <FaBell />, label: "Alerts", path: "/alerts" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  const handleAction = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fab-container"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="fab-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {actions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    className="fab-action"
                    onClick={() => handleAction(action.path)}
                    initial={{ opacity: 0, x: -20, scale: 0 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="fab-action-icon">{action.icon}</span>
                    <span className="fab-action-label">{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className={`fab-main ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes /> : <FaPlus />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingActionButton;