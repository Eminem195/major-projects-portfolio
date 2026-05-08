import { motion } from "framer-motion";
import { useState } from "react";
import {
    FaBell,
    FaCog,
    FaDesktop,
    FaEnvelope,
    FaLock,
    FaMobileAlt,
    FaMoon,
    FaPalette,
    FaSave,
    FaSun,
    FaThermometerHalf, FaTint,
    FaToggleOff,
    FaToggleOn,
    FaUndo,
    FaUser,
    FaVolumeUp
} from "react-icons/fa";

function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // Profile
    name: "Admin User",
    email: "admin@hydroponic.com",
    phone: "+1 234 567 8900",
    timezone: "UTC+5:30",
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    alertThreshold: {
      moisture: { min: 30, max: 80 },
      temperature: { min: 15, max: 35 },
      ph: { min: 5.5, max: 7.5 }
    },
    
    // Appearance
    darkMode: false,
    compactMode: false,
    showAnimations: true,
    themeColor: "#4facfe",
    
    // System
    dataRefreshInterval: 2000,
    autoSave: true,
    language: "en",
    units: "metric"
  });

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setSaved(false);
  };

  const handleDirectChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleThresholdChange = (param, type, value) => {
    setSettings(prev => ({
      ...prev,
      alertThreshold: {
        ...prev.alertThreshold,
        [param]: {
          ...prev.alertThreshold[param],
          [type]: parseFloat(value)
        }
      }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { id: "profile", icon: <FaUser />, label: "Profile" },
    { id: "notifications", icon: <FaBell />, label: "Notifications" },
    { id: "appearance", icon: <FaPalette />, label: "Appearance" },
    { id: "system", icon: <FaCog />, label: "System" },
    { id: "security", icon: <FaLock />, label: "Security" }
  ];

  return (
    <div className="settings-page">
      {/* Page Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Settings</h1>
          <p>Manage your account and application preferences</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn" onClick={() => window.location.reload()}>
            <FaUndo /> Reset
          </button>
          <button className="primary-btn" onClick={handleSave}>
            <FaSave /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </motion.div>

      <div className="settings-container">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`settings-nav-btn ${activeSection === section.id ? "active" : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {activeSection === "profile" && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>Profile Settings</h2>
              <p className="section-description">Manage your personal information</p>

              <div className="settings-group">
                <div className="setting-item">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={settings.name}
                    onChange={(e) => handleDirectChange("name", e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={settings.email}
                    onChange={(e) => handleDirectChange("email", e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={settings.phone}
                    onChange={(e) => handleDirectChange("phone", e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Timezone</label>
                  <select 
                    value={settings.timezone}
                    onChange={(e) => handleDirectChange("timezone", e.target.value)}
                  >
                    <option value="UTC+5:30">India (IST) UTC+5:30</option>
                    <option value="UTC+0">London (GMT) UTC+0</option>
                    <option value="UTC-5">New York (EST) UTC-5</option>
                    <option value="UTC-8">Los Angeles (PST) UTC-8</option>
                    <option value="UTC+8">Beijing (CST) UTC+8</option>
                    <option value="UTC+9">Tokyo (JST) UTC+9</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>Notification Settings</h2>
              <p className="section-description">Configure how you receive alerts and notifications</p>

              <div className="settings-group">
                <h3>Notification Channels</h3>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <FaEnvelope />
                    <div>
                      <label>Email Notifications</label>
                      <p>Receive alerts via email</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${settings.emailNotifications ? "on" : "off"}`}
                    onClick={() => handleDirectChange("emailNotifications", !settings.emailNotifications)}
                  >
                    {settings.emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <FaMobileAlt />
                    <div>
                      <label>Push Notifications</label>
                      <p>Receive push notifications on your device</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${settings.pushNotifications ? "on" : "off"}`}
                    onClick={() => handleDirectChange("pushNotifications", !settings.pushNotifications)}
                  >
                    {settings.pushNotifications ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <FaBell />
                    <div>
                      <label>SMS Alerts</label>
                      <p>Receive critical alerts via SMS</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${settings.smsAlerts ? "on" : "off"}`}
                    onClick={() => handleDirectChange("smsAlerts", !settings.smsAlerts)}
                  >
                    {settings.smsAlerts ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <h3>Alert Thresholds</h3>
                <div className="threshold-grid">
                  <div className="threshold-item">
                    <label><FaTint /> Moisture (%)</label>
                    <div className="threshold-inputs">
                      <input 
                        type="number" 
                        value={settings.alertThreshold.moisture.min}
                        onChange={(e) => handleThresholdChange("moisture", "min", e.target.value)}
                        placeholder="Min"
                      />
                      <span>to</span>
                      <input 
                        type="number" 
                        value={settings.alertThreshold.moisture.max}
                        onChange={(e) => handleThresholdChange("moisture", "max", e.target.value)}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div className="threshold-item">
                    <label><FaThermometerHalf /> Temperature (°C)</label>
                    <div className="threshold-inputs">
                      <input 
                        type="number" 
                        value={settings.alertThreshold.temperature.min}
                        onChange={(e) => handleThresholdChange("temperature", "min", e.target.value)}
                        placeholder="Min"
                      />
                      <span>to</span>
                      <input 
                        type="number" 
                        value={settings.alertThreshold.temperature.max}
                        onChange={(e) => handleThresholdChange("temperature", "max", e.target.value)}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div className="threshold-item">
                    <label><FaCog /> pH Level</label>
                    <div className="threshold-inputs">
                      <input 
                        type="number" 
                        step="0.1"
                        value={settings.alertThreshold.ph.min}
                        onChange={(e) => handleThresholdChange("ph", "min", e.target.value)}
                        placeholder="Min"
                      />
                      <span>to</span>
                      <input 
                        type="number" 
                        step="0.1"
                        value={settings.alertThreshold.ph.max}
                        onChange={(e) => handleThresholdChange("ph", "max", e.target.value)}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "appearance" && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>Appearance Settings</h2>
              <p className="section-description">Customize the look and feel of the application</p>

              <div className="settings-group">
                <h3>Theme</h3>
                <div className="theme-selector">
                  <button 
                    className={`theme-option ${!settings.darkMode ? "active" : ""}`}
                    onClick={() => handleDirectChange("darkMode", false)}
                  >
                    <FaSun />
                    <span>Light Mode</span>
                  </button>
                  <button 
                    className={`theme-option ${settings.darkMode ? "active" : ""}`}
                    onClick={() => handleDirectChange("darkMode", true)}
                  >
                    <FaMoon />
                    <span>Dark Mode</span>
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <h3>Display Options</h3>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <FaDesktop />
                    <div>
                      <label>Compact Mode</label>
                      <p>Use smaller UI elements</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${settings.compactMode ? "on" : "off"}`}
                    onClick={() => handleDirectChange("compactMode", !settings.compactMode)}
                  >
                    {settings.compactMode ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <FaVolumeUp />
                    <div>
                      <label>Show Animations</label>
                      <p>Enable UI animations and transitions</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${settings.showAnimations ? "on" : "off"}`}
                    onClick={() => handleDirectChange("showAnimations", !settings.showAnimations)}
                  >
                    {settings.showAnimations ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <h3>Accent Color</h3>
                <div className="color-picker">
                  {["#4facfe", "#43e97b", "#ff6a6a", "#ffa502", "#a55eea", "#26de81"].map(color => (
                    <button
                      key={color}
                      className={`color-option ${settings.themeColor === color ? "active" : ""}`}
                      style={{ background: color }}
                      onClick={() => handleDirectChange("themeColor", color)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "system" && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>System Settings</h2>
              <p className="section-description">Configure system behavior and preferences</p>

              <div className="settings-group">
                <h3>Data & Language</h3>
                <div className="setting-item">
                  <label>Data Refresh Interval</label>
                  <select 
                    value={settings.dataRefreshInterval}
                    onChange={(e) => handleDirectChange("dataRefreshInterval", parseInt(e.target.value))}
                  >
                    <option value={1000}>1 second</option>
                    <option value={2000}>2 seconds</option>
                    <option value={5000}>5 seconds</option>
                    <option value={10000}>10 seconds</option>
                    <option value={30000}>30 seconds</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Language</label>
                  <select 
                    value={settings.language}
                    onChange={(e) => handleDirectChange("language", e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Measurement Units</label>
                  <select 
                    value={settings.units}
                    onChange={(e) => handleDirectChange("units", e.target.value)}
                  >
                    <option value="metric">Metric (°C, cm)</option>
                    <option value="imperial">Imperial (°F, inch)</option>
                  </select>
                </div>
              </div>

              <div className="settings-group">
                <h3>Data Management</h3>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <FaSave />
                    <div>
                      <label>Auto Save</label>
                      <p>Automatically save settings changes</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${settings.autoSave ? "on" : "off"}`}
                    onClick={() => handleDirectChange("autoSave", !settings.autoSave)}
                  >
                    {settings.autoSave ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "security" && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>Security Settings</h2>
              <p className="section-description">Manage your account security</p>

              <div className="settings-group">
                <h3>Change Password</h3>
                <div className="setting-item">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="setting-item">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="setting-item">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button className="primary-btn" style={{ marginTop: "15px" }}>
                  Update Password
                </button>
              </div>

              <div className="settings-group">
                <h3>Two-Factor Authentication</h3>
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <FaLock />
                    <div>
                      <label>Enable 2FA</label>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="secondary-btn">
                    Setup
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <h3>Active Sessions</h3>
                <div className="session-item">
                  <div className="session-info">
                    <h4>Current Session</h4>
                    <p>Chrome on Windows • Last active: Just now</p>
                  </div>
                  <span className="session-badge active">Active</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;