import { motion } from "framer-motion";
import { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
import {
    FaArrowDown,
    FaArrowUp,
    FaCalendar,
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaClock,
    FaDownload,
    FaExclamationTriangle,
    FaFilter, FaLeaf,
    FaThermometerHalf,
    FaTint
} from "react-icons/fa";

// Register Chart.js components
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

// Generate mock data
const generateChartData = (labels, data, color) => ({
  labels,
  datasets: [{
    data,
    borderColor: color,
    backgroundColor: `${color}20`,
    fill: true,
    tension: 0.4,
    borderWidth: 2
  }]
});

const timeRanges = [
  { id: "day", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" }
];

const reports = [
  { id: 1, title: "Daily Performance Report", date: "2026-04-29", type: "Performance" },
  { id: 2, title: "Weekly Analytics", date: "2026-04-28", type: "Analytics" },
  { id: 3, title: "Monthly Summary", date: "2026-04-27", type: "Summary" },
  { id: 4, title: "System Health Check", date: "2026-04-26", type: "Health" },
  { id: 5, title: "Crop Growth Analysis", date: "2026-04-25", type: "Analysis" },
];

function Reports() {
  const [selectedRange, setSelectedRange] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for charts
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const moistureData = [72, 75, 68, 82, 78, 85, 80];
  const tempData = [24, 26, 25, 28, 27, 29, 26];
  const phData = [6.5, 6.8, 6.6, 7.0, 6.7, 6.9, 6.5];

  const overviewChartData = {
    labels,
    datasets: [
      {
        label: "Moisture %",
        data: moistureData,
        borderColor: "#4facfe",
        backgroundColor: "rgba(79, 172, 254, 0.1)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Temperature °C",
        data: tempData,
        borderColor: "#ff6a6a",
        backgroundColor: "rgba(255, 106, 106, 0.1)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  const barChartData = {
    labels: ["Farm 1", "Farm 2", "Farm 3", "Farm 4", "Farm 5", "Farm 6"],
    datasets: [{
      label: "Efficiency Score",
      data: [85, 72, 90, 65, 78, 88],
      backgroundColor: [
        "#4facfe",
        "#43e97b",
        "#ffa502",
        "#ff6a6a",
        "#a55eea",
        "#26de81"
      ],
      borderRadius: 8
    }]
  };

  const doughnutData = {
    labels: ["Optimal", "Warning", "Critical"],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ["#43e97b", "#ffa502", "#ff6a6a"],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "var(--text-secondary)", padding: 20 }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "var(--border-color)" } }
    }
  };

  // Statistics cards
  const stats = [
    { 
      title: "Avg Moisture", 
      value: "76%", 
      change: "+4%", 
      trend: "up",
      icon: <FaTint />,
      color: "#4facfe"
    },
    { 
      title: "Avg Temperature", 
      value: "26°C", 
      change: "+2°C", 
      trend: "up",
      icon: <FaThermometerHalf />,
      color: "#ff6a6a"
    },
    { 
      title: "Avg pH Level", 
      value: "6.7", 
      change: "-0.1", 
      trend: "down",
      icon: <FaLeaf />,
      color: "#43e97b"
    },
    { 
      title: "System Uptime", 
      value: "99.2%", 
      change: "+0.5%", 
      trend: "up",
      icon: <FaClock />,
      color: "#a55eea"
    }
  ];

  return (
    <div className="reports-page">
      {/* Page Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Analytics & Reports</h1>
          <p>View detailed analytics and generate reports for your farms</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn">
            <FaFilter /> Filter
          </button>
          <button className="primary-btn">
            <FaDownload /> Export Report
          </button>
        </div>
      </motion.div>

      {/* Time Range Selector */}
      <div className="time-range-selector">
        {timeRanges.map((range) => (
          <button
            key={range.id}
            className={`range-btn ${selectedRange === range.id ? "active" : ""}`}
            onClick={() => setSelectedRange(range.id)}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-header">
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                {stat.change}
              </div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-title">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="reports-tabs">
        <button 
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <FaChartLine /> Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === "efficiency" ? "active" : ""}`}
          onClick={() => setActiveTab("efficiency")}
        >
          <FaChartBar /> Efficiency
        </button>
        <button 
          className={`tab-btn ${activeTab === "health" ? "active" : ""}`}
          onClick={() => setActiveTab("health")}
        >
          <FaChartPie /> Health
        </button>
        <button 
          className={`tab-btn ${activeTab === "documents" ? "active" : ""}`}
          onClick={() => setActiveTab("documents")}
        >
          <FaCalendar /> Documents
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <motion.div 
            className="charts-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="chart-card large">
              <h3>Parameter Trends</h3>
              <div className="chart-container">
                <Line data={overviewChartData} options={chartOptions} />
              </div>
            </div>
            <div className="chart-card">
              <h3>Farm Health Distribution</h3>
              <div className="chart-container doughnut">
                <Doughnut data={doughnutData} options={{
                  ...chartOptions,
                  cutout: "70%"
                }} />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "efficiency" && (
          <motion.div 
            className="charts-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="chart-card large">
              <h3>Farm Efficiency Scores</h3>
              <div className="chart-container">
                <Bar data={barChartData} options={{
                  ...chartOptions,
                  plugins: { legend: { display: false } }
                }} />
              </div>
            </div>
            <div className="efficiency-insights">
              <h3>Key Insights</h3>
              <div className="insight-item">
                <div className="insight-icon success">
                  <FaArrowUp />
                </div>
                <div className="insight-content">
                  <h4>Top Performer</h4>
                  <p>Farm 3 leads with 90% efficiency score</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon warning">
                  <FaExclamationTriangle />
                </div>
                <div className="insight-content">
                  <h4>Needs Attention</h4>
                  <p>Farm 4 efficiency dropped by 15% this week</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon info">
                  <FaClock />
                </div>
                <div className="insight-content">
                  <h4>Average Score</h4>
                  <p>All farms: 79% (up 3% from last week)</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "health" && (
          <motion.div 
            className="health-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="health-summary">
              <div className="health-score">
                <div className="score-circle">
                  <span className="score-value">85</span>
                  <span className="score-label">/ 100</span>
                </div>
                <h3>System Health Score</h3>
                <p>Excellent condition</p>
              </div>
              <div className="health-metrics">
                <div className="health-metric">
                  <span className="metric-label">Active Sensors</span>
                  <span className="metric-value">24/24</span>
                </div>
                <div className="health-metric">
                  <span className="metric-label">Response Time</span>
                  <span className="metric-value">120ms</span>
                </div>
                <div className="health-metric">
                  <span className="metric-label">Data Accuracy</span>
                  <span className="metric-value">98.5%</span>
                </div>
                <div className="health-metric">
                  <span className="metric-label">Uptime</span>
                  <span className="metric-value">30 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "documents" && (
          <motion.div 
            className="documents-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="documents-list">
              {reports.map((report, index) => (
                <motion.div
                  key={report.id}
                  className="document-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="document-icon">
                    <FaChartLine />
                  </div>
                  <div className="document-info">
                    <h4>{report.title}</h4>
                    <p>{report.date} • {report.type}</p>
                  </div>
                  <button className="download-btn">
                    <FaDownload />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Reports;