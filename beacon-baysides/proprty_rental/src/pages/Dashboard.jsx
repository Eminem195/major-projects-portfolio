// import Sidebar from "../components/Sidebar";

// const Dashboard = () => {
//   return (
//     <div className="flex min-h-screen bg-[#0f172a]">
      
//       <Sidebar />

//       <div className="flex-1 p-8">
//         <h1 className="text-5xl font-bold text-white mb-10">
//           Admin Dashboard
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           <div className="bg-cyan-400 p-6 rounded-2xl shadow-lg text-white">
//             <h2 className="text-xl font-semibold">
//               Total Properties
//             </h2>

//             <p className="text-5xl font-bold mt-4">
//               120
//             </p>
//           </div>

//           <div className="bg-purple-400 p-6 rounded-2xl shadow-lg text-white">
//             <h2 className="text-xl font-semibold">
//               Total Users
//             </h2>

//             <p className="text-5xl font-bold mt-4">
//               450
//             </p>
//           </div>

//           <div className="bg-green-400 p-6 rounded-2xl shadow-lg text-white">
//             <h2 className="text-xl font-semibold">
//               Total Bookings
//             </h2>

//             <p className="text-5xl font-bold mt-4">
//               89
//             </p>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;
import { useMemo } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = useMemo(
    () => [
      {
        title: "Total Properties",
        value: 120,
        change: "+12 this month",
        bg: "from-cyan-400 to-cyan-600",
      },
      {
        title: "Total Users",
        value: 450,
        change: "+25 active today",
        bg: "from-pink-400 to-purple-500",
      },
      {
        title: "Total Bookings",
        value: 89,
        change: "+8 new bookings",
        bg: "from-emerald-400 to-green-600",
      },
    ],
    []
  );

  const metrics = useMemo(
    () => [
      { title: "Occupancy", value: 82, label: "High demand", color: "bg-emerald-500" },
      { title: "Revenue Growth", value: 74, label: "Strong performance", color: "bg-sky-500" },
      { title: "Conversion", value: 68, label: "Improving", color: "bg-violet-500" },
    ],
    []
  );

  const recentActivity = useMemo(
    () => [
      { title: "New Booking", detail: "Rahul booked Luxury Villa", time: "2m ago", color: "text-cyan-300" },
      { title: "New User Registered", detail: "Priya joined platform", time: "10m ago", color: "text-pink-300" },
      { title: "Payment Received", detail: "₹25,000 credited", time: "30m ago", color: "text-emerald-300" },
    ],
    []
  );

  return (
    <div className="min-h-screen flex bg-linear-to-br from-[#0f172a] via-[#111827] to-[#1e3a8a] text-white">
      <div className="w-72 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6">
        <h1 className="text-5xl font-bold mb-12 text-center">Admin</h1>

        <div className="space-y-5">
          <Link
            to="/dashboard"
            className="block w-full bg-white/20 hover:bg-blue-500 transition p-4 rounded-2xl text-left text-xl font-semibold"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/properties"
            className="block w-full bg-white/20 hover:bg-blue-500 transition p-4 rounded-2xl text-left text-xl font-semibold"
          >
            🏠 Properties
          </Link>

          <Link
            to="/bookings"
            className="block w-full bg-white/20 hover:bg-blue-500 transition p-4 rounded-2xl text-left text-xl font-semibold"
          >
            📅 Bookings
          </Link>

          <Link
            to="/users"
            className="block w-full bg-white/20 hover:bg-blue-500 transition p-4 rounded-2xl text-left text-xl font-semibold"
          >
            👥 Users
          </Link>

          <Link
            to="/analytics"
            className="block w-full bg-white/20 hover:bg-blue-500 transition p-4 rounded-2xl text-left text-xl font-semibold"
          >
            📈 Analytics
          </Link>

          <Link
            to="/logout"
            className="block w-full bg-red-500 hover:bg-red-600 transition p-4 rounded-2xl text-left text-xl font-semibold mt-10"
          >
            🚪 Logout
          </Link>
        </div>
      </div>

      <div className="flex-1 p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10">
          <div>
            <h1 className="text-6xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-300 mt-3 text-lg">Welcome back 👋 Manage your platform with clear, live metrics.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl bg-white/10 backdrop-blur-lg px-6 py-5 border border-white/10 shadow-inner">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Active Today</p>
              <p className="mt-3 text-4xl font-semibold text-white">1,240</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur-lg px-6 py-5 border border-white/10 shadow-inner">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">New signups</p>
              <p className="mt-3 text-4xl font-semibold text-white">42</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur-lg px-6 py-5 border border-white/10 shadow-inner">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Bookings today</p>
              <p className="mt-3 text-4xl font-semibold text-white">18</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr] mb-10">
          <section className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className={`rounded-3xl p-8 shadow-2xl transition duration-300 hover:-translate-y-1 ${
                  "bg-linear-to-r " + stat.bg
                }`}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">{stat.title}</p>
                <p className="mt-6 text-5xl font-semibold text-white">{stat.value.toLocaleString()}</p>
                <p className="mt-4 text-white/80">{stat.change}</p>
              </div>
            ))}
          </section>

          <aside className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 shadow-lg">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Performance</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Efficiency overview</h2>
            <div className="mt-8 space-y-5">
              {metrics.map((metric) => (
                <div key={metric.title} className="rounded-3xl bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-300">{metric.title}</p>
                      <p className="mt-2 text-xl font-semibold text-white">{metric.value}%</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                      {metric.label}
                    </span>
                  </div>
                  <div className="mt-4 h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`${metric.color} h-full rounded-full`} style={{ width: `${metric.value}%` }}/>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold">Recent Activity</h2>
              <p className="text-slate-300 mt-2">Live updates from the admin panel and booking system.</p>
            </div>
            <Link
              to="/bookings"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 transition"
            >
              Open booking management
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {recentActivity.map((item) => (
              <div key={item.title} className="rounded-3xl bg-slate-900/70 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{item.title}</p>
                <p className="mt-4 text-xl font-semibold text-white">{item.detail}</p>
                <p className={`mt-5 text-sm font-semibold ${item.color}`}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// function Dashboard() {
//   return (
//     <div className="p-10 text-4xl font-bold">
//       Dashboard Working ✅
//     </div>
//   );
// }

// export default Dashboard;