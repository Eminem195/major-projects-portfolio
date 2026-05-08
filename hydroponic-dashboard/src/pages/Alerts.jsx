import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
    FaBell,
    FaCheck,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle, FaInfoCircle,
    FaMapMarkerAlt,
    FaSearch,
    FaTimes,
    FaTrash
} from "react-icons/fa";

// Mock alerts data
const initialAlerts = [
  { 
    id: 1, 
    type: "critical", 
    title: "Critical Moisture Level", 
    message: "Green Valley Farm moisture dropped below 30%. Immediate action required.",
    farm: "Green Valley Farm",
    time: "2 min ago",
    read: false,
    timestamp: new Date()
  },
  { 
    id: 2, 
    type: "warning", 
    title: "High Temperature Alert", 
    message: "Sunrise Hydroponics temperature exceeded 30°C. Check ventilation.",
    farm: "Sunrise Hydroponics",
    time: "15 min ago",
    read: false,
    timestamp: new Date(Date.now() - 15*60000)
  },
  { 
    id: 3, 
    type: "info", 
    title: "System Update Available", 
    message: "A new firmware update is available for your sensors. Update recommended.",
    farm: "System",
    time: "1 hour ago",
    read: true,
    timestamp: new Date(Date.now() - 60*60000)
  },
  { 
    id: 4, 
    type: "success", 
    title: "pH Level Normalized", 
    message: "Aqua Grow Center pH levels have returned to optimal range.",
    farm: "Aqua Grow Center",
    time: "2 hours ago",
    read: true,
    timestamp: new Date(Date.now() - 120*60000)
  },
  { 
    id: 5, 
    type: "warning", 
    title: "Low Water Level", 
    message: "Urban Greens water reservoir is running low. Refill required soon.",
    farm: "Urban Greens",
    time: "3 hours ago",
    read: true,
    timestamp: new Date(Date.now() - 180*60000)
  },
  { 
    id: 6, 
    type: "critical", 
    title: "Sensor Malfunction", 
    message: "Temperature sensor at EcoFarm Hub is not responding. Check connection.",
    farm: "EcoFarm Hub",
    time: "4 hours ago",
    read: true,
    timestamp: new Date(Date.now() - 240*60000)
  },
];

function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const getAlertIcon = (type) => {
    switch(type) {
      case "critical": return <FaExclamationTriangle />;
      case "warning": return <FaExclamationTriangle />;
      case "info": return <FaInfoCircle />;
      case "success": return <FaCheckCircle />;
      default: return <FaBell />;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case "critical": return "#ff6a6a";
      case "warning": return "#ffa502";
      case "info": return "#4facfe";
      case "success": return "#43e97b";
      default: return "#95a5a6";
    }
  };

  const markAsRead = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);
  };

  const clearAll = () => {
    setAlerts([]);
    setSelectedAlert(null);
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === "all" || alert.type === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.farm.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="alerts-page">
      {/* Page Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Alerts & Notifications</h1>
          <p>Monitor system alerts and notifications from your farms</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn" onClick={markAllAsRead}>
            <FaCheck /> Mark All Read
          </button>
          <button className="danger-btn" onClick={clearAll}>
            <FaTrash /> Clear All
          </button>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <div className="alerts-stats">
        <div className="stat-item">
          <span className="stat-count critical">{alerts.filter(a => a.type === "critical").length}</span>
          <span className="stat-label">Critical</span>
        </div>
        <div className="stat-item">
          <span className="stat-count warning">{alerts.filter(a => a.type === "warning").length}</span>
          <span className="stat-label">Warnings</span>
        </div>
        <div className="stat-item">
          <span className="stat-count info">{alerts.filter(a => a.type === "info").length}</span>
          <span className="stat-label">Info</span>
        </div>
        <div className="stat-item">
          <span className="stat-count success">{alerts.filter(a => a.type === "success").length}</span>
          <span className="stat-label">Success</span>
        </div>
        <div className="stat-item unread">
          <span className="stat-count">{unreadCount}</span>
          <span className="stat-label">Unread</span>
        </div>
      </div>

      <div className="alerts-container">
        {/* Alerts List */}
        <div className="alerts-list-section">
          {/* Filters */}
          <div className="alerts-filters">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              {["all", "critical", "warning", "info", "success"].map(type => (
                <button
                  key={type}
                  className={`filter-btn ${filter === type ? "active" : ""}`}
                  onClick={() => setFilter(type)}
                  style={filter === type ? { color: getAlertColor(type) } : {}}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Alerts List */}
          <div className="alerts-list">
            <AnimatePresence>
              {filteredAlerts.length === 0 ? (
                <div className="no-alerts">
                  <FaBell />
                  <h3>No Alerts</h3>
                  <p>You're all caught up! No alerts to display.</p>
                </div>
              ) : (
                filteredAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    className={`alert-card ${!alert.read ? "unread" : ""} ${selectedAlert?.id === alert.id ? "selected" : ""}`}
                    onClick={() => { setSelectedAlert(alert); markAsRead(alert.id); }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ borderLeftColor: getAlertColor(alert.type) }}
                  >
                    <div className="alert-icon" style={{ background: `${getAlertColor(alert.type)}20`, color: getAlertColor(alert.type) }}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="alert-content">
                      <div className="alert-header">
                        <h4>{alert.title}</h4>
                        <span className="alert-time">
                          <FaClock /> {alert.time}
                        </span>
                      </div>
                      <p className="alert-farm">
                        <FaMapMarkerAlt /> {alert.farm}
                      </p>
                    </div>
                    <div className="alert-actions">
                      <button 
                        className="alert-action-btn"
                        onClick={(e) => { e.stopPropagation(); deleteAlert(alert.id); }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Alert Details Panel */}
        <div className="alert-details-section">
          {selectedAlert ? (
            <motion.div 
              className="alert-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="details-header" style={{ borderBottomColor: getAlertColor(selectedAlert.type) }}>
                <div className="alert-type-badge" style={{ background: `${getAlertColor(selectedAlert.type)}20`, color: getAlertColor(selectedAlert.type) }}>
                  {getAlertIcon(selectedAlert.type)}
                  <span>{selectedAlert.type.toUpperCase()}</span>
                </div>
                <h2>{selectedAlert.title}</h2>
              </div>

              <div className="details-body">
                <div className="detail-row">
                  <FaMapMarkerAlt />
                  <div>
                    <label>Farm</label>
                    <p>{selectedAlert.farm}</p>
                  </div>
                </div>
                <div className="detail-row">
                  <FaClock />
                  <div>
                    <label>Time</label>
                    <p>{selectedAlert.time}</p>
                  </div>
                </div>
                <div className="detail-row">
                  <FaBell />
                  <div>
                    <label>Status</label>
                    <p>{selectedAlert.read ? "Read" : "Unread"}</p>
                  </div>
                </div>
              </div>

              <div className="details-message">
                <h3>Message</h3>
                <p>{selectedAlert.message}</p>
              </div>

              <div className="details-actions">
                <button className="action-btn primary">
                  View Farm Details
                </button>
                <button className="action-btn secondary">
                  Take Action
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="no-selection">
              <FaBell className="no-selection-icon" />
              <h3>Select an Alert</h3>
              <p>Click on an alert from the list to view its full details and take action</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;