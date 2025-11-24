import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddInsects() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    RequestId: "",
    SerialNo: "",
    Image: "",
    InsectName: "",
    InsectHindiName: "",
    Types: "",
  });

  const [errors, setErrors] = useState({});

  // Load Data (Edit or Add Mode)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("insect")) || [];

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
      }));
    }
  }, [location.state]);

  // Validation
  const validate = () => {
    let err = {};

    if (!formData.InsectName.trim()) err.InsectName = "Insect Name is required";

    if (!formData.InsectHindiName.trim())
      err.InsectHindiName = "Hindi name is required";

    if (!formData.Types.trim()) err.Types = "Types is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const saved = JSON.parse(localStorage.getItem("insect")) || [];
    let updatedList;

    if (location.state?.editItem) {
      updatedList = saved.map((item) =>
        item.RequestId === formData.RequestId ? formData : item
      );
    } else {
      updatedList = [...saved, formData];
    }

    localStorage.setItem("insect", JSON.stringify(updatedList));

    navigate("/data/insects", {
      state: { newItem: formData },
    });
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "Image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({ ...formData, Image: reader.result });
      };

      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="pt-20 ml-64 mb-20 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {location.state?.editItem ? "Edit Insect" : "Add Insect"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Serial No */}
          <div>
            <label className="font-semibold">Serial No</label>
            <input
              type="text"
              name="SerialNo"
              value={formData.SerialNo}
              readOnly
              className="w-full px-3 py-2 border rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Insect Name */}
          <div>
            <label className="font-semibold">Insect Name</label>
            <input
              type="text"
              name="InsectName"
              value={formData.InsectName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.InsectName && (
              <p className="text-red-500 text-sm">{errors.InsectName}</p>
            )}
          </div>

          {/* Hindi Name */}
          <div>
            <label className="font-semibold">Insect Hindi Name</label>
            <input
              type="text"
              name="InsectHindiName"
              value={formData.InsectHindiName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1"
            />
            {errors.InsectHindiName && (
              <p className="text-red-500 text-sm">{errors.InsectHindiName}</p>
            )}
          </div>

          {/* Types */}
          <div>
            <label className="font-semibold">Types</label>
            <select
              name="Types"
              value={formData.Types}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg mt-1 bg-white"
            >
              <option value="">Select Type</option>
              <option value="Type A">Type A</option>
              <option value="Type B">Type B</option>
              <option value="Type C">Type C</option>
            </select>

            {errors.Types && (
              <p className="text-red-500 text-sm">{errors.Types}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold">Image</label>
            <input
              type="file"
              name="Image"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1"
            />
            {formData.Image && (
              <img
                src={formData.Image}
                alt="preview"
                className="w-20 h-20 rounded mt-2 border"
              />
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
              {location.state?.editItem ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInsects;
