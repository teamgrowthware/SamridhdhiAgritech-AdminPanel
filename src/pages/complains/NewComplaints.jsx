import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function NewComplaints() {
  const columns = [
    "Complaint ID",
    "Farmer ID",
    "Farmer Name",
    "Complaint For",
    "Date",
    "Handler Name",
    "Action",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem("complaints");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  // Add New Record Coming From AddCrop
  useEffect(() => {
  if (location.state?.newItem) {
    setProduct((prev) => {
      const exists = prev.some(
        (item) => item.RequestId === location.state.newItem.RequestId
      );

      if (!exists) {
        const updated = [...prev, location.state.newItem];
        localStorage.setItem("complaints", JSON.stringify(updated));
        return updated;
      }

      return prev; // already added
    });
  }
}, [location.state]);


  const editproduct = (RequestId) => {
    const item = product.find((i) => i.RequestId === RequestId);
    navigate("/complains/new/addnewcomplaints", { state: { editItem: item } });
  };

  // Prepare Table Data
  const tableData = product.map((item) => ({
    "Complaint ID": item.ComplaintID,
    "Farmer ID": item.FarmerID,
    "Farmer Name": item.FarmerName,
    "Complaint For": item.ComplaintFor,
    "Date":item.Date,
    "Handler Name":item.HandlerName,
    Action: (
      <div className="flex gap-3 justify-center">
        <button
          className="text-green-500"
          onClick={() => editproduct(item.RequestId)}
        >
          <i className="fa-solid fa-eye"></i>
        </button>

        <div className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer">
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <div className="lg:ml-64  min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">New Complaints List</h1>

        <div className="flex gap-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>

          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/complains/new/addnewcomplaints")}
          >
            + Add New Complaints
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">No complaints added yet.</p>
        )}
      </div>
    </div>
  );
}

export default NewComplaints;
