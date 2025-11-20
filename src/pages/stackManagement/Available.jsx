import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableLayout from "../layout/TableLayout";

function Available() {
  const columns = [
    "S.no",
    "Product",
    "SKU",
    "Select Godown",
    "Manufacture Cost",
    "Net Quantity",
    "Batch Number",
    "Action",
    "Add Stock",
  ];

  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("newstock")) || [];
    setStocks(storedStocks);
  }, []);

  // Edit stock
  const editStock = (id) => {
    const stockToEdit = stocks.find((item) => item.id === id);
    if (stockToEdit) {
      localStorage.setItem("editnewstock", JSON.stringify(stockToEdit));
      navigate("/stack/available/addstock");
    }
  };

  // Add stock button click
  const handleAddStock = () => {
    navigate("/stack/available/addstock");
  };

  // Table data mapping
  const modifiedStocks = stocks.map((item, index) => ({
    "S.no": index + 1,
    Product: item.Product,
    SKU: item.SKU,
    "Select Godown": item.SelectGodown,
    "Manufacture Cost": item.ManufactureCost,
    "Net Quantity": item.NetQuantity,
    "Batch Number": item.BatchNumber,
    Action: (
      <div className="flex gap-3 justify-center">
        <button
          className="text-blue-600 hover:text-blue-800"
          title="Download Stock"
        >
          <i className="fa-solid fa-download"></i>
        </button>
        <button
          onClick={() => editStock(item.id)}
          className="text-yellow-500 hover:text-yellow-700"
          title="Edit Stock"
        >
          <i className="fas fa-edit text-lg"></i>
        </button>
      </div>
    ),
    "Add Stock": (
      <button
        onClick={handleAddStock}
        className="bg-[#2DD521] text-[#ffffff] px-3 py-1 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
      >
        Add
      </button>
    ),
  }));

  return (
    <div className="ml-64 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-[#EDEDED] rounded border">
        <h1 className="mt-5 text-2xl font-semibold">Available Stock</h1>

        <div className="flex gap-3 mb-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] hover:text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold  hover:bg-[#5e1aa1] transition-all">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>
          <NavLink
            to="/stack/available/addstock"
            className="bg-[#000000] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
          >
            + Add New Stock
          </NavLink>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {modifiedStocks.length > 0 ? (
          <TableLayout columns={columns} data={modifiedStocks} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No stock added yet. Click “+ Add Stock” to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export default Available;
