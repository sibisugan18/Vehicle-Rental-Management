import { useEffect, useState } from "react";

export default function Rentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetch("/api/rentals")
      .then((res) => res.json())
      .then((data) => setRentals(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rental Details</h2>
      <table className="w-full border-collapse bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Vehicle</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{r.id}</td>
              <td className="p-3">{r.customer.name}</td>
              <td className="p-3">{r.vehicle.model}</td>
              <td className="p-3">{r.date}</td>
              <td className="p-3">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
