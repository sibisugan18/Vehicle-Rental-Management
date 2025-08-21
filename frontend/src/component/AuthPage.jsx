import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import bg from "../Assets/CARS.jpg";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Basic validation
  const validate = () => {
    if (!form.email || !form.password) return "Email and password are required.";
    if (!isSignIn) {
      if (!form.name) return "Name is required.";
      if (!form.phone || !/^\d{10}$/.test(form.phone)) return "Valid 10-digit phone is required.";
    }
    return "";
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    if (isSignIn) {
      // Simulate login success
      alert("✅ Signed in successfully!");
      navigate("/dashboard");
    } else {
      // Simulate account creation
      alert("🎉 Account created successfully!");
      setIsSignIn(true); // Switch back to Sign In
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8 z-10">
        {/* Toggle Buttons */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsSignIn(true)}
            type="button"
            className={`w-1/2 py-2 rounded-lg font-semibold ${
              isSignIn ? "bg-[#415E72] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            type="button"
            className={`w-1/2 py-2 rounded-lg font-semibold ${
              !isSignIn ? "bg-[#415E72] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-xl font-bold text-center mb-6 text-[#17313E]">
          {isSignIn ? "Welcome Back!" : "Create Your Account"}
        </h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isSignIn && (
            <>
              <InputField
                type="text"
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <InputField
                type="text"
                placeholder="Phone (10 digits)"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </>
          )}
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-[#415E72] hover:bg-[#17313E] text-white py-3 rounded-lg font-semibold transition"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
