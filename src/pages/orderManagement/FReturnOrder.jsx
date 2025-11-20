import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TableLayout from "../layout/TableLayout";
import jsPDF from "jspdf";

function FReturnOrder() {
  // ---------------------------
  // DEFAULT DUMMY DATA (Easily replace with API)
  // ---------------------------
  const defaultData = [
    {
      farmerId: "FM001",
      returnId: "#1234564",
      farmerName: "Ramesh",
      contact: "9876543210",
      employee: "Vikas Singh",
      manager: "Rahul",
      amount: "₹2,500",
    },
  ];

  const columns = [
    "Farmer ID",
    "Return ID",
    "Farmer Name",
    "Contact",
    "Employee",
    "Manager",
    "Amount",
    "Action",
  ];

  const [stocks, setStocks] = useState(defaultData);

  // ---------------------------
  // SMALL POPUP
  // ---------------------------
  const [openSmall, setOpenSmall] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  const openSmallPopup = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPos({ top: rect.bottom + 6, left: rect.left - 120 });
    setOpenSmall(true);
  };

  // ---------------------------
  // PDF DOWNLOAD
  // ---------------------------
  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Return Order Invoice", 20, 20);
    pdf.save("return-order.pdf");
    setOpenSmall(false);
  };

  // ---------------------------
  // TABLE MAPPING
  // ---------------------------
  const modifiedStocks = stocks.map((item) => ({
    "Farmer ID": item.farmerId,
    "Return ID": item.returnId,
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
          onClick={openSmallPopup}
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
          <h1 className="mt-5 text-2xl font-semibold">Farmer Return Order</h1>

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

      {/* SMALL POPUP (below three-dot) */}
      {openSmall && (
        <div
          onClick={() => setOpenSmall(false)}
          className="fixed inset-0 z-40"
        >
          <div
            className="absolute bg-white shadow-md rounded-lg w-48 p-3 border flex flex-col gap-2"
            style={{ top: popupPos.top, left: popupPos.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="border p-2 rounded hover:bg-gray-100 ">
             <i class="fa-solid fa-rotate-right"></i> Re-order
            </button>

            <button
              onClick={downloadPDF}
              className="border p-2 rounded hover:bg-gray-100"
            >
             <i class="fa-solid fa-file-arrow-down"></i> Download PDF
            </button>

            <button className="border p-2 rounded hover:bg-gray-100">
             <i class="fa-solid fa-box-open"></i> Product Received
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FReturnOrder;
