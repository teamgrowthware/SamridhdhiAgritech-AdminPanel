import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function Godown() {
  const columns = ["Serial No.", "Name", "Location", "Manager Name","Capacity","Action"];

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem("godown");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  // Add New Record Coming From AddGodown
  useEffect(() => {
    if (location.state?.newItem) {
      setProduct((prev) => {
        const exists = prev.some(
          (item) => item.RequestId === location.state.newItem.RequestId
        );

        if (!exists) {
          const updated = [...prev, location.state.newItem];
          localStorage.setItem("godown", JSON.stringify(updated));
          return updated;
        }

        return prev;
      });
    }
  }, [location.state]);

  const editproduct = (RequestId) => {
    const item = product.find((i) => i.RequestId === RequestId);
    navigate("/data/godown/add", { state: { editItem: item } });
  };

  const deleteGodown = (RequestId) => {
  const filtered = product.filter((item) => item.RequestId !== RequestId);

  // Auto-fix serial numbers
  const updated = filtered.map((item, index) => ({
    ...item,
    SerialNo: index + 1,
  }));

  setProduct(updated);
  localStorage.setItem("godown", JSON.stringify(updated));
};

const tableData = product.map((item) => ({
  "Serial No.": item.SerialNo,
  Name: item.Name,
  Location: item.Location,
  ManagerName:item.ManagerName,
  Capacity: item.Capacity,

  Action: (
    <div className="flex gap-3 justify-center">
      
      {/* View / Edit */}
      <button
        className="text-green-500"
        onClick={() => editproduct(item.RequestId)}
      >
       <i className="fa-solid fa-pen-to-square"></i>
      </button>

      {/* Delete */}
      <button
        className="text-red-500"
        onClick={() => deleteGodown(item.RequestId)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  ),
}));


  return (
    <div className="ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">Godown List</h1>

        <div className="flex gap-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>

          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/data/godown/add")}
          >
            + Add Godown
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">No godown added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Godown;