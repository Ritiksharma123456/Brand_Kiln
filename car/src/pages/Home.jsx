
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import carsData from "../data/cars.json"; // ✅ correct import if in src/data

const Home = ({ wishlist, addToWishlist, removeFromWishlist }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    setCars(carsData);
    setFilteredCars(carsData);
  }, []);

  useEffect(() => {
    let updatedCars = [...cars];

    if (searchQuery) {
      updatedCars = updatedCars.filter((car) =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (brandFilter) {
      updatedCars = updatedCars.filter((car) => car.brand === brandFilter);
    }

    if (fuelFilter) {
      updatedCars = updatedCars.filter((car) => car.fuel === fuelFilter);
    }

    if (priceFilter) {
      if (priceFilter === "low") {
        updatedCars = updatedCars.filter((car) => car.price <= 500000);
      } else if (priceFilter === "mid") {
        updatedCars = updatedCars.filter(
          (car) => car.price > 500000 && car.price <= 1000000
        );
      } else if (priceFilter === "high") {
        updatedCars = updatedCars.filter((car) => car.price > 1000000);
      }
    }

    setFilteredCars(updatedCars);
    setCurrentPage(1);
  }, [searchQuery, brandFilter, fuelFilter, priceFilter, cars]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Car Finder</h1>

      {/* Filters */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Brands</option>
          <option value="Tata">Tata</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Kia">Kia</option>
          <option value="Toyota">Toyota</option>
          <option value="Renault">Renault</option>
          <option value="Maruti">Maruti</option>
          <option value="Mahindra">Mahindra</option>
          <option value="Honda">Honda</option>
        </select>

        <select
          value={fuelFilter}
          onChange={(e) => setFuelFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Prices</option>
          <option value="low">Below ₹5 Lakh</option>
          <option value="mid">₹5-10 Lakh</option>
          <option value="high">Above ₹10 Lakh</option>
        </select>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCars.length > 0 ? (
          currentCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              wishlist={wishlist}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No cars match your filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredCars.length > carsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
