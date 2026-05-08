import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLeaf, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Trim whitespace from inputs
    const trimmedUser = user.trim();
    const trimmedPass = pass.trim();

    // Simulate loading
    setTimeout(() => {
      if (trimmedUser === "admin" && trimmedPass === "1234") {
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>
      
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="login-header">
          <motion.div 
            className="logo-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <FaLeaf />
          </motion.div>
          <h1>Hydroponic</h1>
          <p>Smart Plant Monitoring System</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className={user ? "filled" : ""}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className={pass ? "filled" : ""}
              required
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button 
            type="submit" 
            className="login-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <div className="login-footer">
          <p>Default: admin / 1234</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;