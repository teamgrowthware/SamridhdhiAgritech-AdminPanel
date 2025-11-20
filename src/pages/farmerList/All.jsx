import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";
import TableLayout from "../layout/TableLayout";

function All() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("farmers")) || [];
    setStocks(data);
  }, []);

  const columns = [
    "Farmer ID",
    "Farmer Name",
    "Contact",
    "Village",
    "Tehsil",
    "District",
    "Status",
    "Action",
  ];

  const [selectedRow, setSelectedRow] = useState(null);
  const [openSmall, setOpenSmall] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  const openSmallPopup = (e, rowData) => {
    const rect = e.target.getBoundingClientRect();
    setSelectedRow(rowData);
    setPopupPos({ top: rect.bottom + 6, left: rect.left - 150 });
    setOpenSmall(true);
  };

  const [openBig, setOpenBig] = useState(false);
  const [bigPopupTitle, setBigPopupTitle] = useState("");

  const modifiedStocks = stocks.map((item) => ({
    "Farmer ID": item.farmerId || "—",
    "Farmer Name": item.name,
    Contact: item.contact,
    Village: item.village,
    Tehsil: item.tehsil,
    District: item.district,
    Status: "Active",

    Action: (
      <div className="flex gap-3 justify-center">
        <button className="text-green-500">
          <i className="fa-solid fa-eye"></i>
        </button>

      </div>
    ),
  }));

  return (
    <>
      <div className="ml-64 bg-gray-100 min-h-screen ">
        <div className="flex justify-between items-center p-4">
          <h1 className="mt-5 text-2xl font-semibold">All Farmers</h1>

          <div className="flex gap-3 mt-2">
            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold">
              <i className="fa-solid fa-filter mr-1"></i> Filter
            </NavLink>

            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold">
              <i className="fa-solid fa-gear mr-1"></i> Settings
            </NavLink>

            <NavLink
              to="/farmer/all/addfarmer"
              className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-3 px-3 py-2 rounded-lg font-semibold "
            >
              <i className="fa-solid fa-plus"></i> Add Farmer
            </NavLink>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto mt-1">
          <TableLayout columns={columns} data={modifiedStocks} />
        </div>
      </div>

      {openSmall && (
        <div onClick={() => setOpenSmall(false)} className="fixed inset-0 z-40">
          <div
            className="absolute bg-white shadow-md rounded-lg w-56 p-3 border flex flex-col gap-2"
            style={{ top: popupPos.top, left: popupPos.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="border p-2 rounded hover:bg-gray-100 whitespace-nowrap"
              onClick={() => {
                setBigPopupTitle("Convert to Cancel");
                setOpenBig(true);
                setOpenSmall(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i> Convert to Cancel
            </button>

            <button
              className="border p-2 rounded hover:bg-gray-100 whitespace-nowrap"
              onClick={() => {
                setBigPopupTitle("Convert to Return");
                setOpenBig(true);
                setOpenSmall(false);
              }}
            >
              <i className="fa-solid fa-undo"></i> Convert to Return
            </button>
          </div>
        </div>
      )}

      {openBig && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-[350px] rounded-2xl shadow-xl">
            <p className="text-xl font-bold text-center">{bigPopupTitle}</p>
            <p className="mt-4 text-lg font-semibold text-gray-800 ml-5">
              Are you sure?
            </p>

            <div className="flex justify-evenly mt-6">
              <button
                onClick={() => setOpenBig(false)}
                className="px-10 py-2 rounded-lg border border-gray-700 text-gray-800 hover:bg-gray-800 hover:text-white transition-all"
              >
                Cancel
              </button>

              <button
                className="px-10 py-2 rounded-lg bg-gray-900 text-white hover:bg-white hover:text-black hover:border-gray-900 border transition-all"
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

export default All;
