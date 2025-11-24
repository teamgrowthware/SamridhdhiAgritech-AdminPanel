import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddGodown() {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state?.editItem || null;

  const [godown, setGodown] = useState({
    SerialNo: "",
    Name: "",
    Location: "",
    ManagerName: "",
    Capacity: "",
  });

  const [errors, setErrors] = useState({});

  // Auto SerialNo (Same like AddSoil)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("godown")) || [];

    if (editData) {
      setGodown(editData);
    } else {
      const nextId =
        saved.length > 0
          ? Math.max(...saved.map((item) => Number(item.RequestId))) + 1
          : 1;

      const nextSerial = saved.length + 1;

      setGodown((prev) => ({
        ...prev,
        RequestId: nextId,
        SerialNo: nextSerial,
      }));
    }
  }, [editData]);

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!godown.Name.trim()) newErrors.Name = "Name is required";
    if (!godown.Location.trim()) newErrors.Location = "Location is required";
    if (!godown.ManagerName.trim())
      newErrors.ManagerName = "Manager Name is required";
    if (!godown.Capacity.trim()) newErrors.Capacity = "Capacity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const saved = JSON.parse(localStorage.getItem("godown")) || [];
    let updatedData;

    if (editData) {
      updatedData = saved.map((item) =>
        item.RequestId === editData.RequestId ? godown : item
      );
    } else {
      updatedData = [...saved, godown];
    }

    localStorage.setItem("godown", JSON.stringify(updatedData));

    navigate("/data/godown", { state: { newItem: godown } });
  };

  return (
    <div className="pt-20 ml-64 mb-20 min-h-screen">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {editData ? "Edit Godown" : "Add Godown"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Serial No */}
          <div>
            <label className="font-semibold">Serial No</label>
            <input
              type="text"
              name="SerialNo"
              value={godown.SerialNo}
              readOnly
              className="w-full border p-2 rounded bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="Name"
              value={godown.Name}
              onChange={(e) => setGodown({ ...godown, Name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            {errors.Name && (
              <p className="text-red-500 text-sm">{errors.Name}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="font-semibold">Location</label>
            <input
              type="text"
              name="Location"
              value={godown.Location}
              onChange={(e) =>
                setGodown({ ...godown, Location: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            {errors.Location && (
              <p className="text-red-500 text-sm">{errors.Location}</p>
            )}
          </div>

          {/* Manager Name */}
          <div>
            <label className="font-semibold">Manager Name</label>
            <input
              type="text"
              name="ManagerName"
              value={godown.ManagerName}
              onChange={(e) =>
                setGodown({ ...godown, ManagerName: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            {errors.ManagerName && (
              <p className="text-red-500 text-sm">{errors.ManagerName}</p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <label className="font-semibold">Capacity</label>
            <input
              type="number"
              name="Capacity"
              value={godown.Capacity}
              onChange={(e) =>
                setGodown({ ...godown, Capacity: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            {errors.Capacity && (
              <p className="text-red-500 text-sm">{errors.Capacity}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-7">
            <button
              type="button"
              className="bg-gray-400 text-black px-14 py-2 rounded w-full md:w-auto"
              onClick={() => navigate("/data/godown")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#000000] text-white px-14 py-2 rounded w-full md:w-auto"
            >
              {editData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
