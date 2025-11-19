import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";
import TableLayout from "../layout/TableLayout";

function ECenceledOrder() {
  const defaultData = [
    {
      orderId: "#jan4345",
      farmerId: "#1234564",
      farmerName: "Ramesh",
      contact: "9876543210",
      employee: "Vikas Singh",
      manager: "Rahul",
      amount: "₹2,500",
    },
  ];

  const columns = [
    "Order ID",
    "Farmer ID",
    "Farmer Name",
    "Contact",
    "Employee",
    "Manager",
    "Amount",
    "Action",
  ];

  const [stocks] = useState(defaultData);

  // Save CURRENT SELECTED ROW DATA
  const [selectedRow, setSelectedRow] = useState(null);

  // SMALL POPUP
  const [openSmall, setOpenSmall] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  const openSmallPopup = (e, rowData) => {
    const rect = e.target.getBoundingClientRect();
    setSelectedRow(rowData); // store row data

    setPopupPos({ top: rect.bottom + 6, left: rect.left - 140 });
    setOpenSmall(true);
  };

  // BIG POPUP (CONFIRMATION)
  const [openBig, setOpenBig] = useState(false);
  const [bigPopupTitle, setBigPopupTitle] = useState("");

  // PDF DOWNLOAD
  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Return Order Invoice", 20, 20);
    pdf.save("return-order.pdf");
  };

  // TABLE ROWS
  const modifiedStocks = stocks.map((item) => ({
    "Order ID": item.orderId,
    "Farmer ID": item.farmerId,
    "Farmer Name": item.farmerName,
    Contact: item.contact,
    Employee: item.employee,
    Manager: item.manager,
    Amount: item.amount,
    Action: (
      <div className="flex gap-3 justify-center">
        <button className="text-green-500">
          <i className="fa-solid fa-eye"></i>
        </button>

        <div
          onClick={(e) => openSmallPopup(e, item)} // PASS ROW DATA
          className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <div className="ml-64 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center p-4">
          <h1 className="mt-5 text-2xl font-semibold">Employee Canceled Order</h1>

          <div className="flex gap-3 mt-2">
            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 mb-1 px-3 py-2 rounded-lg font-semibold">
              <i className="fa-solid fa-filter mr-1"></i> Filter
            </NavLink>

            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 mb-1 px-3 py-2 rounded-lg font-semibold">
              <i className="fa-solid fa-gear mr-1"></i> Settings
            </NavLink>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto mt-1">
          <TableLayout columns={columns} data={modifiedStocks} />
        </div>
      </div>

      {/* SMALL POPUP WITH HEADING */}
      {openSmall && (
        <div onClick={() => setOpenSmall(false)} className="fixed inset-0 z-40 mr-3">
          <div
            className="absolute bg-white shadow-md rounded-lg w-56 p-3 border flex flex-col gap-2"
            style={{ top: popupPos.top, left: popupPos.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="border p-2 rounded hover:bg-gray-100"
              onClick={() => {
                setBigPopupTitle("Re-Order");
                setOpenBig(true);
                setOpenSmall(false);
              }}
            >
            <i class="fa-solid fa-rotate-right"></i> Re-Order
            </button>
            <button
              className="border p-2 rounded hover:bg-gray-100"
              onClick={() => {
                downloadPDF();
                setOpenSmall(false);
              }}
            >
            <i class="fa-solid fa-file-arrow-down"></i>  Download PDF
            </button>
          </div>
        </div>
      )}

      {/* BIG CONFIRMATION POPUP (CENTER) */}
      {openBig && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-[360px] rounded-2xl shadow-xl">
            <p className="text-xl font-bold text-center">{bigPopupTitle}</p>

            <p className="mt-4 text-lg font-semibold text-gray-800 ml-5">
              Are you sure?
            </p>

            {/* SHOW SELECTED ROW DATA */}
           

            <div className="flex justify-evenly gap-3 mt-6">
              <button
                onClick={() => setOpenBig(false)}
                className="px-10 py-2 rounded-lg border border-gray-700 text-gray-800 
                hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>

              <button
                className="px-10 py-2 rounded-lg bg-gray-900 text-white 
                hover:bg-white hover:text-black hover:border-gray-900 
                border border-transparent transition-all duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ECenceledOrder;
