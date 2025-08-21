import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#17313E] text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8">VRM Dashboard</h1>
      <nav className="flex-1 p-4 space-y-4">
  <button
    onClick={() => navigate("/vehicles")}
    className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg w-full text-left"
  >
    <Car size={20} /> Vehicles
  </button>
  <button
    onClick={() => navigate("/bookings")}
    className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg w-full text-left"
  >
    <Bike size={20} /> Bookings
  </button>
  <button
    onClick={() => navigate("/customers")}
    className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg w-full text-left"
  >
    <User size={20} /> Customers
  </button>
  <button
    onClick={() => navigate("/profile")}
    className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg w-full text-left"
  >
    <User size={20} /> Profile
  </button>
</nav>

    </div>
  );
}
