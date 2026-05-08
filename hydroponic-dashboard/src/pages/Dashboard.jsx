import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    FaBell,
    FaChartLine, FaCog,
    FaFlask,
    FaLeaf,
    FaMoon,
    FaPause,
    FaPlay,
    FaPowerOff,
    FaSun,
    FaThermometer,
    FaThermometerHalf,
    FaTint,
    FaWater
} from "react-icons/fa";

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Generate time labels
const generateTimeLabels = (count) => {
  const labels = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 2000);
    labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }
  return labels;
};

// Generate random data
const generateData = (min, max, count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
};

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  // Sensor data states
  const [moisture, setMoisture] = useState(450);
  const [temperature, setTemperature] = useState(24);
  const [ph, setPh] = useState(6.5);
  
  // Historical data
  const [dataPoints] = useState(12);
  const [moistureHistory, setMoistureHistory] = useState(() => generateData(300, 600, dataPoints));
  const [tempHistory, setTempHistory] = useState(() => generateData(18, 32, dataPoints));
  const [phHistory, setPhHistory] = useState(() => generateData(5, 8, dataPoints).map(v => v.toFixed(1)));
  const [labels, setLabels] = useState(() => generateTimeLabels(dataPoints));

  // Update data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newMoisture = Math.floor(Math.random() * 400) + 300;
      const newTemp = Math.floor(Math.random() * 15) + 18;
      const newPh = (Math.random() * 3 + 5).toFixed(1);
      
      setMoisture(newMoisture);
      setTemperature(newTemp);
      setPh(parseFloat(newPh));
      setLastUpdate(new Date());

      setMoistureHistory(prev => [...prev.slice(1), newMoisture]);
      setTempHistory(prev => [...prev.slice(1), newTemp]);
      setPhHistory(prev => [...prev.slice(1), parseFloat(newPh)]);
      setLabels(prev => [...prev.slice(1), new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Get status based on value
  const getStatus = (value, min, max, type) => {
    if (type === 'moisture') {
      if (value < 350) return { status: 'critical', label: 'Low' };
      if (value > 550) return { status: 'warning', label: 'High' };
      return { status: 'normal', label: 'Optimal' };
    }
    if (type === 'temperature') {
      if (value < 20) return { status: 'critical', label: 'Cold' };
      if (value > 30) return { status: 'warning', label: 'Hot' };
      return { status: 'normal', label: 'Optimal' };
    }
    if (type === 'ph') {
      if (value < 5.5) return { status: 'critical', label: 'Acidic' };
      if (value > 7.5) return { status: 'warning', label: 'Alkaline' };
      return { status: 'normal', label: 'Optimal' };
    }
    return { status: 'normal', label: 'OK' };
  };

  const moistureStatus = getStatus(moisture, 0, 0, 'moisture');
  const tempStatus = getStatus(temperature, 0, 0, 'temperature');
  const phStatus = getStatus(ph, 0, 0, 'ph');

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#2c2c3e' : '#ffffff',
        titleColor: darkMode ? '#e8e8e8' : '#2c3e50',
        bodyColor: darkMode ? '#b0b0b0' : '#7f8c8d',
        borderColor: darkMode ? '#3a3a4a' : '#e0e0e0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: darkMode ? '#b0b0b0' : '#7f8c8d' }
      },
      y: {
        grid: { color: darkMode ? '#3a3a4a' : '#e0e0e0' },
        ticks: { color: darkMode ? '#b0b0b0' : '#7f8c8d' }
      }
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 6 }
    }
  };

  const moistureChartData = {
    labels,
    datasets: [{
      label: 'Moisture',
      data: moistureHistory,
      borderColor: '#4facfe',
      backgroundColor: 'rgba(79, 172, 254, 0.1)',
      fill: true,
      borderWidth: 2
    }]
  };

  const tempChartData = {
    labels,
    datasets: [{
      label: 'Temperature',
      data: tempHistory,
      borderColor: '#ff6a6a',
      backgroundColor: 'rgba(255, 106, 106, 0.1)',
      fill: true,
      borderWidth: 2
    }]
  };

  const phChartData = {
    labels,
    datasets: [{
      label: 'pH Level',
      data: phHistory,
      borderColor: '#43e97b',
      backgroundColor: 'rgba(67, 233, 123, 0.1)',
      fill: true,
      borderWidth: 2
    }]
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="dashboard-title">
          <div className="logo">
            <FaLeaf />
          </div>
          <div>
            <h1>Smart Hydroponic Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Real-time plant monitoring system
            </p>
          </div>
        </div>

        <div className="header-controls">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>System Active</span>
          </div>
          
          <motion.button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.button>
        </div>
      </motion.div>

      {/* Parameter Cards */}
      <div className="cards-grid">
        <ParameterCard 
          icon={<FaWater />}
          title="Moisture"
          value={moisture}
          unit="%"
          color="#4facfe"
          status={moistureStatus}
          min={0}
          max={100}
          minRange={300}
          maxRange={600}
        />
        
        <ParameterCard 
          icon={<FaThermometer />}
          title="Temperature"
          value={temperature}
          unit="°C"
          color="#ff6a6a"
          status={tempStatus}
          min={0}
          max={50}
          minRange={18}
          maxRange={32}
        />
        
        <ParameterCard 
          icon={<FaFlask />}
          title="pH Level"
          value={ph}
          unit=""
          color="#43e97b"
          status={phStatus}
          min={0}
          max={14}
          minRange={5.5}
          maxRange={7.5}
        />
        
        <PumpControl pumpOn={pumpOn} setPumpOn={setPumpOn} />
      </div>

      {/* Quick Actions */}
      <motion.div 
        className="quick-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button className="action-btn">
          <FaChartLine /> View Reports
        </button>
        <button className="action-btn">
          <FaCog /> Settings
        </button>
        <button className="action-btn">
          <FaBell /> Alerts
        </button>
      </motion.div>

      {/* Charts Section */}
      <div className="charts-section">
        <ChartCard 
          title="Moisture Trend" 
          icon={<FaTint />}
          data={moistureChartData}
          color="#4facfe"
        />
        <ChartCard 
          title="Temperature Trend" 
          icon={<FaThermometerHalf />}
          data={tempChartData}
          color="#ff6a6a"
        />
        <ChartCard 
          title="pH Level Trend" 
          icon={<FaLeaf />}
          data={phChartData}
          color="#43e97b"
        />
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <p>Last updated: {lastUpdate.toLocaleTimeString()} | Hydroponic Monitoring System v1.0</p>
      </div>
    </div>
  );
}

