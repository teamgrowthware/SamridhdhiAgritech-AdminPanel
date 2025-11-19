import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function FungusList() {
  const columns = [
    "Serial No.",
    "Image",
    "Fungus Name",
    "Fungus Hindi Name",
    "type",
    "Action",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem("fungus");
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
        localStorage.setItem("fungus", JSON.stringify(updated));
        return updated;
      }

      return prev; // already added
    });
  }
}, [location.state]);


  const editproduct = (RequestId) => {
    const item = product.find((i) => i.RequestId === RequestId);
    navigate("/data/fungus/addfungus", { state: { editItem: item } });
  };

  // Prepare Table Data
  const tableData = product.map((item) => ({
    "Serial No": item.SerialNo,
    Image: (
      <img
        src={item.Image}
        alt="insects"
        className="w-14 h-14 rounded border object-cover"
      />
    ),
    "Fungus Name": item.FungusName,
    "Fungus Hindi Name": item.FungusHindiName,
    "Type": item.Types,
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
    <div className="ml-64 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">Fungus List</h1>

        <div className="flex gap-2">
          <NavLink className="bg-[#4B0082] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#4B0082] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>

          <button
            className="bg-[#4B0082] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/data/fungus/addfungus")}
          >
            + Add Fungus
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">No fungus added yet.</p>
        )}
      </div>
    </div>
  );
}

export default FungusList;
