import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";
import jsPDF from "jspdf";

function Employee() {
  const stock =[ {
          farmerId: "FM001",
          invoice: "INV-9032",
          farmerName: "Ramesh",
          contact: "9876543210",
          employee: "Vikas Singh",
          manager: "Rahul",
          amount: "₹2,500",
        }];
  const columns = [
    "Farmer ID",
    "Invoice No.",
    "Farmer Name",
    "Contact",
    "Employee",
    "Manager",
    "Amount",
    "Action",
  ];

  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  // SMALL POPUP STATES
  const [openSmall, setOpenSmall] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const dotRef = useRef(null);

  // BIG POPUP STATES
  const [openBig, setOpenBig] = useState(false);
  const [popupType, setPopupType] = useState(""); // delivery / reject

  useEffect(() => {
    const storedStocks =
      JSON.parse(localStorage.getItem("newstock")) || [
        {
          farmerId: "FM001",
          invoice: "INV-9032",
          farmerName: "Ramesh",
          contact: "9876543210",
          employee: "Vikas Singh",
          manager: "Rahul",
          amount: "₹2,500",
        },
      ];

    setStocks(storedStocks);
  }, []);

  // ---------------------------
  // THREE DOT POPUP POSITION
  // ---------------------------
  const handleThreeDot = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPos({ top: rect.bottom + 5, left: rect.left - 120 });
    setOpenSmall(true);
  };

  // ---------------------------
  // DOWNLOAD PDF
  // ---------------------------
  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Order Invoice Downloaded", 20, 20);
    pdf.save("order.pdf");
    setOpenSmall(false);
  };

  // ---------------------------
  // OPEN BIG POPUP
  // ---------------------------
  const openBigPopup = (type) => {
    setPopupType(type);
    setOpenSmall(false);
    setOpenBig(true);
  };

  // Table mapping
  const modifiedStocks = stock.map((item, index) => ({
    "Farmer ID": item.farmerId,
    "Invoice No.": item.invoice,
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

        {/* Three Dot Button */}
        <div
          ref={dotRef}
          onClick={handleThreeDot}
          className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <div className="lg:ml-64  min-h-screen">
        <div className="flex justify-between items-center p-4">
          <h1 className="mt-5 text-2xl font-semibold">By Employee Order</h1>

          <div className="flex gap-3">
            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-5 mb-2 px-3 py-2 rounded-lg font-semibold">
              <i className="fa-solid fa-filter mr-1"></i> Filter
            </NavLink>

            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-5 mb-2 px-3 py-2 rounded-lg font-semibold">
              <i className="fa-solid fa-gear mr-1"></i> Settings
            </NavLink>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <TableLayout columns={columns} data={modifiedStocks} />
        </div>
      </div>

      {/* SMALL POPUP (below three dot) */}
      {openSmall && (
        <div
          onClick={() => setOpenSmall(false)}
          className="fixed inset-0 z-40"
        >
          <div
            className="absolute bg-white shadow-md rounded-lg w-48 p-3 border flex gap-2 flex-col"
            style={{
              top: popupPos.top,
              left: popupPos.left,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => openBigPopup("delivery")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded border flex justify-center "
            >
             <i class="fa-solid fa-truck-fast mt-1 mr-1"></i> Out For Delivery
            </button>

            <button
              onClick={downloadPDF}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded border flex justify-center"
            >
             <i class="fa-solid fa-file-arrow-down mt-1 mr-1"></i> Download PDF
            </button>

            <button
              onClick={() => openBigPopup("reject")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded border flex justify-center"
            >
            <i class="fa-solid fa-ban mt-1 mr-1"></i>  Reject Order
            </button>
          </div>
        </div>
      )}

      {/* BIG CENTER POPUP */}
      {openBig && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-xl shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-center ">
                {popupType === "delivery"
                  ? "Out for Delivery"
                  : "Reject Order"}
              </h2>

              <button
                onClick={() => setOpenBig(false)}
                className="text-red-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* DELIVERY POPUP */}
            {popupType === "delivery" && (
              <p className="mt-4">Order is now Out for Delivery.</p>
            )}

            {/* REJECT POPUP */}
            {popupType === "reject" && (
             <>
  <p className="mt-4 text-lg font-semibold text-gray-800 tracking-wide">
    Are you sure?
  </p>

  <div className="flex justify-evenly gap-3 mt-6">
    {/* Cancel Button */}
    <button
      onClick={() => setOpenBig(false)}
      className="px-10 py-2 rounded-lg border border-gray-700 text-gray-800 
                 hover:bg-gray-800 hover:text-white transition-all duration-300"
    >
      Cancel
    </button>

    {/* Save Button */}
    <button
      className="px-10 py-2 rounded-lg bg-gray-900 text-white 
                 hover:bg-white hover:text-black hover:border-gray-900 
                 border border-transparent transition-all duration-300"
    >
      Save
    </button>
  </div>
</>

            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Employee;
