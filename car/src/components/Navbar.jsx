import { Link } from "react-router-dom";

const Navbar = ({ wishlist }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        Car Finder
      </Link>
      <Link to="/wishlist" className="relative">
        Wishlist
        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {wishlist.length}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
