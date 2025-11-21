import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function ManageEmployee() {
  const columns = [
    "Manager ID",
    "Manager Name",
    "Contact",
    "Area",
    "Team Size",
    "Target",
    "Designation",
    "Status",
    "Action",
  ];

  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("manager")) || [];
    setManagers(stored);
  }, []);

  // Edit Manager
  const editManager = (id) => {
    const manager = managers.find((item) => item.id === id);
    if (manager) {
      localStorage.setItem("editmanager", JSON.stringify(manager));
      navigate("/employees/manage/addmanage");
    }
  };

  // Table Data Mapping
  const tableData = managers.map((item) => ({
    "Manager ID": item.id,
    "Manager Name": item.name,
    Contact: item.phone,
    Area: item.city,
    "Team Size": "-",
    Target: "-",
    Designation: item.designation,
    Status: (
      <span className="">
        Active
      </span>
    ),
    Action: (
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => editManager(item.id)}
          className="text-blue-600 hover:text-blue-800"
        >
          <i className="fas fa-edit text-lg"></i>
        </button>
      </div>
    ),
  }));

  return (
    <div className="ml-64  min-h-screen">
      <div className="flex justify-between items-center mb-1">
        <h1 className="mt-10 text-2xl font-semibold">Managers </h1>

        <div className="flex gap-3">
          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink
            to="/employees/manage/addmanage"
            className="bg-[#000000] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1]"
          >
            + Add Manager
          </NavLink>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No manager added yet. Click “+ Add Manager” to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageEmployee;
