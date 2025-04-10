import React from "react";

const CarCard = ({ car, wishlist, addToWishlist, removeFromWishlist }) => {
  const isInWishlist = wishlist?.some((item) => item.id === car.id);

  return (
    <div className="border rounded-xl p-4 shadow-md">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <h2 className="text-lg font-semibold">{car.name}</h2>
      <p className="text-gray-600">{car.brand}</p>
      <p>₹{car.price.toLocaleString()}</p>
      <p>{car.fuel} | {car.seats} Seats</p>
      <button
        onClick={() =>
          isInWishlist ? removeFromWishlist(car.id) : addToWishlist(car)
        }
        className={`mt-2 px-4 py-2 rounded ${
          isInWishlist ? "bg-red-500" : "bg-blue-500"
        } text-white`}
      >
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
};

export default CarCard;
