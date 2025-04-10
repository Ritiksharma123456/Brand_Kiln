import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Wishlist from "./components/Wishlist";
import CarDetails from "./pages/CarDetails";
import Home from "./pages/Home";


function App() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  // Function to add car to wishlist
  const addToWishlist = (car) => {
    const exists = wishlist.find((c) => c.id === car.id);
    if (!exists) {
      const updated = [...wishlist, car];
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  };

  // Function to remove car from wishlist
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((car) => car.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <Router>
      <Navbar wishlist={wishlist} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />
        <Route
          path="/car/:id"
          element={<CarDetails addToWishlist={addToWishlist} />}
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
