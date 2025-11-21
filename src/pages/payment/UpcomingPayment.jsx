import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";
import TableLayout from "../layout/TableLayout";

function UpcomingPayment() {
  // Default dummy farmers data (No LocalStorage)
  const defaultFarmers = [
    {
      farmerId: "#F001",
      name: "Ramesh",
      contact: "9876543210",
      invoice: "INV-001",
      employee: "Vikas Singh",
      remainingAmount: 1200,
    },
    {
      farmerId: "#F002",
      name: "Suresh",
      contact: "9988776655",
      invoice: "INV-002",
      employee: "Mahesh",
      remainingAmount: 800,
    },
  ];

  const [farmers, setFarmers] = useState(defaultFarmers);

  const columns = [
    "Farmer ID",
    "Farmer Name",
    "Contact",
    "Invoice",
    "Employee",
    "Remaining Amt",
    "Days",
    "Action",
  ];

  // Popup States
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [openSmallMenu, setOpenSmallMenu] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const [openBigPopup, setOpenBigPopup] = useState(false);
  const [bigPopupTitle, setBigPopupTitle] = useState("");

  // Open small options popup
  const handleSmallPopupOpen = (event, farmer) => {
    const rect = event.target.getBoundingClientRect();
    setSelectedFarmer(farmer);

    setPopupPosition({
      top: rect.bottom + 6,
      left: rect.left - 150,
    });

    setOpenSmallMenu(true);
  };

  // Data mapping for table
  const formattedFarmers = farmers.map((item) => ({
    "Farmer ID": item.farmerId,
    "Farmer Name": item.name,
    Contact: item.contact,
    Invoice: item.invoice,
    Employee: item.employee,
    "Remaining Amt": item.remainingAmount,
    Days: 15,

    Action: (
      <div className="flex gap-3 justify-center">
        <button className="text-green-500">
          <i className="fa-solid fa-eye"></i>
        </button>

        {/* Three-dot menu */}
        <div
          onClick={(e) => handleSmallPopupOpen(e, item)}
          className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <div className="ml-64  min-h-screen">
        <div className="flex justify-between items-center p-4">
          <h1 className="mt-5 text-2xl font-semibold">Upcoming Payment</h1>

          <div className="flex gap-3 mt-2">
            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold">
                          <i className="fa-solid fa-filter mr-1"></i> Filter
                        </NavLink>
            
                        <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold">
                          <i className="fa-solid fa-gear mr-1"></i> Settings
                        </NavLink>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto mt-1">
          <TableLayout columns={columns} data={formattedFarmers} />
        </div>
      </div>

      {/* 🔹 Small popup menu */}
      {openSmallMenu && (
        <div
          onClick={() => setOpenSmallMenu(false)}
          className="fixed inset-0 z-40"
        >
          <div
            className="absolute bg-white shadow-md rounded-lg w-56 p-3 border flex flex-col gap-2"
            style={{ top: popupPosition.top, left: popupPosition.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="border p-2 rounded hover:bg-gray-100 whitespace-nowrap"
              onClick={() => {
                setBigPopupTitle("Received");
                setOpenBigPopup(true);
                setOpenSmallMenu(false);
              }}
            >
              <i className="fa-solid fa-money-bill-transfer mr-1"></i> Received
            </button>

            <button
              className="border p-2 rounded hover:bg-gray-100 whitespace-nowrap"
              onClick={() => {
                setBigPopupTitle("Loss");
                setOpenBigPopup(true);
                setOpenSmallMenu(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i> Loss
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Big popup (close on outside click) */}
      {openBigPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setOpenBigPopup(false)} // <-- OUTSIDE CLICK CLOSE
        >
          <div
            className="bg-white p-4 w-[260px] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing on popup click
          >
            <h3 className="text-center font-semibold mb-2">{bigPopupTitle}</h3>

            <input
              type="text"
              name="amount"
              placeholder="Enter Amount"
              className="w-full border px-3 py-2 rounded mb-3 outline-none text-sm"
            />

            <button className="w-full px-3 py-2 rounded bg-gray-900 text-white text-sm hover:bg-white hover:text-black hover:border-gray-900 border transition-all">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UpcomingPayment;
