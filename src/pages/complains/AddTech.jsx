import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddTechnical from "../data/AddTechnical";

function AddTech() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    RequestId: "",
    SerialNo: "",
    TicketID: "",
    EmployeeID: "",
    EmployeeName: "",
    TicketFor: "",
    Date: "",
    HandlerName: "",
  });

  const [errors, setErrors] = useState({});

  // Load data (edit or add mode)
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("tech")) || [];

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
      TicketID: "Ticket" + String(nextId).padStart(4, "0"),
    }));
  }
}, [location.state]);


  // Validation
  const validate = () => {
    let err = {};

    if (!formData.TicketID.trim()) err.TicketID = "Ticket ID is required";
    if (!formData.EmployeeID.trim()) err.EmployeeID = "Employee ID is required";
    if (!formData.EmployeeName.trim())
      err.EmployeeName = "Employee Name is required";
    if (!formData.TicketFor.trim()) err.TicketFor = "Ticket For is required";
    if (!formData.Date.trim()) err.Date = "Date is required";
    if (!formData.HandlerName.trim())
      err.HandlerName = "Handler Name is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const saved = JSON.parse(localStorage.getItem("tech")) || [];
    let updatedList;

    if (location.state?.editItem) {
      updatedList = saved.map((item) =>
        item.RequestId === formData.RequestId ? formData : item
      );
    } else {
      updatedList = [...saved, formData];
    }

    localStorage.setItem("tech", JSON.stringify(updatedList));

    navigate("/complains/technical", {
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
          {location.state?.editItem ? "Edit Ticket" : "Add New Ticket"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Ticket ID */}
          <div>
            <label className="font-semibold">Ticket ID</label>
            <input
              type="text"
              name="TicketID"
              value={formData.TicketID}
              readOnly
              className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
            />
            {errors.TicketID && (
              <p className="text-red-500 text-sm">{errors.TicketID}</p>
            )}
          </div>

          {/* Employee ID */}
          <div>
            <label className="font-semibold">Employee ID</label>
            <input
              type="text"
              name="EmployeeID"
              value={formData.EmployeeID}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.EmployeeID && (
              <p className="text-red-500 text-sm">{errors.EmployeeID}</p>
            )}
          </div>

          {/* Employee Name */}
          <div>
            <label className="font-semibold">Employee Name</label>
            <input
              type="text"
              name="EmployeeName"
              value={formData.EmployeeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.EmployeeName && (
              <p className="text-red-500 text-sm">{errors.EmployeeName}</p>
            )}
          </div>

          {/* Ticket For */}
          <div>
            <label className="font-semibold">Ticket For</label>
            <input
              type="text"
              name="TicketFor"
              value={formData.TicketFor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.TicketFor && (
              <p className="text-red-500 text-sm">{errors.TicketFor}</p>
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
              className="px-12 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-12 py-2 bg-indigo-700 text-white rounded-lg"
            >
              {location.state?.editItem ? "Update Ticket" : "Save Ticket"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddTech;
