import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddScheme() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Serialno: "",       // Auto generate
    ProductName: "",
    SchemeName: "",
    SKU: "",
    Quantity: "",
    StartDate: "",
    EndDate: "",
  });

  const [errors, setErrors] = useState({});

  // Auto-generate Serial No
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addScheme")) || [];
    const nextId = stored.length > 0 ? stored[stored.length - 1].Serialno + 1 : 1;

    setFormData((prev) => ({ ...prev, Serialno: nextId }));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation (Corrected)
  const validateForm = () => {
    let err = {};

    if (!formData.ProductName) err.ProductName = "Product name is required";
    if (!formData.SchemeName) err.SchemeName = "Scheme name is required";
    if (!formData.SKU) err.SKU = "SKU is required";
    if (!formData.Quantity) err.Quantity = "Quantity is required";
    if (!formData.StartDate) err.StartDate = "Start date required";
    if (!formData.EndDate) err.EndDate = "End date required";

    return err;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const foundErrors = validateForm();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    const stored = JSON.parse(localStorage.getItem("addScheme")) || [];
    localStorage.setItem("addScheme", JSON.stringify([...stored, formData]));

    toast.success("Scheme added successfully!");
    navigate("/products/scheme");
  };

  return (
    <div className="pt-20 ml-64 mb-20 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add Scheme
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Serial No */}
          <div>
            <p className="mb-1">Serial No (Auto)</p>
            <input
              type="text"
              value={formData.Serialno}
              disabled
              className="w-full border rounded-lg p-2 bg-gray-100"
            />
          </div>

          {/* Text Inputs */}
          {[
            ["ProductName", "Product Name"],
            ["SchemeName", "Scheme Name"],
            ["SKU", "SKU"],
            ["Quantity", "Quantity"],
          ].map(([name, label]) => (
            <div key={name}>
              <p className="mb-1">{label}</p>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Dates */}
          <div>
            <p className="mb-1">Start Date</p>
            <input
              type="date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            {errors.StartDate && (
              <p className="text-red-500 text-sm">{errors.StartDate}</p>
            )}
          </div>

          <div>
            <p className="mb-1">End Date</p>
            <input
              type="date"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            {errors.EndDate && (
              <p className="text-red-500 text-sm">{errors.EndDate}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-5">
            <button
              type="button"
              onClick={() => navigate("/products/scheme")}
              className="bg-gray-400 text-white px-12 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-700 text-white px-12 py-2 rounded-lg"
            >
              Save Scheme
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddScheme;
