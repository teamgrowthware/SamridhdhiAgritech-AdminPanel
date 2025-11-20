import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// State, District, Tehsil data (sample data)
const locationData = {
  "Madhya Pradesh": {
    Indore: ["Indore Tehsil", "Mhow", "Depalpur"],
    Bhopal: ["Huzur", "Berasia"],
  },
  Maharashtra: {
    Pune: ["Haveli", "Mulshi"],
    Mumbai: ["Andheri", "Bandra", "Borivali"],
  },
};

const AddAreaManager = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
    whatsapp: "",
    designation: "",
    joinDate: "",
    dob: "",
    Nominee: "",
    state: "",
    district: "",
    tehsil: "",
    city: "",
    pincode: "",
    address: "",
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    UPIID: "",
    branch: "",
    aadhaar: null,
    pan: null,
    passbook: null,
    profilePic: null,
    marksheet: null,
  });

  const [errors, setErrors] = useState({});

  const districts = formData.state ? Object.keys(locationData[formData.state]) : [];
  const tehsils =
    formData.state && formData.district
      ? locationData[formData.state][formData.district]
      : [];

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      if (name === "state") {
        setFormData({ ...formData, state: value, district: "", tehsil: "" });
      } else if (name === "district") {
        setFormData({ ...formData, district: value, tehsil: "" });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };
  useEffect(() => {
  const edit = JSON.parse(localStorage.getItem("areamanager"));
  if (edit) {
    setFormData(edit);
  }
}, []);

  // Validation
  const validate = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const pinRegex = /^\d{6}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father name required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Valid phone required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Valid email required";

    if (!formData.designation.trim())
      newErrors.designation = "Designation required";

    if (!formData.joinDate) newErrors.joinDate = "Join date required";
    if (!formData.dob) newErrors.dob = "Date of birth required";
    if (!formData.Nominee.trim()) newErrors.Nominee = "Nominee name required";

    if (!formData.state) newErrors.state = "State required";
    if (!formData.district) newErrors.district = "District required";
    if (!formData.tehsil) newErrors.tehsil = "Tehsil required";

    if (!formData.city.trim()) newErrors.city = "City required";
    if (!pinRegex.test(formData.pincode))
      newErrors.pincode = "Valid 6-digit pincode required";
    if (!formData.address.trim()) newErrors.address = "Address required";

    // Bank
    if (!formData.accountHolderName.trim())
      newErrors.accountHolderName = "Account holder name required";
    if (!formData.bankName.trim()) newErrors.bankName = "Bank name required";
    if (!formData.branch.trim()) newErrors.branch = "Branch required";
    if (!formData.accountNumber.trim())
      newErrors.accountNumber = "Account number required";
    if (!formData.ifsc.trim()) newErrors.ifsc = "IFSC required";
    if (!formData.UPIID.trim()) newErrors.UPIID = "UPI ID required";

    // Files
    if (!formData.profilePic) newErrors.profilePic = "Profile photo required";
    if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar PDF required";
    if (!formData.passbook) newErrors.passbook = "Passbook PDF required";
    if (!formData.marksheet) newErrors.marksheet = "Marksheet PDF required";
    if (!formData.pan) newErrors.pan = "PAN card PDF required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
 const handleSubmit = (e) => {
  e.preventDefault();

  if (!validate()) return;

  let saved = JSON.parse(localStorage.getItem("areamanager")) || [];
  const editData = JSON.parse(localStorage.getItem("areamanager"));

  // If editing
  if (editData) {
    saved = saved.map(emp =>
      emp.id === editData.id ? { ...editData, ...formData } : emp
    );
    localStorage.removeItem("areamanager");
  } 
  else {
    const newId = `AM-${String(saved.length + 1).padStart(4, "0")}`;
    saved.push({ id: newId, ...formData });
  }

  localStorage.setItem("areamanager", JSON.stringify(saved));

  navigate(-1);
};


  return (
    <div className="max-w-6xl ml-80 bg-white shadow-lg rounded-2xl p-8 mt-8 mb-10 mr-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex justify-center">
        Add Area Manager
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Photo */}
        <File label="Upload Photo" name="profilePic" onChange={handleChange} error={errors.profilePic} />

        {/* Personal Details */}
        <SectionTitle title="Personal Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
          <Input label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} error={errors.fatherName} />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <Input label="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
          <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} error={errors.designation} />
          <Input type="date" label="Joining Date" name="joinDate" value={formData.joinDate} onChange={handleChange} error={errors.joinDate} />
          <Input type="date" label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} error={errors.dob} />
          <Input label="Nominee" name="Nominee" value={formData.Nominee} onChange={handleChange} error={errors.Nominee} />
        </div>

        {/* Address */}
        <SectionTitle title="Address Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select label="State" name="state" value={formData.state} onChange={handleChange} options={Object.keys(locationData)} error={errors.state} />
          <Select label="District" name="district" value={formData.district} onChange={handleChange} options={districts} disabled={!formData.state} error={errors.district} />
          <Select label="Tehsil" name="tehsil" value={formData.tehsil} onChange={handleChange} options={tehsils} disabled={!formData.district} error={errors.tehsil} />
          <Input label="Village / City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
          <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
        </div>

        {/* Bank */}
        <SectionTitle title="Bank Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} error={errors.accountHolderName} />
          <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} error={errors.bankName} />
          <Input label="Branch" name="branch" value={formData.branch} onChange={handleChange} error={errors.branch} />
          <Input label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange} error={errors.ifsc} />
          <Input label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} error={errors.accountNumber} />
          <Input label="UPI ID" name="UPIID" value={formData.UPIID} onChange={handleChange} error={errors.UPIID} />
          <File label="Passbook (PDF)" name="passbook" onChange={handleChange} error={errors.passbook} />
        </div>

        {/* Documents */}
        <SectionTitle title="Documents" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <File label="Aadhaar (PDF)" name="aadhaar" onChange={handleChange} error={errors.aadhaar} />
          <File label="Marksheet (PDF)" name="marksheet" onChange={handleChange} error={errors.marksheet} />
          <File label="PAN Card (PDF)" name="pan" onChange={handleChange} error={errors.pan} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Components
const SectionTitle = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">{title}</h3>
);

const Input = ({ label, name, type = "text", value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded w-full ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const File = ({ label, name, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="file"
      name={name}
      accept=".pdf, image/*"
      onChange={onChange}
      className={`border p-2 rounded w-full ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const Select = ({ label, name, value, onChange, options, disabled, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border p-2 rounded w-full ${
        error ? "border-red-500" : "border-gray-300"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default AddAreaManager;
