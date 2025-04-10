import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="border p-4 rounded-lg shadow-md w-full md:w-1/3">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>
      <div className="space-y-3">
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          placeholder="Search by Brand"
          className="w-full p-2 border rounded"
        />
        <select name="fuel" value={filters.fuel} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
        <select name="seats" value={filters.seats} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Seating Capacity</option>
          <option value="2">2 Seater</option>
          <option value="4">4 Seater</option>
          <option value="5">5 Seater</option>
          <option value="7">7 Seater</option>
        </select>
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleChange}
          placeholder="Max Price"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default Filters;