/* Parameter Card Component */
function ParameterCard({ icon, title, value, unit, color, status, min, max, minRange, maxRange }) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <motion.div 
      className="parameter-card"
      style={{ '--card-color': color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        <div className="card-icon">
          {icon}
        </div>
        <span className={`card-status ${status.status}`}>
          {status.label}
        </span>
      </div>
      
      <div className="card-title">{title}</div>
      <div className="card-value">
        {value}
        <span className="card-unit">{unit}</span>
      </div>
      
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="card-range">
        <span>Min: {minRange}</span>
        <span>Max: {maxRange}</span>
      </div>
    </motion.div>
  );
}

/* Pump Control Component */
function PumpControl({ pumpOn, setPumpOn }) {
  return (
    <motion.div 
      className="pump-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="card-header">
        <div className="card-icon" style={{ '--card-color': '#ffa502' }}>
          <FaPowerOff />
        </div>
        <span className={`card-status ${pumpOn ? 'warning' : 'normal'}`}>
          {pumpOn ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="card-title">Water Pump</div>
      
      <div className="pump-status">
        <div className={`pump-icon ${pumpOn ? 'on' : 'off'}`}>
          {pumpOn ? <FaWater /> : <FaPowerOff />}
        </div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '18px' }}>
            {pumpOn ? 'Running' : 'Stopped'}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {pumpOn ? 'Water circulating' : 'Pump idle'}
          </div>
        </div>
      </div>
      
      <motion.button 
        className={`pump-toggle ${pumpOn ? 'on' : 'off'}`}
        onClick={() => setPumpOn(!pumpOn)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {pumpOn ? (
          <><FaPause /> Turn OFF Pump</>
        ) : (
          <><FaPlay /> Turn ON Pump</>
        )}
      </motion.button>
    </motion.div>
  );
}

/* Chart Card Component */
function ChartCard({ title, icon, data, color }) {
  return (
    <motion.div 
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="chart-header">
        <h3 className="chart-title">
          {icon} {title}
        </h3>
      </div>
      <div style={{ height: '200px' }}>
        <Line data={data} options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: 'rgba(0,0,0,0.05)' } }
          },
          elements: {
            line: { tension: 0.4, borderColor: color, borderWidth: 2 },
            point: { radius: 3, backgroundColor: color }
          }
        }} />
      </div>
    </motion.div>
  );
}

export default Dashboard;