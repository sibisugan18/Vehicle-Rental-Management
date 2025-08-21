import { useState } from "react";
import { User, Mail, Phone, Edit2, Car, History } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Profile Card */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-6">
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-[#415E72] object-cover"
          />
          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 mb-2 border rounded-lg"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 mb-2 border rounded-lg"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Phone"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#17313E] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#415E72]" /> {profile.name}
                </h2>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-500" /> {profile.email}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" /> {profile.phone}
                </p>
              </>
            )}
          </div>
          {isEditing ? (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Rental History */}
      <div className="bg-white w-full max-w-3xl mt-6 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-[#17313E] flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-[#415E72]" /> Rental History
        </h3>
        <ul className="space-y-4">
          <li className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-bold text-[#17313E] flex items-center gap-2">
                <Car className="w-4 h-4 text-[#415E72]" /> Honda City
              </p>
              <p className="text-gray-500 text-sm">
                Duration: 3 hours | Cost: ₹900
              </p>
            </div>
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              Completed
            </span>
          </li>
          <li className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-bold text-[#17313E] flex items-center gap-2">
                <Car className="w-4 h-4 text-[#415E72]" /> Yamaha MT-15
              </p>
              <p className="text-gray-500 text-sm">
                Duration: 5 hours | Cost: ₹3000
              </p>
            </div>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
              Active
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
