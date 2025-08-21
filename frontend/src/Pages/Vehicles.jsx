import { useEffect, useState } from "react";
import { Car, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    type: "",
    model: "",
    rentalPrice: "",
    available: true,
  });
  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch vehicles from backend
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/vehicles");
      setVehicles(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ✅ Handle form submit (add new vehicle)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/vehicles", formData);
      setShowForm(false);
      setFormData({
        vehicleNumber: "",
        type: "",
        model: "",
        rentalPrice: "",
        available: true,
      });
      fetchVehicles();
    } catch (err) {
      alert("Error adding vehicle. Please check input.");
    }
  };

  // ✅ Delete vehicle
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      alert("Failed to delete vehicle");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back button */}
      <button
        className="mb-4 px-4 py-2 bg-[#415E72] text-white rounded"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#17313E]">All Vehicles</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          onClick={() => setShowForm(true)}
        >
          <PlusCircle size={18} /> Add Vehicle
        </button>
      </div>

      {/* Loading / Error / Empty State */}
      {loading && <p className="text-gray-600">Loading vehicles...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && vehicles.length === 0 && (
        <p className="text-gray-600">No vehicles available.</p>
      )}

      {/* Vehicle Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Car className="text-[#415E72]" />
                <h3 className="text-lg font-bold text-[#17313E]">
                  {vehicle.model}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{vehicle.type}</p>
              <p className="text-gray-600 text-sm">
                No: {vehicle.vehicleNumber}
              </p>
              <p className="text-lg font-semibold text-[#415E72] mt-2">
                ₹{vehicle.rentalPrice} / hr
              </p>
              <p
                className={`text-sm mt-1 ${
                  vehicle.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {vehicle.available ? "Available" : "Not Available"}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                  onClick={() => alert("Rent flow will be added")}
                  disabled={!vehicle.available}
                >
                  Rent
                </button>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => {
                    setFormData(vehicle);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(vehicle.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Vehicle Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Add / Update Vehicle</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Vehicle Number"
                className="w-full border rounded p-2"
                value={formData.vehicleNumber}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleNumber: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Type (Car/Bike)"
                className="w-full border rounded p-2"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Model"
                className="w-full border rounded p-2"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Rental Price"
                className="w-full border rounded p-2"
                value={formData.rentalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, rentalPrice: e.target.value })
                }
                required
              />
              <select
                className="w-full border rounded p-2"
                value={formData.available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available: e.target.value === "true",
                  })
                }
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
