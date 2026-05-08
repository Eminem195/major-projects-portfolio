import Chart from "chart.js/auto";
import { useEffect, useMemo, useRef } from "react";
import propertiesData from "../data/properties";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyRevenue = [42000, 47000, 52000, 50000, 58000, 61000, 67000, 70000, 74000, 77000, 81000, 86000];

const locationBookings = [
  { location: "Goa", count: 48 },
  { location: "Mumbai", count: 42 },
  { location: "Delhi", count: 33 },
  { location: "Jaipur", count: 27 },
  { location: "Udaipur", count: 22 },
  { location: "Shimla", count: 18 },
];
const Analytics = () => {
  const revenueChartRef = useRef(null);
  const typeChartRef = useRef(null);

  const propertyTypeStats = useMemo(() => {
    const counts = propertiesData.reduce((acc, property) => {
      const type = property.type || "Other";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  }, []);

  const topType = useMemo(() => {
    return propertyTypeStats.reduce(
      (best, current) => (current.count > best.count ? current : best),
      propertyTypeStats[0] || { type: "N/A", count: 0 }
    );
  }, [propertyTypeStats]);

  const topCity = useMemo(() => {
    return locationBookings.reduce((best, next) => (next.count > best.count ? next : best), locationBookings[0]).location;
  }, []);

  const totalRevenue = monthlyRevenue.reduce((sum, value) => sum + value, 0);
  const maxLocationCount = Math.max(...locationBookings.map((item) => item.count));

  useEffect(() => {
    let revenueChart;
    let typeChart;

    if (revenueChartRef.current) {
      const revenueCtx = revenueChartRef.current.getContext("2d");
      revenueChart = new Chart(revenueCtx, {
        type: "line",
        data: {
          labels: monthLabels,
          datasets: [
            {
              label: "Revenue",
              data: monthlyRevenue,
              borderColor: "#0EA5E9",
              backgroundColor: "rgba(14,165,233,0.16)",
              fill: true,
              tension: 0.35,
              pointRadius: 4,
              pointBackgroundColor: "#0EA5E9",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `₹${context.parsed.y.toLocaleString()}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#475569" },
            },
            y: {
              grid: { color: "rgba(15,23,42,0.08)" },
              ticks: {
                color: "#475569",
                callback: (value) => `₹${value / 1000}k`,
              },
            },
          },
        },
      });
    }

    if (typeChartRef.current) {
      const typeCtx = typeChartRef.current.getContext("2d");
      typeChart = new Chart(typeCtx, {
        type: "doughnut",
        data: {
          labels: propertyTypeStats.map((item) => item.type),
          datasets: [
            {
              data: propertyTypeStats.map((item) => item.count),
              backgroundColor: ["#2563EB", "#14B8A6", "#F97316", "#A855F7", "#22C55E", "#E11D48"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: "#475569", boxWidth: 12, padding: 18 },
            },
          },
        },
      });
    }

    return () => {
      revenueChart?.destroy();
      typeChart?.destroy();
    };
  }, [propertyTypeStats]);

  const handleDownload = () => {
    const reportData = `Analytics Report\n\nTotal Users: 1240\nBookings: 560\nRevenue: ₹2.5L\n\nPerformance:\nBookings: 80%\nRevenue: 65%\nUser Growth: 90%\n`;
    const blob = new Blob([reportData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "analytics-report.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="mt-2 text-slate-500">Revenue trends, booking heatmaps, and property performance at a glance.</p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
          onClick={handleDownload}
        >
          Download report
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3 mb-8">
        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Total revenue</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">₹{totalRevenue.toLocaleString()}</p>
          <p className="mt-3 text-slate-500">Revenue generated across the last 12 months.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Active listings</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{propertiesData.length}</p>
          <p className="mt-3 text-slate-500">Live property inventory currently available for booking.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Top city</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{topCity}</p>
          <p className="mt-3 text-slate-500">Most booked destination over the current season.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr] mb-8">
        <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Revenue trend</p>
              <h2 className="text-2xl font-semibold text-slate-900">Monthly revenue</h2>
            </div>
            <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">Revenue +14% Y/Y</span>
          </div>
          <div className="min-h-80">
            <canvas ref={revenueChartRef}></canvas>
          </div>
        </section>

        <aside className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Booking heatmap</p>
              <h2 className="text-2xl font-semibold text-slate-900">Locations</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Top: {topCity}</span>
          </div>

          <div className="space-y-4">
            {locationBookings.map((item) => (
              <div key={item.location} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.location}</p>
                    <p className="text-sm text-slate-500">Bookings: {item.count}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{Math.round((item.count / maxLocationCount) * 100)}%</p>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-cyan-500 to-slate-800"
                    style={{ width: `${(item.count / maxLocationCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Most booked types</p>
              <h2 className="text-2xl font-semibold text-slate-900">Property type breakdown</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Top: {topType.type}</span>
          </div>
          <div className="min-h-80">
            <canvas ref={typeChartRef}></canvas>
          </div>
        </section>

        <aside className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Key insights</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Listing performance</h2>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <span className="block text-sm text-slate-400">Highest performing type</span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">{topType.type}</span>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <span className="block text-sm text-slate-400">Most booked city</span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">{topCity}</span>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <span className="block text-sm text-slate-400">Average stay time</span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">4.3 nights</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Analytics;
