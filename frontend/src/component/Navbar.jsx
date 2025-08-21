export default function Navbar() {
  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-[#17313E]">Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </div>
  );
}
