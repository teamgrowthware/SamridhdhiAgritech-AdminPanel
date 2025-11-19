import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddUsers() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    payment: "",
    tags: "",
    percent: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.handle.trim()) newErrors.handle = "Handle is required.";
    else if (!/^@\w+/.test(formData.handle))
      newErrors.handle = "Handle must start with '@'.";

    if (!formData.payment) newErrors.payment = "Select a payment method.";

    if (!formData.tags.trim())
      newErrors.tags = "At least one category tag is required.";

    if (!formData.percent) newErrors.percent = "Clickthrough % is required.";
    else if (formData.percent < 0 || formData.percent > 100)
      newErrors.percent = "Percentage must be between 0 and 100.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Store user in localStorage (similar to AddStock)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const nextId =
      storedUsers.length > 0 ? storedUsers[storedUsers.length - 1].id + 1 : 1;

    const newUser = { id: nextId, ...formData };

    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    toast.success("User added successfully!");
    navigate("/");
  };

  return (
    <div className="pt-20 ml-64 mb-60 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto relative">
        {/* Cancel / Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-all"
          title="Cancel"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add New User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Handle */}
          <div>
            <input
              type="text"
              name="handle"
              placeholder="@username"
              value={formData.handle}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            {errors.handle && (
              <p className="text-red-500 text-sm">{errors.handle}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 text-gray-600"
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            {errors.payment && (
              <p className="text-red-500 text-sm">{errors.payment}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <input
              type="text"
              name="tags"
              placeholder="Category Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}
          </div>

          {/* Percent */}
          <div>
            <input
              type="number"
              name="percent"
              placeholder="Clickthrough % (0 - 100)"
              value={formData.percent}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            {errors.percent && (
              <p className="text-red-500 text-sm">{errors.percent}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#4B0082] text-white py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
