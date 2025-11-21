import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddFinishedStock() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Product: "",
    SKU: "",
    SelectGodown: "",
    ManufactureCost: "",
    NetQuantity: "",
    BatchNumber: "",
  });

  const [errors, setErrors] = useState({});

   const product = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"];

  const skuOptions = ["5 liter","2 liter", "1 liter", "500 g", "250 g"];

  const godownOptions = [
    "Main Godown",
    "Secondary Godown",
    "Warehouse A",
    "Warehouse B",
    "City Storage",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Product.trim()) newErrors.Product = "Product is required";
    if (!formData.SKU.trim()) newErrors.SKU = "SKU is required";
    if (!formData.SelectGodown.trim())
      newErrors.SelectGodown = "Select Godown is required";
    if (!formData.ManufactureCost.trim())
      newErrors.ManufactureCost = "Manufacture Cost is required";
    else if (isNaN(formData.ManufactureCost))
      newErrors.ManufactureCost = "Enter a valid number";
    if (!formData.NetQuantity.trim())
      newErrors.NetQuantity = "Net Quantity is required";
    else if (isNaN(formData.NetQuantity))
      newErrors.NetQuantity = "Enter a valid number";
    if (!formData.BatchNumber.trim())
      newErrors.BatchNumber = "Batch Number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validateForm();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    const storedStock = JSON.parse(localStorage.getItem("finishedStock")) || [];
    const nextId =
      storedStock.length > 0 ? storedStock[storedStock.length - 1].id + 1 : 1;

    const newStock = { id: nextId, ...formData };
    localStorage.setItem("finishedStock", JSON.stringify([...storedStock, newStock]));

    toast.success("New Stock added successfully!");
    navigate("/stack/finished");
  };

  return (
    <div className="pt-20 ml-64 mb-60  min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto relative">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add Finished Stock
        </h1>

         {/* Product Dropdown */}
        <div>
          <p className="mb-2">Product</p>
          <select
            name="Product"
            value={formData.Product}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white"
          >
            <option value="">-- Select Product --</option>
            {product.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.Product && (
            <p className="text-red-500 text-sm">{errors.Product}</p>
          )}
        </div>

        {/* SKU Dropdown */}
        <div className="mt-4">
          <p className="mb-2">SKU</p>
          <select
            name="SKU"
            value={formData.SKU}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white"
          >
            <option value="">-- Select SKU --</option>
            {skuOptions.map((sku, idx) => (
              <option key={idx} value={sku}>
                {sku}
              </option>
            ))}
          </select>
          {errors.SKU && (
            <p className="text-red-500 text-sm">{errors.SKU}</p>
          )}
        </div>

        {/* Select Godown Dropdown */}
        <div className="mt-4">
          <p className="mb-2">Select Godown</p>
          <select
            name="SelectGodown"
            value={formData.SelectGodown}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white"
          >
            <option value="">-- Select Godown --</option>
            {godownOptions.map((godown, idx) => (
              <option key={idx} value={godown}>
                {godown}
              </option>
            ))}
          </select>
          {errors.SelectGodown && (
            <p className="text-red-500 text-sm">{errors.SelectGodown}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product, SKU, ManufactureCost, NetQuantity, BatchNumber */}
          {[ "ManufactureCost", "NetQuantity", "BatchNumber"].map(
            (field) => (
              <div key={field}>
                <p className="mb-2">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <input
                  type="text"
                  name={field}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            )
          )}

          {/* Expiry data */}
          <div>
            <p className="mb-2">Expiry Date</p>
            <input
                  type="Date"
                  name="ExpiryDate"
                  placeholder="Expiry date is requierd"
                  value={formData.ExpiryDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
            {errors.ExpiryDate && (
              <p className="text-red-500 text-sm">{errors.ExpiryDate}</p>
            )}
          </div>

          {/* Buttons Centered */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={() => navigate("/stack/finished")}
              className="bg-gray-400 text-white px-16 py-2 rounded-lg font-semibold hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#000000] text-[#ffffff] px-16 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFinishedStock;
