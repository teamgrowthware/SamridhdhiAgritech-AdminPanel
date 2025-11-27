import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function Gold() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

useEffect(() => {
    const allFarmers = JSON.parse(localStorage.getItem("farmers")) || [];
    const removed = JSON.parse(localStorage.getItem("new1Removed")) || [];

    const visibleFarmers = allFarmers.filter(
      (f) => !removed.includes(f.farmerId)
    );

    const modified = visibleFarmers.map((f) => ({
      ...f,
      status: f.status || "Active",
    }));

    setStocks(modified);
    setFilteredData(modified);
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

   const hideFromNewPage = (farmer) => {
    const removed = JSON.parse(localStorage.getItem("new1Removed")) || [];
    removed.push(farmer.farmerId);
    localStorage.setItem("new1Removed", JSON.stringify(removed));

    const newList = stocks.filter((f) => f.farmerId !== farmer.farmerId);
    setStocks(newList);
    setFilteredData(newList);
  };

  const moveToDefaulter = (farmer) => {
    const savedDefaulter = JSON.parse(localStorage.getItem("defaulter")) || [];
    savedDefaulter.push(farmer);
    localStorage.setItem("defaulter", JSON.stringify(savedDefaulter));

    hideFromNewPage(farmer);
  };

  // MOVE TO BLOCK
  const moveToBlock = (farmer) => {
    const savedBlock = JSON.parse(localStorage.getItem("block")) || [];
    savedBlock.push(farmer);
    localStorage.setItem("block", JSON.stringify(savedBlock));

    hideFromNewPage(farmer);
  };

  const [filterPopup, setFilterPopup] = useState(false);

  // FILTER STATES
  const [districtFilter, setDistrictFilter] = useState("");
  const [tehsilFilter, setTehsilFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortByName, setSortByName] = useState("");

  // UNIQUE DISTRICTS + TEHSILS
  const districtList = [...new Set(stocks.map((f) => f.district))];
  const tehsilList = [...new Set(stocks.map((f) => f.tehsil))];

  // APPLY FILTERS
  const applyFilters = () => {
    let data = [...stocks];

    if (districtFilter) {
      data = data.filter((f) => f.district === districtFilter);
    }

    if (tehsilFilter) {
      data = data.filter((f) => f.tehsil === tehsilFilter);
    }

    if (statusFilter) {
      data = data.filter((f) => f.status === statusFilter);
    }

    // SORT NAME
    if (sortByName === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortByName === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(data);
    setFilterPopup(false);
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setDistrictFilter("");
    setTehsilFilter("");
    setStatusFilter("");
    setSortByName("");
    setFilteredData(stocks);
    setFilterPopup(false);
    
  };


  const modifiedStocks = filteredData.map((item) => ({
    "Farmer ID": item.farmerId || "—",
    "Farmer Name": item.name,
    Contact: item.contact,
    Village: item.village,
    Tehsil: item.tehsil,
    District: item.district,
    Status: item.status,

    Action: (
      <div className="flex gap-3 justify-center">
        <button className="text-green-500">
          <i className="fa-solid fa-eye"></i>
        </button>

        <div
          onClick={(e) => openSmallPopup(e, item)}
          className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <div className="lg:ml-64  min-h-screen ">
        <div className="flex justify-between items-center p-4">
          <h1 className="mt-5 text-2xl font-semibold">Gold Farmers</h1>

          <div className="flex gap-3 mt-2">
            <NavLink
              onClick={() => setFilterPopup(true)}
              className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold"
            >
              <i className="fa-solid fa-filter mr-1"></i> Filter
            </NavLink>

            <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold">
              <i className="fa-solid fa-gear mr-1"></i> Settings
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
                setBigPopupTitle("Convert To Defaulter");
                setOpenBig(true);
                setOpenSmall(false);
              }}
            >
              <i class="fa-solid fa-arrows-rotate mr-1"></i> Convert To Defaulter
            </button>

            <button
              className="border p-2 rounded hover:bg-gray-100 whitespace-nowrap"
              onClick={() => {
                setBigPopupTitle("Convert To Block");
                setOpenBig(true);
                setOpenSmall(false);
              }}
            >
              <i class="fa-solid fa-arrows-rotate mr-1"></i> Convert To Block
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
              onClick={() => {
                  if (bigPopupTitle === "Convert To Defaulter") {
                    moveToDefaulter(selectedRow);
                  } else if (bigPopupTitle === "Convert To Block") {
                    moveToBlock(selectedRow);
                  }
                  setOpenBig(false);
                }}
               className="px-10 py-2 rounded-lg bg-gray-900 text-white hover:bg-white hover:text-black hover:border-gray-900 border transition-all">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILTER POPUP */}
      {filterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-[350px] rounded-xl p-5 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center">Filters</h2>

            {/* DISTRICT */}
            <label className="font-semibold">District</label>
            <select
              className="border w-full p-2 rounded mt-1"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
            >
              <option value="">All</option>
              {districtList.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* TEHSIL */}
            <label className="font-semibold mt-3 block">Tehsil</label>
            <select
              className="border w-full p-2 rounded mt-1"
              value={tehsilFilter}
              onChange={(e) => setTehsilFilter(e.target.value)}
            >
              <option value="">All</option>
              {tehsilList.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* STATUS */}
            <label className="font-semibold mt-3 block">Status</label>
            <select
              className="border w-full p-2 rounded mt-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Unactive">Unactive</option>
            </select>

            {/* NAME SORT */}
            <label className="font-semibold mt-3 block">Sort by Name</label>
            <select
              className="border w-full p-2 rounded mt-1"
              value={sortByName}
              onChange={(e) => setSortByName(e.target.value)}
            >
              <option value="">None</option>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>

            <div className="flex justify-between mt-5">
              <button
                className="px-14 py-2 bg-gray-300 rounded-lg"
                onClick={clearFilters}
              >
                Clear
              </button>

              <button
                className="px-14 py-2 bg-gray-900 text-white rounded-lg"
                onClick={applyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gold;
