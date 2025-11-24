import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddNewComplaints() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    RequestId: "",
    SerialNo: "",
    ComplaintID: "",
    FarmerID: "",
    FarmerName: "",
    ComplaintFor: "",
    Date: "",
    HandlerName: "",
  });

  const [errors, setErrors] = useState({});

  // Load data (edit or add mode)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];

    if (location.state?.editItem) {
      setFormData(location.state.editItem);
    } else {
      const nextId =
        saved.length > 0
          ? Math.max(...saved.map((item) => Number(item.RequestId))) + 1
          : 1;

      const nextSerial = saved.length + 1;

      setFormData((prev) => ({
        ...prev,
        RequestId: nextId,
        SerialNo: nextSerial,
        ComplaintID: "CMP" + String(nextId).padStart(4, "0"),
      }));
    }
  }, [location.state]);

  // Validation
  const validate = () => {
    let err = {};

    if (!formData.ComplaintID.trim())
      err.ComplaintID = "Complaint ID is required";

    if (!formData.FarmerID.trim())
      err.FarmerID = "Farmer ID is required";

    if (!formData.FarmerName.trim())
      err.FarmerName = "Farmer Name is required";

    if (!formData.ComplaintFor.trim())
      err.ComplaintFor = "Complaint For is required";

    if (!formData.Date.trim())
      err.Date = "Date is required";

    if (!formData.HandlerName.trim())
      err.HandlerName = "Handler Name is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    let updatedList;

    if (location.state?.editItem) {
      updatedList = saved.map((item) =>
        item.RequestId === formData.RequestId ? formData : item
      );
    } else {
      updatedList = [...saved, formData];
    }

    localStorage.setItem("complaints", JSON.stringify(updatedList));

    navigate("/complains/new", {
      state: { newItem: formData },
    });
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="pt-20 ml-64 mb-20 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {location.state?.editItem ? "Edit Complaint" : "Add New Complaint"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Serial No */}
          {/* <div>
            <label className="font-semibold">Serial No</label>
            <input
              type="text"
              name="SerialNo"
              value={formData.SerialNo}
              readOnly
              className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div> */}

          {/* Complaint ID */}
          <div>
            <label className="font-semibold">Complaint ID</label>
            <input
              type="text"
              name="ComplaintID"
              value={formData.ComplaintID}
              readOnly
              className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
            />
            {errors.ComplaintID && (
              <p className="text-red-500 text-sm">{errors.ComplaintID}</p>
            )}
          </div>

          {/* Farmer ID */}
          <div>
            <label className="font-semibold">Farmer ID</label>
            <input
              type="text"
              name="FarmerID"
              value={formData.FarmerID}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.FarmerID && (
              <p className="text-red-500 text-sm">{errors.FarmerID}</p>
            )}
          </div>

          {/* Farmer Name */}
          <div>
            <label className="font-semibold">Farmer Name</label>
            <input
              type="text"
              name="FarmerName"
              value={formData.FarmerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.FarmerName && (
              <p className="text-red-500 text-sm">{errors.FarmerName}</p>
            )}
          </div>

          {/* Complaint For */}
          <div>
            <label className="font-semibold">Complaint For</label>
            <input
              type="text"
              name="ComplaintFor"
              value={formData.ComplaintFor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.ComplaintFor && (
              <p className="text-red-500 text-sm">{errors.ComplaintFor}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">Date</label>
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.Date && (
              <p className="text-red-500 text-sm">{errors.Date}</p>
            )}
          </div>

          {/* Handler Name */}
          <div>
            <label className="font-semibold">Handler Name</label>
            <input
              type="text"
              name="HandlerName"
              value={formData.HandlerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.HandlerName && (
              <p className="text-red-500 text-sm">{errors.HandlerName}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="px-14 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-14 py-2 bg-[#000000] text-white rounded-lg"
            >
              {location.state?.editItem
                ? "Update"
                : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddNewComplaints;
