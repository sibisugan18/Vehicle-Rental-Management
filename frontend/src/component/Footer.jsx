export default function Footer() {
  return (
    <footer className="bg-[#17313E] text-[#F3E2D4] py-6">
      <div className="max-w-6xl mx-auto text-center text-sm">
        © {new Date().getFullYear()} Vehicle Rental Management. All rights reserved.
      </div>
    </footer>
  );
}
