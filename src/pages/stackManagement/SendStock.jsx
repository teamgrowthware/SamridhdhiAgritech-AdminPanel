import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableLayout from "../layout/TableLayout";

function SendStock() {
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
  ];

  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupData, setGroupData] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});

  const navigate = useNavigate();

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

  // *** COMPLETE BUTTON ***
  const markCompleted = (id) => {
    const updated = stocks.map((item) =>
      item.id === id ? { ...item, completed: true } : item
    );

    setStocks(updated);
    localStorage.setItem("sendstock", JSON.stringify(updated));
    toast.success("Order marked as Completed");
  };

  const startRowEdit = (row, index) => {
    if (row.completed) return; // Prevent editing completed rows
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
    localStorage.setItem("sendstock", JSON.stringify(newMain));

    toast.success("Stock updated successfully");
  };

  // *** DELETE BUTTON FOR COMPLETED ROW ***
  const deleteCompletedRow = (id) => {
    let newMain = stocks.filter((item) => item.id !== id);
    let newGroup = groupData.filter((item) => item.id !== id);

    setStocks(newMain);
    setGroupData(newGroup);

    localStorage.setItem("sendstock", JSON.stringify(newMain));

    toast.success("Deleted successfully");
  };

  useEffect(() => {
    const storedSend = JSON.parse(localStorage.getItem("sendstock")) || [];
    setStocks(storedSend);
  }, []);

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
      <div>
        <button
          onClick={() => handleViewMore(item)}
          className="text-black-500 hover:text-black-700"
          title="View"
        >
          <i className="fa-solid fa-ellipsis-vertical text-xl cursor-pointer"></i>
        </button>

        {item.completed ? (
          <span className="ml-2 text-green-600 font-semibold">Completed</span>
        ) : (
          <button
            onClick={() => markCompleted(item.id)}
            className="text-black-500 hover:text-black-700 ml-2"
          >
            Complete
          </button>
        )}
      </div>
    ),
  }));

  return (
    <div className="ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-1">
        <h1 className="mt-5 text-2xl font-semibold">Send Stock</h1>

        <div className="flex gap-3 mb-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] hover:text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {modifiedStocks.length > 0 ? (
          <TableLayout columns={columns} data={modifiedStocks} />
        ) : (
          <p className="text-center text-gray-500 py-6">No stock sent yet.</p>
        )}
      </div>

      {/* ========= VIEW MORE MODAL ========= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto p-2">
          <div className="bg-white p-6 rounded-xl w-full max-w-5xl shadow-lg mt-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                History (Product: {groupData[0]?.Product})
              </h2>
              <button onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-1">S.no</th>
                  <th className="p-1">Expiry</th>
                  <th className="p-1">Godown</th>
                  <th className="p-1">Product Name</th>
                  <th className="p-1">SKU</th>
                  <th className="p-1">Batch Number</th>
                  <th className="p-1">Available Qty</th>
                  <th className="p-1">Edit</th>
                </tr>
              </thead>

              <tbody>
                {groupData.map((data, i) => (
                  <tr key={i} className="text-center">
                    <td className="h-10 align-middle">{i + 1}</td>

                    <td className="h-10 align-middle">
                      {editIndex === i ? (
                        <input
                          type="text"
                          name="ExpiryDate"
                          value={editRowData.ExpiryDate}
                          onChange={handleEditChange}
                          className="w-28"
                        />
                      ) : (
                        data.ExpiryDate
                      )}
                    </td>

                    <td className="h-10 align-middle">
                      {editIndex === i ? (
                        <input
                          name="SelectGodown"
                          value={editRowData.SelectGodown}
                          onChange={handleEditChange}
                          className="w-28"
                        />
                      ) : (
                        data.SelectGodown
                      )}
                    </td>

                    <td className="h-10 align-middle">{data.Product}</td>
                    <td className="h-10 align-middle">{data.SKU}</td>

                    <td className="h-10 align-middle">
                      {editIndex === i ? (
                        <input
                          name="BatchNumber"
                          value={editRowData.BatchNumber}
                          onChange={handleEditChange}
                          className="w-28"
                        />
                      ) : (
                        data.BatchNumber
                      )}
                    </td>

                    <td className="h-10 align-middle">
                      {editIndex === i ? (
                        <input
                          name="NetQuantity"
                          value={editRowData.NetQuantity}
                          onChange={handleEditChange}
                          className="w-28"
                        />
                      ) : (
                        data.NetQuantity
                      )}
                    </td>

                    <td className="h-10 align-middle">
                      {data.completed ? (
                        <button
                          onClick={() => deleteCompletedRow(data.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      ) : editIndex === i ? (
                        <button
                          onClick={saveRowEdit}
                          className="text-green-600 hover:text-green-800"
                        >
                          <i className="fa-solid fa-floppy-disk"></i>
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

export default SendStock;
