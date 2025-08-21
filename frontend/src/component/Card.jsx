export default function Card({ title, count }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-[#17313E]">{count}</p>
    </div>
  );
}
