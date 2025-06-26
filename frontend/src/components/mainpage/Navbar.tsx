import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-[#C9A55C] font-serif text-xl font-bold uppercase"
            >
              Azure Horizon
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to='/' className="text-gray-700 hover:text-[#C9A55C]">
              Home
            </Link>
            <Link  to="/rooms" className="text-gray-700 hover:text-[#C9A55C]">
              Rooms
            </Link>
            <Link  to="/service" className="text-gray-700 hover:text-[#C9A55C]">
              Services
            </Link>
            <Link  to="/about" className="text-gray-700 hover:text-[#C9A55C]">
              About
            </Link>
            <Link  to="/contact" className="text-gray-700 hover:text-[#C9A55C]">
              Contact
            </Link>
          </div>

          {/* sign in and book now buttons */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/signin"
              className="text-gray-700 hover:text-[#C9A55C] border border-gray-300 px-4 py-2 rounded-md transition"
            >
              Sign In
            </a>
            <a
              href="/book"
              className="bg-[#C9A55C] text-white px-4 py-2 rounded-md hover:bg-[#C9A55C] transition"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-[#C9A55C]">Azure Horizon</h2>
          <button onClick={toggleMenu} className="text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <a href="#" className="text-gray-700 hover:text-[#C9A55C]">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-[#C9A55C]">
            Rooms
          </a>
          <a href="#" className="text-gray-700 hover:text-[#C9A55C]">
            Services
          </a>
          <a href="#" className="text-gray-700 hover:text-[#C9A55C]">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-[#C9A55C]">
            Contact
          </a>
          <a
            href="/signin"
            className="text-center text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:text-blue-600"
          >
            Sign In
          </a>
          <a
            href="/book"
            className="text-center bg-[#C9A55C] text-white px-4 py-2 rounded-md hover:bg-[#C9A55C] transition"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Optional: Overlay Background */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}
