import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function AreaManager() {
  const columns = [
    "AreaManager ID",
    "AreaManager Name",
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

  useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("aream")) || [];
      setManagers(stored);
    }, []);
  

  // Load from localStorage
  // useEffect(() => {
  //   let stored = localStorage.getItem("aream");

  //   try {
  //     stored = JSON.parse(stored);
  //     if (!Array.isArray(stored)) stored = []; // FIXED
  //   } catch {
  //     stored = [];
  //   }

  //   setManagers(stored);
  // }, []);

  // Edit Manager
  const editManager = (id) => {
    const manager = managers.find((item) => item.id === id);
    if (manager) {
      localStorage.setItem("editaream", JSON.stringify(manager));
      navigate("/employee/areamanager/addareamanager");
    }
  };

  // Table Data Mapping
  const tableData = managers.map((item) => ({
    "AreaManager ID": item.id,
    "AreaManager Name": item.name,
    Contact: item.phone,
    Area: item.city,
    "Team Size": "-",
    Target: "-",
    Designation: item.designation,
    Status: <span className="">Active</span>,
    Action: (
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => editManager(item.id)}
          className="text-blue-600 hover:text-blue-800"
        >
          <i className="fas fa-edit text-lg"></i>
        </button>
        <button
          onClick={()=>
            { localStorage.setItem("editaream", JSON.stringify(item));
              navigate("/employees/areamanager/deshboard")}}
          className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </button>
      </div>
    ),
  }));

  return (
    <div className="ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-1">
        <h1 className="mt-10 text-2xl font-semibold">Area Managers</h1>

        <div className="flex gap-3">
          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink
            to="/employee/areamanager/addareamanager"
            className="bg-[#000000] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1]"
          >
            + Add Area Manager
          </NavLink>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No manager added yet. Click “+ Add Area Manager” to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default AreaManager;
