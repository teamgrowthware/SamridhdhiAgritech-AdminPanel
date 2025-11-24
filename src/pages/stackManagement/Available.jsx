
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
    "Expiry Date",
    "Action",
    "Add Stock",
  ];

  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("newstock")) || [];
    setStocks(storedStocks);
  }, []);

  // ---------------- SEND BUTTON FUNCTION ----------------
  const handleSendStock = (item) => {
    const storedSend = JSON.parse(localStorage.getItem("sendstock")) || [];

    storedSend.push(item); // Add selected item

    localStorage.setItem("sendstock", JSON.stringify(storedSend));

    toast.success("Stock sent successfully");
    navigate("/stack/send");
  };
  // ------------------------------------------------------

   const editStock = (id) => {
    const stockToEdit = stocks.find((item) => item.id === id);
    if (stockToEdit) {
      localStorage.setItem("editnewstock", JSON.stringify(stockToEdit));
      navigate("/stack/available/addstock");
    }
  };

  const handleAddStock = () => {
    navigate("/stack/available/addstock");
  };

  const handleViewMore = (item) => {
    const matched = stocks.filter(
      (x) =>
        x.Product === item.Product &&
        x.SKU === item.SKU &&
        x.SelectGodown === item.SelectGodown
    );
    setGroupData(matched);
    setShowModal(true);
  };

  const startRowEdit = (row, index) => {
    setEditIndex(index);
    setEditRowData({ ...row });
  };

  const handleEditChange = (e) => {
    setEditRowData({ ...editRowData, [e.target.name]: e.target.value });
  };

  const saveRowEdit = () => {
    let updated = [...groupData];
    updated[editIndex] = { ...editRowData };
    setGroupData(updated);
    setEditIndex(null);

    const newMain = stocks.map((item) =>
      item.id === editRowData.id ? editRowData : item
    );

    setStocks(newMain);
    localStorage.setItem("newstock", JSON.stringify(newMain));
    toast.success("Stock updated successfully");
  };

  const modifiedStocks = stocks.map((item, index) => ({
    "S.no": index + 1,
    Product: item.Product,
    SKU: item.SKU,
    "Select Godown": item.SelectGodown,
    "Manufacture Cost": item.ManufactureCost,
    "Net Quantity": item.NetQuantity,
    "Batch Number": item.BatchNumber,
    "Expiry Date": item.ExpiryDate,

    Action: (
      <div className="flex gap-2 justify-center">
        <button
          className="text-black-600 hover:text-black-800"
          title="Download Stock"
        >
          <i className="fa-solid fa-download"></i>
        </button>
        <button
          onClick={() => handleViewMore(item)}
          className="text-black-500 hover:text-black-700"
          title="View & Edit"
        >
          <i className="fa-solid fa-ellipsis-vertical text-xl cursor-pointer"></i>
        </button>
      </div>
    ),

    "Add Stock": (
      <div className="flex flex-row gap-3">
        <button
          onClick={handleAddStock}
          className="bg-[#2DD521] text-[#ffffff] px-3 py-1 rounded-lg font-semibold"
        >
          Add
        </button>

        {/*SEND BUTTON (New) */}
        <button
          onClick={() => handleSendStock(item)}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold"
        >
          Send
        </button>
      </div>
    ),
  }));

  return (
    <div className="ml-64 min-h-screen">
      <div className="flex justify-between items-center ">
        <h1 className="mt-5 text-2xl font-semibold">Available Stock</h1>
        <div className="flex gap-3 mb-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] hover:text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink
            to="/stack/available/addstock"
            className="bg-black text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
          >
            + Add New Stock
          </NavLink>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto ">
        {modifiedStocks.length > 0 ? (
          <TableLayout columns={columns} data={modifiedStocks} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No stock added yet. Click “+ Add Stock”.
          </p>
        )}
      </div>

       {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto p-2">
    <div className="bg-[#E2E2E2] p-6 rounded-xl w-full max-w-5xl shadow-lg mt-10 mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          History 
        </h2>
        <button onClick={() => setShowModal(false)}>
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-[#393636] text-[#FFFFFF] text-center">
            <th className="p-1 ">S.no</th>
            <th className="p-1 ">Expiry</th>
            <th className="p-1 ">Godown</th>
            <th className="p-1 ">Product Name</th>
            <th className="p-1 ">SKU</th>
            <th className="p-1 ">Batch Number</th>
            <th className="p-1">Manufactury Cost</th>
            <th className="p-1 ">Available Qty</th>
            <th className="p-1 ">Edit</th>
          </tr>
        </thead>

        <tbody>
          {groupData.map((data, i) => (
            <tr key={i} className="text-center">
              <td className=" h-10 align-middle">{i + 1}</td>

              <td className=" h-10 align-middle">
                {editIndex === i ? (
                  <input
                    type="text"
                    name="ExpiryDate"
                    value={editRowData.ExpiryDate}
                    onChange={handleEditChange}
                  className="w-28 text-center"
                  />
                ) : (
                  data.ExpiryDate
                )}
              </td>

              <td className=" h-10 align-middle">
                {editIndex === i ? (
                  <input
                    name="SelectGodown"
                    value={editRowData.SelectGodown}
                    onChange={handleEditChange}
                    className="w-28 text-center"
                  />
                ) : (
                  data.SelectGodown
                )}
              </td>

              <td className=" h-10 align-middle">{data.Product}</td>
              <td className=" h-10 align-middle">{data.SKU}</td>

              <td className=" h-10 align-middle">
                {editIndex === i ? (
                  <input
                    name="BatchNumber"
                    value={editRowData.BatchNumber}
                    onChange={handleEditChange}
                    className="w-28 text-center"
                  />
                ) : (
                  data.BatchNumber
                )}
              </td>

              <td className=" h-10 align-middle">
                {editIndex === i ? (
                  <input
                    name="ManufactureCost"
                    value={editRowData.ManufactureCost}
                    onChange={handleEditChange}
                   className="w-28 text-center"
                  />
                ) : (
                  data.ManufactureCost
                )}
              </td>

              <td className=" h-10 align-middle">
                {editIndex === i ? (
                  <input
                    name="NetQuantity"
                    value={editRowData.NetQuantity}
                    onChange={handleEditChange}
                   className="w-28 text-center "
                  />
                ) : (
                  data.NetQuantity
                )}
              </td>

              <td className=" h-10 align-middle">
                {editIndex === i ? (
                  <button
                    onClick={saveRowEdit}
                    className="text-green-600 hover:text-green-800"
                  >
                  <i className="fa-solid fa-floppy-disk "></i>
                  </button>
                ) : (
                  <button
                    onClick={() => startRowEdit(data, i)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
)}
    </div>
  );
}

export default Available;

