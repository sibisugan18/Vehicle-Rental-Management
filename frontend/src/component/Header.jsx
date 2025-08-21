export default function Header() {
  return (
    <header className="bg-[#415E72] text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vehicle Rental</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-[#C5B0CD]">Home</a>
          <a href="/signin" className="hover:text-[#C5B0CD]">Sign In</a>
          <a href="/signup" className="hover:text-[#C5B0CD]">Sign Up</a>
        </nav>
      </div>
    </header>
  );
}
