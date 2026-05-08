import { motion } from "framer-motion";
import { useState } from "react";
import {
    FaChartLine,
    FaChevronRight,
    FaFilter,
    FaFlask,
    FaLeaf,
    FaLocationArrow,
    FaMapMarkerAlt,
    FaPlus,
    FaSearch,
    FaThermometerHalf,
    FaTint,
    FaWater
} from "react-icons/fa";

// Mock data for nearby farms
const nearbyFarms = [
  { id: 1, name: "Green Valley Farm", distance: "2.3 km", status: "active", moisture: 78, temp: 24, ph: 6.5, location: "North Zone" },
  { id: 2, name: "Sunrise Hydroponics", distance: "3.1 km", status: "active", moisture: 82, temp: 26, ph: 6.8, location: "East Zone" },
  { id: 3, name: "Aqua Grow Center", distance: "4.5 km", status: "warning", moisture: 45, temp: 31, ph: 5.2, location: "South Zone" },
  { id: 4, name: "Urban Greens", distance: "5.2 km", status: "active", moisture: 71, temp: 23, ph: 6.9, location: "West Zone" },
  { id: 5, name: "EcoFarm Hub", distance: "6.8 km", status: "critical", moisture: 32, temp: 28, ph: 7.8, location: "Central Zone" },
  { id: 6, name: "Fresh Leaf Garden", distance: "7.1 km", status: "active", moisture: 85, temp: 25, ph: 6.4, location: "North Zone" },
];

const myFarms = [
  { id: 101, name: "Main Greenhouse", plants: 250, status: "healthy", lastUpdate: "2 min ago" },
  { id: 102, name: "Nursery Section A", plants: 120, status: "healthy", lastUpdate: "5 min ago" },
  { id: 103, name: "Vertical Farm Unit", plants: 180, status: "needs-attention", lastUpdate: "1 min ago" },
];

