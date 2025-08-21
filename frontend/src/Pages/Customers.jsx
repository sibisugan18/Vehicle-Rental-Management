import { useEffect, useState } from "react";
import { User, Mail, Phone, Edit2, Trash2, Plus } from "lucide-react";
import axios from "axios";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch customers
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load customers");
        setLoading(false);
      });
  }, []);

  // Add customer
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) return;
    axios
      .post("http://localhost:8080/api/customers", newCustomer)
      .then((res) => {
        setCustomers([...customers, res.data]);
        setNewCustomer({ name: "", email: "", phone: "" });
      })
      .catch(() => setError("Failed to add customer"));
  };

  // Delete customer
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/customers/${id}`)
      .then(() => setCustomers(customers.filter((c) => c.id !== id)))
      .catch(() => setError("Failed to delete customer"));
  };

  if (loading) return <p className="p-6 text-gray-500">Loading customers...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-[#17313E] mb-6">Customers</h2>

      {/* Add Customer Form */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-[#415E72] mb-3 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New Customer
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded-lg flex-1"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-lg flex-1"
            value={newCustomer.email}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone"
            className="p-2 border rounded-lg flex-1"
            value={newCustomer.phone}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, phone: e.target.value })
            }
          />
          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-[#415E72] text-white rounded-lg hover:bg-[#2c4354]"
          >
            Add
          </button>
        </div>
      </div>

      {/* Customer List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-[#17313E] flex items-center gap-2">
                <User className="w-5 h-5 text-[#415E72]" /> {customer.name}
              </h3>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <Mail className="w-4 h-4" /> {customer.email}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {customer.phone}
              </p>
            </div>

            <div className="flex justify-end mt-4 gap-3">
              <button className="p-2 bg-yellow-100 rounded-full hover:bg-yellow-200">
                <Edit2 className="w-5 h-5 text-yellow-600" />
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="p-2 bg-red-100 rounded-full hover:bg-red-200"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
