import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function AddTechnical() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    RequestId: "",
    TechnicalName: "",
    HindiName: "",
    SubCategory: "",
  });

  const [errors, setErrors] = useState({});

  // Auto Increment RequestId
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("technicaldata")) || [];

    const nextId =
      stored.length > 0 ? stored[stored.length - 1].RequestId + 1 : 1;

    setFormData((prev) => ({ ...prev, RequestId: nextId }));

    // If editing
    if (location.state?.editItem) {
      setFormData(location.state.editItem);
    }
  }, [location.state]);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation
  const validateForm = () => {
    let err = {};

    if (!formData.TechnicalName)
      err.TechnicalName = "Technical name is required";

    if (!formData.HindiName)
      err.HindiName = "Hindi name is required";

    if (!formData.SubCategory)
      err.SubCategory = "Sub category is required";

    return err;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const errorsFound = validateForm();
    if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound);
      return;
    }

    const stored = JSON.parse(localStorage.getItem("technicaldata")) || [];

    let updated;

    // If editing → update existing item
    if (location.state?.editItem) {
      updated = stored.map((item) =>
        item.RequestId === formData.RequestId ? formData : item
      );
    } else {
      updated = [...stored, formData];
    }

    localStorage.setItem("technicaldata", JSON.stringify(updated));

    toast.success("Technical data saved!");
    navigate("/data/technical");
  };

  return (
    <div className="pt-20 ml-64 mb-20 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {location.state?.editItem ? "Edit Technical" : "Add Technical"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Request Id */}
          <div>
            <p className="mb-1">Request ID</p>
            <input
              type="text"
              value={formData.RequestId}
              disabled
              className="w-full p-2 bg-gray-200 border rounded"
            />
          </div>

          {/* Technical Name */}
          <div>
            <p className="mb-1">Technical Name</p>
            <input
              type="text"
              name="TechnicalName"
              value={formData.TechnicalName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.TechnicalName && (
              <p className="text-red-500 text-sm">{errors.TechnicalName}</p>
            )}
          </div>

          {/* Hindi Name */}
          <div>
            <p className="mb-1">Hindi Name</p>
            <input
              type="text"
              name="HindiName"
              value={formData.HindiName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.HindiName && (
              <p className="text-red-500 text-sm">{errors.HindiName}</p>
            )}
          </div>

          {/* Sub Category */}
          <div>
            <p className="mb-1">Sub Category</p>
            <input
              type="text"
              name="SubCategory"
              value={formData.SubCategory}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.SubCategory && (
              <p className="text-red-500 text-sm">{errors.SubCategory}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-5">
            <button
              type="button"
              onClick={() => navigate("/data/technical")}
              className="px-14 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-14 py-2 bg-[#000000] text-white rounded-lg"
            >
              Save 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTechnical;
