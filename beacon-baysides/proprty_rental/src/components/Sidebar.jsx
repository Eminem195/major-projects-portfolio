import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#1e3a5f] p-6">

      <h1 className="text-5xl font-bold text-white mb-10">
        Admin
      </h1>

      <div className="flex flex-col gap-6">

        <Link
          to="/dashboard"
          className="bg-[#9bb7d4] p-4 rounded-2xl text-white text-2xl font-bold"
        >
          Dashboard
        </Link>

        <Link
          to="/properties"
          className="bg-[#9bb7d4] p-4 rounded-2xl text-white text-2xl font-bold"
        >
          Properties
        </Link>

        <Link
          to="/bookings"
          className="bg-[#9bb7d4] p-4 rounded-2xl text-white text-2xl font-bold"
        >
          Bookings
        </Link>

        <Link
          to="/users"
          className="bg-[#9bb7d4] p-4 rounded-2xl text-white text-2xl font-bold"
        >
          Users
        </Link>

        <Link
          to="/analytics"
          className="bg-[#9bb7d4] p-4 rounded-2xl text-white text-2xl font-bold"
        >
          Analytics
        </Link>

        

      </div>
    </div>
  );
};

export default Sidebar;