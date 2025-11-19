import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddFarmer = () => {
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState({
    farmerId: "",
    name: "",
    fatherName: "",
    contact: "",
    whatsapp: "",
    cropArea: "",
    crop: "",
    landArea: "",
    pincode: "",
    nearbyCity: "",
    tehsil: "",
    district: "",
    state: "",
    village: "",
    photo: "", // ADDED
  });

  const [errors, setErrors] = useState({});

  // AUTO GENERATE FARMER ID
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("farmers")) || [];
    const nextId = existing.length + 1;
    setFarmer((prev) => ({ ...prev, farmerId: `FMR-${nextId}` }));
  }, []);

  // PHOTO UPLOAD HANDLER
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFarmer((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // VALIDATION
  const validate = () => {
    let temp = {};
    if (!farmer.name.trim()) temp.name = "Name is required";
    if (!farmer.fatherName.trim()) temp.fatherName = "Father name is required";
    if (!/^[0-9]{10}$/.test(farmer.contact))
      temp.contact = "Valid 10-digit contact required";
    if (!/^[0-9]{10}$/.test(farmer.whatsapp))
      temp.whatsapp = "Valid 10-digit WhatsApp required";

    if (!farmer.cropArea.trim()) temp.cropArea = "Crop area required";
    if (!farmer.crop.trim()) temp.crop = "Crop required";
    if (!farmer.landArea.trim()) temp.landArea = "Land area required";

    if (!/^[0-9]{6}$/.test(farmer.pincode))
      temp.pincode = "Valid 6-digit pincode required";

    if (!farmer.nearbyCity.trim()) temp.nearbyCity = "Nearby city required";
    if (!farmer.tehsil.trim()) temp.tehsil = "Tehsil required";
    if (!farmer.district.trim()) temp.district = "District required";
    if (!farmer.state.trim()) temp.state = "State required";
    if (!farmer.village.trim()) temp.village = "Village required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const resetForm = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const existing = JSON.parse(localStorage.getItem("farmers")) || [];
    existing.push(farmer);
    localStorage.setItem("farmers", JSON.stringify(existing));

    alert("Farmer added successfully!");
    navigate(-1);
  };

  const handleChange = (e) => {
    setFarmer({ ...farmer, [e.target.name]: e.target.value });
  };

  // ALL INPUT FIELDS ARRAY
  const inputs = [
    { label: "Name", name: "name", placeholder: "Enter farmer name" },
    { label: "Father Name", name: "fatherName", placeholder: "Enter father name" },
    { label: "Contact", name: "contact", type: "number", placeholder: "10-digit number" },
    { label: "WhatsApp Contact", name: "whatsapp", type: "number", placeholder: "10-digit WhatsApp number" },
    { label: "Crop Area", name: "cropArea", placeholder: "Example: 20 Bigha / 2 Acre" },
    { label: "Crop", name: "crop", placeholder: "Crop type (Wheat, Soybean, etc.)" },
    { label: "Land Area", name: "landArea", placeholder: "Total land area" },
    { label: "Pin Code", name: "pincode", type: "number", placeholder: "6-digit pin code" },
    { label: "Nearby City", name: "nearbyCity", placeholder: "Nearest city" },
    { label: "Tehsil", name: "tehsil", placeholder: "Enter tehsil" },
    { label: "District", name: "district", placeholder: "Enter district" },
    { label: "State", name: "state", placeholder: "Enter state" },
    { label: "Village", name: "village", placeholder: "Village name" },
  ];

  return (
    <div className="ml-64 bg-gray-100 min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Farmer</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* PHOTO UPLOAD */}
          <div>
            <label className="font-medium">Farmer Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full p-2 h-[42px] border rounded-md mt-1"
            />

            {farmer.photo && (
              <img
                src={farmer.photo}
                alt="Farmer"
                className="w-20 h-20 rounded-full mt-2 border object-cover"
              />
            )}
          </div>

          {/* FARMER ID */}
          <div>
            <label className="font-medium">Farmer ID</label>
            <input
              type="text"
              name="farmerId"
              value={farmer.farmerId}
              readOnly
              className="w-full p-2 h-[42px] border rounded-md mt-1 bg-gray-200"
            />
          </div>

          {/* LOOP FIELDS */}
          {inputs.map((field, i) => (
            <div key={i}>
              <label className="font-medium">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={farmer[field.name]}
                onChange={handleChange}
                className="w-full p-2 h-[42px] border rounded-md mt-1"
              />
              {errors[field.name] && (
                <small className="text-red-500">{errors[field.name]}</small>
              )}
            </div>
          ))}

          {/* BUTTONS */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={resetForm}
              className="w-full h-[42px] border border-black text-black rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full h-[42px] bg-black text-white rounded-md hover:bg-gray-800"
            >
              Save
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddFarmer;
