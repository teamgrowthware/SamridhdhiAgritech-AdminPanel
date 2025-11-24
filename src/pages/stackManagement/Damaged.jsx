import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableLayout from "../layout/TableLayout";

function Damaged() {
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

  // Load damaged stock
  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("damagedstock")) || [];
    setStocks(storedStocks);
  }, []);

  // Edit main damaged stock
  const editStock = (id) => {
    const stockToEdit = stocks.find((item) => item.id === id);
    if (stockToEdit) {
      localStorage.setItem("editdamagedstock", JSON.stringify(stockToEdit));
      navigate("/stack/damaged/adddamaged");
    }
  };

  // Add Damaged Stock Button
  const handleAddStock = () => {
    navigate("/stack/damaged/adddamaged");
  };

  // View More → Open History Modal
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

  // Start Editing a row in modal
  const startRowEdit = (row, index) => {
    setEditIndex(index);
    setEditRowData({ ...row });
  };

  // Track changes in input fields
  const handleEditChange = (e) => {
    setEditRowData({ ...editRowData, [e.target.name]: e.target.value });
  };

  // Save edited row
  const saveRowEdit = () => {
    let updated = [...groupData];
    updated[editIndex] = { ...editRowData };

    setGroupData(updated);
    setEditIndex(null);

    // Update main stock list
    const newMain = stocks.map((item) =>
      item.id === editRowData.id ? editRowData : item
    );

    setStocks(newMain);
    localStorage.setItem("damagedstock", JSON.stringify(newMain));

    toast.success("Stock updated successfully");
  };

  // Table Mapping
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
      <div className="flex gap-3">
        <button
          onClick={handleAddStock}
          className="bg-[#2DD521] text-white px-3 py-1 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
        >
          Add
        </button>

        <button
  onClick={() => {
    // 1. Remove from damaged stock
    let damaged = JSON.parse(localStorage.getItem("damagedstock")) || [];
    const updatedDamaged = damaged.filter((x) => x.id !== item.id);
    localStorage.setItem("damagedstock", JSON.stringify(updatedDamaged));

    // 2. Add to available stock
    let available = JSON.parse(localStorage.getItem("newstock")) || [];

    // 3. Check if same Batch/Product/SKU exists in available
    const index = available.findIndex(
      (x) =>
        x.Product === item.Product &&
        x.SKU === item.SKU &&
        x.BatchNumber === item.BatchNumber &&
        x.SelectGodown === item.SelectGodown
    );

    if (index !== -1) {
      // 4. Merge Quantity
      available[index].NetQuantity =
        Number(available[index].NetQuantity) + Number(item.NetQuantity);
    } else {
      // 5. Add new item
      available.push(item);
    }

    localStorage.setItem("newstock", JSON.stringify(available));
   
    toast.success("Re-Packing successful! Moved to Available Stock");
     navigate("/stack/available");
  }}
  className="bg-[#2DD521] text-white px-3 py-1 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
>
  Re-Packing
</button>

      </div>
    ),
  }));

  return (
    <div className="ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-1">
        <h1 className="mt-5 text-2xl font-semibold">Damaged Stock</h1>

        <div className="flex gap-3 mb-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] hover:text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink
            to="/stack/damaged/adddamaged"
            className="bg-black text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
          >
            + Add Damaged Stock
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

      {/* ---------- VIEW MORE (HISTORY) MODAL ---------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto p-2">
          <div className="bg-white p-6 rounded-xl w-full max-w-5xl shadow-lg mt-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">History</h2>
              <button onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-[#393636] text-white text-center">
                  <th className="p-1">S.no</th>
                  <th className="p-1">Expiry</th>
                  <th className="p-1">Godown</th>
                  <th className="p-1">Product</th>
                  <th className="p-1">SKU</th>
                  <th className="p-1">Batch No</th>
                  <th className="p-1">Qty</th>
                  <th className="p-1">Edit</th>
                </tr>
              </thead>

              <tbody>
                {groupData.map((data, i) => (
                  <tr key={i} className="text-center">
                    <td className="h-10 align-middle">{i + 1}</td>

                    {/* Expiry */}
                    <td className="h-10 align-middle">
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

                    {/* Godown */}
                    <td className="h-10 align-middle">
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

                    {/* Product */}
                    <td className="h-10 align-middle">{data.Product}</td>

                    {/* SKU */}
                    <td className="h-10 align-middle">{data.SKU}</td>

                    {/* Batch */}
                    <td className="h-10 align-middle">
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

                    {/* Quantity */}
                    <td className="h-10 align-middle">
                      {editIndex === i ? (
                        <input
                          name="NetQuantity"
                          value={editRowData.NetQuantity}
                          onChange={handleEditChange}
                          className="w-28 text-center"
                        />
                      ) : (
                        data.NetQuantity
                      )}
                    </td>

                    {/* Edit/Save */}
                    <td className="h-10 align-middle">
                      {editIndex === i ? (
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

export default Damaged;
