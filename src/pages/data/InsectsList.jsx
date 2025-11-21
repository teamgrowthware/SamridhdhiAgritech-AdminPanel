import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function InsectsList() {
  const columns = [
    "Serial No.",
    "Image",
    "Insect Name",
    "Insect Hindi Name",
    "type",
    "Action",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem("insect");
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
        localStorage.setItem("insect", JSON.stringify(updated));
        return updated;
      }

      return prev; // already added
    });
  }
}, [location.state]);


  const editproduct = (RequestId) => {
    const item = product.find((i) => i.RequestId === RequestId);
    navigate("/data/insects/addinsert", { state: { editItem: item } });
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
    "Insect Name": item.InsectName,
    "Insect Hindi Name": item.InsectHindiName,
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
    <div className="ml-64  min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">Insect List</h1>

        <div className="flex gap-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>

          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/data/insects/addinsert")}
          >
            + Add Insects
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">No insects added yet.</p>
        )}
      </div>
    </div>
  );
}

export default InsectsList;
