import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const AddManage = () => {
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

  const validate = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const pinRegex = /^\d{6}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father name required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Valid phone required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.designation.trim()) newErrors.designation = "Designation required";
    if (!formData.joinDate) newErrors.joinDate = "Joining date required";
    if (!formData.dob) newErrors.dob = "Date of birth required";
    if (!formData.Nominee.trim()) newErrors.Nominee = "Nominee required";

    if (!formData.state) newErrors.state = "State required";
    if (!formData.district) newErrors.district = "District required";
    if (!formData.tehsil) newErrors.tehsil = "Tehsil required";
    if (!formData.city.trim()) newErrors.city = "City required";
    if (!pinRegex.test(formData.pincode))
      newErrors.pincode = "Valid 6-digit pincode required";
    if (!formData.address.trim()) newErrors.address = "Address required";

    if (!formData.accountHolderName.trim())
      newErrors.accountHolderName = "Account Holder Name required";
    if (!formData.bankName.trim()) newErrors.bankName = "Bank Name required";
    if (!formData.branch.trim()) newErrors.branch = "Branch required";
    if (!formData.accountNumber.trim())
      newErrors.accountNumber = "Account Number required";
    if (!formData.ifsc.trim()) newErrors.ifsc = "IFSC required";
    if (!formData.UPIID.trim()) newErrors.UPIID = "UPI ID required";

    if (!formData.passbook) newErrors.passbook = "Passbook PDF required";
    if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar PDF required";
    if (!formData.pan) newErrors.pan = "PAN PDF required";
    if (!formData.marksheet) newErrors.marksheet = "Marksheet PDF required";
    if (!formData.profilePic) newErrors.profilePic = "Profile Photo required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { profilePic, aadhaar, passbook, marksheet, pan, ...cleanData } =
      formData;

    const saved = JSON.parse(localStorage.getItem("manager")) || [];
   const newId = `M-${String(saved.length + 1).padStart(4, "0")}`;

    saved.push({ id: newId, ...cleanData });
    localStorage.setItem("manager", JSON.stringify(saved));

    navigate("/employees/manage");
  };

  return (
    <div className="max-w-6xl ml-80 bg-white shadow-lg rounded-2xl p-8 mt-8 mb-10 mr-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex justify-center">
        Add Manager
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <File label="Upload Your Photo" name="profilePic" onChange={handleChange} error={errors.profilePic} />

        <SectionTitle title="Personal Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="name" label="Name" value={formData.name} onChange={handleChange} error={errors.name} />
          <Input name="fatherName" label="Father Name" value={formData.fatherName} onChange={handleChange} error={errors.fatherName} />
          <Input name="phone" label="Phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
          <Input name="email" label="Email" value={formData.email} onChange={handleChange} error={errors.email} />
          <Input name="whatsapp" label="WhatsApp Number" value={formData.whatsapp} onChange={handleChange} />
          <Input name="designation" label="Designation" value={formData.designation} onChange={handleChange} error={errors.designation} />
          <Input type="date" name="joinDate" label="Joining Date" value={formData.joinDate} onChange={handleChange} error={errors.joinDate} />
          <Input type="date" name="dob" label="Date of Birth" value={formData.dob} onChange={handleChange} error={errors.dob} />
          <Input name="Nominee" label="Nominee" value={formData.Nominee} onChange={handleChange} error={errors.Nominee} />
        </div>

        <SectionTitle title="Address Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select label="State" name="state" value={formData.state} onChange={handleChange} options={Object.keys(locationData)} error={errors.state} />
          <Select label="District" name="district" value={formData.district} onChange={handleChange} options={districts} disabled={!formData.state} error={errors.district} />
          <Select label="Tehsil" name="tehsil" value={formData.tehsil} onChange={handleChange} options={tehsils} disabled={!formData.district} error={errors.tehsil} />
          <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
          <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
        </div>

        <SectionTitle title="Bank Details" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} error={errors.accountHolderName} />
          <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} error={errors.bankName} />
          <Input label="Branch" name="branch" value={formData.branch} onChange={handleChange} error={errors.branch} />
          <Input label="IFSC" name="ifsc" value={formData.ifsc} onChange={handleChange} error={errors.ifsc} />
          <Input label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} error={errors.accountNumber} />
          <Input label="UPI ID" name="UPIID" value={formData.UPIID} onChange={handleChange} error={errors.UPIID} />
          <File label="Passbook (PDF)" name="passbook" onChange={handleChange} error={errors.passbook} />
        </div>

        <SectionTitle title="Document Uploads" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <File label="Aadhaar Card (PDF)" name="aadhaar" onChange={handleChange} error={errors.aadhaar} />
          <File label="Marksheet (PDF)" name="marksheet" onChange={handleChange} error={errors.marksheet} />
          <File label="PAN Card (PDF)" name="pan" onChange={handleChange} error={errors.pan} />
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="px-5 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

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
      className={`border p-2 rounded w-full ${error ? "border-red-500" : "border-gray-300"}`}
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
      className={`border p-2 rounded w-full ${error ? "border-red-500" : "border-gray-300"} ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
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

const File = ({ label, name, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="file"
      name={name}
      accept=".pdf, image/*"
      onChange={onChange}
      className={`border p-2 rounded w-full ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default AddManage;
