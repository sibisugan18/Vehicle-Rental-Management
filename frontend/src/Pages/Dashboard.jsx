import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, LogOut, Car, Bike } from "lucide-react";
import creta from "../Assets/creata.webp";
import  honda from "../Assets/HONDA CITY.jpeg";
import mt from"../Assets/MT 15.jpeg";
import re from "../Assets/RE.jpeg"

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNumber: "KA01AB1234",
      type: "Car",
      model: "Toyota Innova Crysta",
      pricePerDay: 3000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu7MzgZJVyyjZyTyO-NMBNx1d8abf5xDIlPhMyR27qOozW2OrhVrQrf4gay-Klf-NjuqEdPL-MBg1wAYraLnZRHEx2kUyJAdU17WzDFdnX",
      available: true,
    },
    {
      id: 2,
      vehicleNumber: "TN02XY5678",
      type: "Bike",
      model: "Royal Enfield Classic 350",
      pricePerDay: 700,
      image: re,
      available: true,
    },
    {
      id: 3,
      vehicleNumber: "MH03PQ9101",
      type: "Car",
      model: "Hyundai Creta",
      pricePerDay: 1200,
      image: creta,
      available: true,
    },
    {
      id: 4,
      vehicleNumber: "DL04LM2222",
      type: "Car",
      model: "Honda City",
      pricePerDay: 1100,
      image: honda,
      available: true,
    },
    {
      id: 5,
      vehicleNumber: "KL05ZX9999",
      type: "Bike",
      model: "Yamaha MT-15",
      pricePerDay: 600,
      image: mt,
      available: true,
    },
  ]);
  const [search, setSearch] = useState("");
  const [user] = useState({ name: "User" });
  const navigate = useNavigate();

  // Filter vehicles by search
  const filteredVehicles = vehicles.filter(
    (v) =>
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase())
  );

  // Simulate booking
  const handleBook = (vehicleId) => {
    setVehicles((vehicles) =>
      vehicles.map((v) =>
        v.id === vehicleId ? { ...v, available: false } : v
      )
    );
    alert("Booking successful!");
  };

  // Simulate logout
  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#17313E] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          🚗 VRM System
        </div>
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
            onClick={()=>navigate("/profile")}
            className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg w-full text-left"
          >
            <User size={20} /> Profile
          </button>
        </nav>
        <button
          className="flex items-center gap-3 p-4 hover:bg-red-600"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-1/2">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search vehicles..."
              className="ml-2 outline-none flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">
              Hello, {user.name}
            </span>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-[#415E72]"
            />
          </div>
        </header>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#17313E] mb-6">
          Available Vehicles
        </h2>

        {/* Vehicle Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition transform"
            >
              <img
                src={vehicle.image}
                alt={vehicle.model}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#17313E]">
                  {vehicle.model}
                </h3>
                <p className="text-sm text-gray-500">{vehicle.type}</p>
                <p className="text-gray-600 text-sm">
                  No: {vehicle.vehicleNumber}
                </p>
                <p className="text-lg font-semibold text-[#415E72] mt-2">
                  ₹{vehicle.pricePerDay} / day
                </p>
                <button
                  onClick={() => handleBook(vehicle.id)}
                  className="mt-4 w-full bg-[#415E72] hover:bg-[#17313E] text-white py-2 rounded-lg font-semibold transition"
                  disabled={!vehicle.available}
                >
                  {vehicle.available ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
