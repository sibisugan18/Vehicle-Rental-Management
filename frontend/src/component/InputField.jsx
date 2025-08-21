export default function InputField({ type, placeholder, name, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#C5B0CD] focus:outline-none"
    />
  );
}
