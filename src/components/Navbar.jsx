import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-black text-white px-10 py-4 flex justify-between items-center border-b border-gray-700">
      <Link
        to="/"
        className="text-xl font-bold tracking-widest"
      >
        AAVARA
      </Link>

      <ul className="flex gap-6 text-sm uppercase">
        <li>
          <Link to="/" className="hover:text-gray-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-gray-400 transition">
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