function Farms() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("nearby"); // 'nearby' or 'my'

  const filteredFarms = nearbyFarms.filter(farm => 
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "active": return "#43e97b";
      case "warning": return "#f39c12";
      case "critical": return "#ff6a6a";
      default: return "#95a5a6";
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case "active": return "Optimal";
      case "warning": return "Warning";
      case "critical": return "Critical";
      default: return "Unknown";
    }
  };

  return (
    <div className="farms-page">
      {/* Page Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Farm Management</h1>
          <p>Monitor and manage your hydroponic farms</p>
        </div>
        <button className="primary-btn">
          <FaPlus /> Add New Farm
        </button>
      </motion.div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewMode === "nearby" ? "active" : ""}`}
          onClick={() => { setViewMode("nearby"); setSelectedFarm(null); }}
        >
          <FaMapMarkerAlt /> Nearby Farms
        </button>
        <button 
          className={`toggle-btn ${viewMode === "my" ? "active" : ""}`}
          onClick={() => { setViewMode("my"); setSelectedFarm(null); }}
        >
          <FaLeaf /> My Farms
        </button>
      </div>

      <div className="farms-container">
        {/* Farm List */}
        <motion.div 
          className="farm-list-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Search & Filter */}
          <div className="list-controls">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search farms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <FaFilter /> Filter
            </button>
          </div>

          {viewMode === "nearby" ? (
            <div className="farm-list">
              {filteredFarms.map((farm, index) => (
                <motion.div
                  key={farm.id}
                  className={`farm-card ${selectedFarm?.id === farm.id ? 'selected' : ''}`}
                  onClick={() => setSelectedFarm(farm)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="farm-card-header">
                    <div className="farm-icon">
                      <FaLeaf />
                    </div>
                    <div className="farm-info">
                      <h3>{farm.name}</h3>
                      <span className="farm-location">
                        <FaLocationArrow /> {farm.location} • {farm.distance}
                      </span>
                    </div>
                    <div 
                      className="status-badge"
                      style={{ background: `${getStatusColor(farm.status)}20`, color: getStatusColor(farm.status) }}
                    >
                      {getStatusLabel(farm.status)}
                    </div>
                  </div>
                  <div className="farm-quick-stats">
                    <div className="stat">
                      <FaTint /> {farm.moisture}%
                    </div>
                    <div className="stat">
                      <FaThermometerHalf /> {farm.temp}°C
                    </div>
                    <div className="stat">
                      <FaFlask /> pH {farm.ph}
                    </div>
                  </div>
                  <div className="farm-action">
                    <span>View Details</span>
                    <FaChevronRight />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="farm-list">
              {myFarms.map((farm, index) => (
                <motion.div
                  key={farm.id}
                  className={`farm-card ${selectedFarm?.id === farm.id ? 'selected' : ''}`}
                  onClick={() => setSelectedFarm(farm)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="farm-card-header">
                    <div className="farm-icon my-farm">
                      <FaLeaf />
                    </div>
                    <div className="farm-info">
                      <h3>{farm.name}</h3>
                      <span className="farm-location">
                        {farm.plants} Plants • Updated {farm.lastUpdate}
                      </span>
                    </div>
                    <div 
                      className="status-badge"
                      style={{ 
                        background: farm.status === "healthy" ? "#43e97b20" : "#f39c1220",
                        color: farm.status === "healthy" ? "#43e97b" : "#f39c12"
                      }}
                    >
                      {farm.status === "healthy" ? "Healthy" : "Needs Attention"}
                    </div>
                  </div>
                  <div className="farm-quick-stats">
                    <div className="stat">
                      <FaWater /> Active
                    </div>
                    <div className="stat">
                      <FaChartLine /> Monitoring
                    </div>
                  </div>
                  <div className="farm-action">
                    <span>Manage Farm</span>
                    <FaChevronRight />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Farm Details Panel */}
        <motion.div 
          className="farm-details-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {selectedFarm ? (
            <div className="farm-details">
              <div className="details-header">
                <div className="farm-logo">
                  <FaLeaf />
                </div>
                <div>
                  <h2>{selectedFarm.name}</h2>
                  <p>{selectedFarm.location} • {selectedFarm.distance}</p>
                </div>
              </div>

              {/* Real-time Stats */}
              <div className="details-stats">
                <div className="detail-stat-card">
                  <div className="stat-icon moisture">
                    <FaTint />
                  </div>
                  <div className="stat-content">
                    <span className="stat-label">Moisture</span>
                    <span className="stat-value">{selectedFarm.moisture}%</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ width: `${selectedFarm.moisture}%`, background: "#4facfe" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="detail-stat-card">
                  <div className="stat-icon temperature">
                    <FaThermometerHalf />
                  </div>
                  <div className="stat-content">
                    <span className="stat-label">Temperature</span>
                    <span className="stat-value">{selectedFarm.temp}°C</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ width: `${(selectedFarm.temp / 50) * 100}%`, background: "#ff6a6a" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="detail-stat-card">
                  <div className="stat-icon ph">
                    <FaFlask />
                  </div>
                  <div className="stat-content">
                    <span className="stat-label">pH Level</span>
                    <span className="stat-value">{selectedFarm.ph}</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ width: `${(selectedFarm.ph / 14) * 100}%`, background: "#43e97b" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="details-recommendations">
                <h3>Recommendations</h3>
                <div className="recommendation-list">
                  {selectedFarm.status === "active" ? (
                    <div className="recommendation success">
                      <span>✓ All parameters are optimal. Continue current monitoring schedule.</span>
                    </div>
                  ) : selectedFarm.status === "warning" ? (
                    <>
                      <div className="recommendation warning">
                        <span>⚠ Moisture levels are below optimal. Consider increasing water supply.</span>
                      </div>
                      <div className="recommendation warning">
                        <span>⚠ Temperature is elevated. Check ventilation systems.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="recommendation danger">
                        <span>✗ Critical moisture levels detected! Immediate water supply required.</span>
                      </div>
                      <div className="recommendation danger">
                        <span>✗ pH levels out of safe range. Adjust nutrient solution immediately.</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="details-actions">
                <button className="action-button primary">
                  <FaChartLine /> View Full Report
                </button>
                <button className="action-button secondary">
                  <FaWater /> Control Pump
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <FaLeaf className="no-selection-icon" />
              <h3>Select a Farm</h3>
              <p>Click on a farm from the list to view its detailed information and analytics</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Farms;