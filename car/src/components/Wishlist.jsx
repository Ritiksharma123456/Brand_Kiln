
import React from "react";
import CarCard from "../components/CarCard";

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No cars in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
