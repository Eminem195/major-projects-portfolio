import {
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
import { motion } from "framer-motion";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    FaChartLine,
    FaCompress,
    FaFlask,
    FaThermometerHalf,
    FaTint
} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Mock comparison data
const comparisonData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  moisture: {
    "Green Valley Farm": [75, 78, 72, 80, 76, 82, 79],
    "Sunrise Hydroponics": [80, 82, 85, 78, 84, 81, 83],
    "Aqua Grow Center": [65, 68, 62, 70, 58, 72, 55],
    "Urban Greens": [70, 72, 75, 71, 73, 78, 74],
  },
  temperature: {
    "Green Valley Farm": [24, 25, 23, 26, 24, 27, 25],
    "Sunrise Hydroponics": [26, 27, 28, 25, 29, 26, 27],
    "Aqua Grow Center": [30, 31, 29, 32, 28, 33, 30],
    "Urban Greens": [22, 23, 24, 22, 25, 23, 24],
  },
  ph: {
    "Green Valley Farm": [6.5, 6.6, 6.4, 6.7, 6.5, 6.8, 6.6],
    "Sunrise Hydroponics": [6.8, 6.9, 7.0, 6.7, 6.9, 6.8, 7.1],
    "Aqua Grow Center": [5.5, 5.8, 5.2, 5.9, 5.1, 5.6, 5.3],
    "Urban Greens": [6.9, 7.0, 6.8, 7.1, 6.9, 7.2, 7.0],
  }
};

const farmOptions = [
  { id: 1, name: "Green Valley Farm", color: "#4facfe" },
  { id: 2, name: "Sunrise Hydroponics", color: "#43e97b" },
  { id: 3, name: "Aqua Grow Center", color: "#ffa502" },
  { id: 4, name: "Urban Greens", color: "#ff6a6a" },
];

function FarmComparison() {
  const [selectedFarms, setSelectedFarms] = useState([farmOptions[0], farmOptions[1]]);
  const [metric, setMetric] = useState("moisture");

  const toggleFarm = (farm) => {
    if (selectedFarms.find(f => f.id === farm.id)) {
      if (selectedFarms.length > 1) {
        setSelectedFarms(selectedFarms.filter(f => f.id !== farm.id));
      }
    } else {
      if (selectedFarms.length < 4) {
        setSelectedFarms([...selectedFarms, farm]);
      }
    }
  };

  const getChartData = () => {
    const datasets = selectedFarms.map(farm => ({
      label: farm.name,
      data: comparisonData[metric][farm.name],
      borderColor: farm.color,
      backgroundColor: `${farm.color}20`,
      fill: true,
      tension: 0.4,
      borderWidth: 2
    }));

    return { labels: comparisonData.labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { padding: 20, usePointStyle: true }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(0,0,0,0.05)" } }
    }
  };

  // Calculate averages
  const getAverages = () => {
    return selectedFarms.map(farm => {
      const data = comparisonData[metric][farm.name];
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      return { name: farm.name, avg: metric === "ph" ? avg.toFixed(1) : Math.round(avg), color: farm.color };
    });
  };

  return (
    <div className="comparison-page">
      <motion.div 
        className="comparison-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-left">
          <FaCompress />
          <div>
            <h2>Farm Comparison</h2>
            <p>Compare performance across multiple farms</p>
          </div>
        </div>
        <div className="metric-selector">
          <button 
            className={metric === "moisture" ? "active" : ""}
            onClick={() => setMetric("moisture")}
          >
            <FaTint /> Moisture
          </button>
          <button 
            className={metric === "temperature" ? "active" : ""}
            onClick={() => setMetric("temperature")}
          >
            <FaThermometerHalf /> Temperature
          </button>
          <button 
            className={metric === "ph" ? "active" : ""}
            onClick={() => setMetric("ph")}
          >
            <FaFlask /> pH Level
          </button>
        </div>
      </motion.div>

      {/* Farm Selection */}
      <div className="farm-selector">
        <h3>Select Farms to Compare</h3>
        <div className="farm-checkboxes">
          {farmOptions.map(farm => (
            <label 
              key={farm.id} 
              className={`farm-checkbox ${selectedFarms.find(f => f.id === farm.id) ? "selected" : ""}`}
              style={{ "--farm-color": farm.color }}
            >
              <input 
                type="checkbox" 
                checked={!!selectedFarms.find(f => f.id === farm.id)}
                onChange={() => toggleFarm(farm)}
              />
              <span className="checkbox-indicator"></span>
              <span className="farm-name">{farm.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="comparison-chart-card">
        <h3>
          <FaChartLine /> {metric.charAt(0).toUpperCase() + metric.slice(1)} Comparison
        </h3>
        <div className="chart-wrapper">
          <Line data={getChartData()} options={chartOptions} />
        </div>
      </div>

      {/* Averages Summary */}
      <div className="averages-section">
        <h3>Average Values</h3>
        <div className="averages-grid">
          {getAverages().map((item, index) => (
            <motion.div 
              key={item.name}
              className="average-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ borderLeftColor: item.color }}
            >
              <div className="average-farm" style={{ color: item.color }}>{item.name}</div>
              <div className="average-value">
                {item.avg}
                <span>{metric === "ph" ? "" : metric === "moisture" ? "%" : "°C"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FarmComparison;