import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingsPage() {
  // Demo bookings data
  const [bookings] = useState([
    {
      id: 1,
      vehicle: "Toyota Innova",
      date: "2025-08-19",
      status: "Confirmed",
    },
    {
      id: 2,
      vehicle: "Royal Enfield Classic 350",
      date: "2025-08-18",
      status: "Completed",
    },
    {
      id: 3,
      vehicle: "Royal Enfield GT 650",
      date: "2025-08-28",
      status: "Confirmed",
    },
    {
       id: 4,
       vehicle: "Maruti Suzuki Swift",
       date: "2025-08-10",
       status: "Cancelled",
    },
    {
  id: 6,
  vehicle: "Toyota Innova Crysta",
  date: "2025-08-17",
  status: "Ongoing",
},
  ]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        className="mb-4 px-4 py-2 bg-[#415E72] text-white rounded"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold text-[#17313E] mb-6">
        My Bookings
      </h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{booking.vehicle}</div>
              <div className="text-gray-500 text-sm">Date: {booking.date}</div>
            </div>
     <div
  className={`font-semibold ${
    booking.status === "Confirmed"
      ? "text-green-600"
      : booking.status === "Ongoing"
      ? "text-blue-600"
      : booking.status === "Cancelled"
      ? "text-red-600"
      : "text-gray-600"
  }`}
>
  {booking.status}
</div>

          </div>
        ))}
      </div>
    </div>
  );
}
