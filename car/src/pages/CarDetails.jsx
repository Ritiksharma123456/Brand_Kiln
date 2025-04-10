import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch("/cars.json");
      const data = await res.json();
      const found = data.find((c) => c.id.toString() === id);
      setCar(found);
    };
    fetchCar();
  }, [id]);

  if (!car) return <p className="text-center mt-8">Loading car details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-600 underline">← Back to Home</Link>
      <h1 className="text-2xl font-bold mt-4">{car.name}</h1>
      <img src={car.image} alt={car.name} className="w-full h-60 object-cover mt-4 rounded-lg" />
      <p className="mt-2 text-gray-600">Brand: {car.brand}</p>
      <p>Fuel: {car.fuel}</p>
      <p>Seats: {car.seats}</p>
      <p className="font-bold text-green-700 mt-2 text-lg">₹{car.price}</p>
    </div>
  );
};

export default CarDetails;
