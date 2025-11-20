import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId: "",        // Auto generate
    category: "",
    image: "",
    productName: "",
    productHindiName: "",
    technicalName: "",
    mfr: "",
    description: "",
    expiry: "",
    batchNumber: "",
    pdfLabel: "",
    sku: "",
    stockQty: "",
    mrp: "",
    godown: "",
  });

  const [errors, setErrors] = useState({});

  // Dummy Category Dropdown
  const categories = [
    "Seeds",
    "Fertilizers",
    "Pesticides",
    "Herbicides",
    "Insecticides",
    "Fungicides",
    "Tools / Equipments",
    "Other Products",
  ];

  const godownOptions = [
    "Main Godown",
    "Secondary Godown",
    "Warehouse A",
    "Warehouse B",
    "City Storage",
  ];

  // Auto Generate Product ID
  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addproduct")) || [];
    const nextId = stored.length > 0 ? stored[stored.length - 1].productId + 1 : 1;

    setFormData((prev) => ({ ...prev, productId: nextId }));
  }, []);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // PDF Upload
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, pdfLabel: file.name });
  };

  // Validation
  const validateForm = () => {
    let err = {};

    if (!formData.category) err.category = "Category is required";
    if (!formData.image) err.image = "Product image is required";
    if (!formData.productName) err.productName = "Product name is required";
    if (!formData.productHindiName) err.productHindiName = "Hindi name required";
    if (!formData.technicalName) err.technicalName = "Technical name required";
    if (!formData.mfr) err.mfr = "Manufacturer name required";
    if (!formData.description) err.description = "Description required";
    if (!formData.expiry) err.expiry = "Expiry date required";
    if (!formData.batchNumber) err.batchNumber = "Batch number required";
    if (!formData.pdfLabel) err.pdfLabel = "Product label PDF required";
    if (!formData.sku) err.sku = "SKU is required";
    if (!formData.stockQty) err.stockQty = "Stock quantity required";
    if (!formData.mrp) err.mrp = "MRP required";
    if (!formData.godown) err.godown = "Select godown";

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

    const stored = JSON.parse(localStorage.getItem("addproduct")) || [];
    localStorage.setItem("addproduct", JSON.stringify([...stored, formData]));

    toast.success("Product added successfully!");
    navigate("/products/list");
  };

  return (
    <div className="pt-20 ml-64 mb-20 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Product ID Auto */}
          <div>
            <p className="mb-1">Product ID (Auto)</p>
            <input
              type="text"
              value={formData.productId}
              disabled
              className="w-full border rounded-lg p-2 bg-gray-100"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <p className="mb-1">Product Category</p>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <p className="mb-1">Product Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded-lg"
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-24 object-cover mt-2 rounded border"
              />
            )}

            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          {/* Text Inputs */}
          {[
            ["productName", "Product Name"],
            ["productHindiName", "Product Hindi Name"],
            ["technicalName", "Technical Name"],
            ["mfr", "MFR (Manufacturer)"],
            ["description", "Product Description"],
            ["batchNumber", "Batch Number"],
            ["sku", "SKU"],
            ["stockQty", "Stock Quantity"],
            ["mrp", "MRP"],
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

          {/* Expiry Date */}
          <div>
            <p className="mb-1">Expiry Date</p>
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
          </div>

          {/* PDF Upload */}
          <div>
            <p className="mb-1">Product Label (PDF)</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="w-full border p-2 rounded-lg"
            />
            {formData.pdfLabel && (
              <p className="text-green-600 text-sm mt-1">Uploaded: {formData.pdfLabel}</p>
            )}
            {errors.pdfLabel && <p className="text-red-500 text-sm">{errors.pdfLabel}</p>}
          </div>

          {/* Godown Dropdown */}
          <div>
            <p className="mb-1">Select Godown</p>
            <select
              name="godown"
              value={formData.godown}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">-- Select Godown --</option>
              {godownOptions.map((g, idx) => (
                <option key={idx} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.godown && <p className="text-red-500 text-sm">{errors.godown}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-5">
            <button
              type="button"
              onClick={() => navigate("/products/list")}
              className="bg-gray-400 text-white px-12 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-700 text-white px-12 py-2 rounded-lg"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
