import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddCategory({ initialData = {}, title, onSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();

  const dynamicTitle = location.state?.formTitle || title;

  const editItem = location.state?.editItem || null;

  const [formData, setFormData] = useState({
    CategoryType: "",
    CategoryName: "",
    Image: "",
    id: null,
    ...editItem,
  });

  const [errors, setErrors] = useState({
    CategoryType: "",
    CategoryName: "",
    Image: "",
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, Image: reader.result });
      setErrors((prev) => ({ ...prev, Image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    let temp = {};

    if (!formData.CategoryType.trim())
      temp.CategoryType = "Category Type is required";

    if (!formData.CategoryName.trim())
      temp.CategoryName = "Category Name is required";

    if (!formData.Image) temp.Image = "Category Image is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let saved = JSON.parse(localStorage.getItem("categories")) || [];

    const dataToSend = {
      ...formData,
      id: formData.id || Date.now(),
    };

    // ✔ If editing → replace item
    if (editItem) {
      saved = saved.map((c) => (c.id === dataToSend.id ? dataToSend : c));
    } else {
      // ✔ If adding → push new item
      saved.push(dataToSend);
    }

    // ⭐ Save to localStorage
    localStorage.setItem("categories", JSON.stringify(saved));

    // Back to previous page
    navigate("/products/category");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto mt-12 ">
      <h1 className="text-2xl font-semibold text-center mb-6">{dynamicTitle}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Category Type</label>
          <input
            type="text"
            name="CategoryType"
            placeholder="Enter Category Type"
            value={formData.CategoryType}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.CategoryType && (
            <p className="text-red-500 text-sm mt-1">{errors.CategoryType}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            name="CategoryName"
            placeholder="Enter Category Name"
            value={formData.CategoryName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.CategoryName && (
            <p className="text-red-500 text-sm mt-1">{errors.CategoryName}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded-lg p-2 bg-white"
          />
          {errors.Image && (
            <p className="text-red-500 text-sm mt-1">{errors.Image}</p>
          )}
        </div>

        {formData.Image && (
          <img
            src={formData.Image}
            className="h-24 w-24 object-cover mt-3 rounded-lg border"
          />
        )}

        <div className="flex justify-center gap-6 mt-6">
          <button
            type="button"
            onClick={() => navigate("/products/category")}
            className="bg-gray-400 text-white px-16 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-[#4B0082] text-white px-16 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
