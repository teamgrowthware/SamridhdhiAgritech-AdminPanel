import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function AddRequest() {
  const navigate = useNavigate();
  const location = useLocation();

  const editItem = location.state?.editItem || null;

  const [formData, setFormData] = useState({
    requestId: "",
    productName: "",
    requesterName: "",
    sku: "",
    amount: "",
    village: "",
    district: "",
  });

  const [errors, setErrors] = useState({});

  // Auto ID Generate or Set Edit Data
  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      const stored = JSON.parse(localStorage.getItem("addrequest")) || [];
      const nextId = stored.length > 0 
        ? stored[stored.length - 1].requestId + 1 
        : 1;

      setFormData((prev) => ({ ...prev, requestId: nextId }));
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    const temp = {};
    if (!formData.productName) temp.productName = "Required";
    if (!formData.requesterName) temp.requesterName = "Required";
    if (!formData.sku) temp.sku = "Required";
    if (!formData.amount) temp.amount = "Required";
    if (!formData.village) temp.village = "Required";
    if (!formData.district) temp.district = "Required";
    return temp;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundErrors = validateForm();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    const stored = JSON.parse(localStorage.getItem("addrequest")) || [];

    let updatedData;

    if (editItem) {
      updatedData = stored.map((i) =>
        i.requestId === formData.requestId ? formData : i
      );
      toast.success("Request updated successfully!");
    } else {
      updatedData = [...stored, formData];
      toast.success("Request added successfully!");
    }

    localStorage.setItem("addrequest", JSON.stringify(updatedData));
    navigate("/products/request");
  };

  return (
    <div className="pt-20 ml-64 mb-20 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {editItem ? "Edit Request" : "Add New Request"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Request ID */}
          <div>
            <p className="mb-1">Request ID (Auto)</p>
            <input
              type="text"
              value={formData.requestId}
              disabled
              className="w-full border rounded-lg p-2 bg-gray-200"
            />
          </div>

          {[
            ["productName", "Product Name"],
            ["requesterName", "Requester Name"],
            ["sku", "SKU"],
            ["amount", "Amount"],
            ["village", "Village"],
            ["district", "District"],
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

          <div className="flex justify-center gap-6 mt-5">
            <button
              type="button"
              onClick={() => navigate("/products/request")}
              className="bg-gray-500 text-white px-10 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-700 text-white px-10 py-2 rounded-lg"
            >
              {editItem ? "Update" : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddRequest;
