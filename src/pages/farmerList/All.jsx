// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import TableLayout from "../layout/TableLayout";

// function All() {
//   const [stocks, setStocks] = useState([]);
//   const [filteredStocks, setFilteredStocks] = useState([]);

//   const [showFilter, setShowFilter] = useState(false);

//   const [filterValues, setFilterValues] = useState({
//     district: "",
//     tehsil: "",
//     status: "",
//     sort: ""     // ⭐ NEW FIELD
//   });

//   // LOAD FARMERS
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("farmers")) || [];

//     // add default status = Active
//     const updated = data.map((f) => ({
//       ...f,
//       status: f.status || "Active",
//     }));

//     setStocks(updated);
//     setFilteredStocks(updated);

//     localStorage.setItem("farmers", JSON.stringify(updated));
//   }, []);

//   // unique district list
//   const districts = [...new Set(stocks.map((f) => f.district))];

//   // unique tehsil list
//   const tehsils = [...new Set(stocks.map((f) => f.tehsil))];

//   // FILTER APPLY FUNCTION
//   const applyFilter = () => {
//     let result = [...stocks];

//     if (filterValues.district)
//       result = result.filter((f) => f.district === filterValues.district);

//     if (filterValues.tehsil)
//       result = result.filter((f) => f.tehsil === filterValues.tehsil);

//     if (filterValues.status)
//       result = result.filter((f) => f.status === filterValues.status);

//     // ⭐ NAME SORTING LOGIC
//     if (filterValues.sort === "asc") {
//       result.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (filterValues.sort === "desc") {
//       result.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     setFilteredStocks(result);
//     setShowFilter(false);
//   };

//   // CLEAR FILTERS
//   const clearFilter = () => {
//     setFilterValues({ district: "", tehsil: "", status: "", sort: "" });
//     setFilteredStocks(stocks);
//     setShowFilter(false);
//   };

//   // TOGGLE STATUS ACTIVE <-> UNACTIVE
//   const toggleStatus = (farmerId) => {
//     const updated = stocks.map((f) =>
//       f.farmerId === farmerId
//         ? { ...f, status: f.status === "Active" ? "Unactive" : "Active" }
//         : f
//     );

//     setStocks(updated);
//     setFilteredStocks(updated);
//     localStorage.setItem("farmers", JSON.stringify(updated));
//   };

//   const columns = [
//     "Farmer ID",
//     "Farmer Name",
//     "Contact",
//     "Village",
//     "Tehsil",
//     "District",
//     "Status",
//     "Action",
//   ];

//   const modifiedStocks = filteredStocks.map((item) => ({
//     "Farmer ID": item.farmerId || "—",
//     "Farmer Name": item.name,
//     Contact: item.contact,
//     Village: item.village,
//     Tehsil: item.tehsil,
//     District: item.district,

//     Status: (
//       <button
//         className={`px-3 py-1 rounded-lg text-white ${
//           item.status === "Active" ? "bg-green-600" : "bg-red-600"
//         }`}
//         onClick={() => toggleStatus(item.farmerId)}
//       >
//         {item.status}
//       </button>
//     ),

//     Action: (
//       <div className="flex gap-3 justify-center">
//         <button className="text-green-500">
//           <i className="fa-solid fa-eye"></i>
//         </button>
//       </div>
//     ),
//   }));

//   return (
//     <>
//       <div className="ml-64  min-h-screen ">
//         <div className="flex justify-between items-center p-4">
//           <h1 className="mt-5 text-2xl font-semibold">All Farmers</h1>

//           <div className="flex gap-3 mt-2">
//             <button
//               onClick={() => setShowFilter(true)}
//               className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold"
//             >
//               <i className="fa-solid fa-filter mr-1"></i> Filter
//             </button>

//             <NavLink className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold">
//               <i className="fa-solid fa-gear mr-1"></i> Settings
//             </NavLink>

//             <NavLink
//               to="/farmer/all/addfarmer"
//               className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-3 px-3 py-2 rounded-lg font-semibold "
//             >
//               <i className="fa-solid fa-plus"></i> Add Farmer
//             </NavLink>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-x-auto mt-1">
//           <TableLayout columns={columns} data={modifiedStocks} />
//         </div>
//       </div>

//       {/* FILTER POPUP */}
//       {showFilter && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 w-[400px] rounded-2xl shadow-xl">

//             <h2 className="text-xl font-semibold text-center mb-4">
//               Filter Farmers
//             </h2>

//             {/* District */}
//             <label className="font-semibold">District</label>
//             <select
//               className="w-full border p-2 rounded mb-3"
//               value={filterValues.district}
//               onChange={(e) =>
//                 setFilterValues({ ...filterValues, district: e.target.value })
//               }
//             >
//               <option value="">Select District</option>
//               {districts.map((d) => (
//                 <option key={d} value={d}>
//                   {d}
//                 </option>
//               ))}
//             </select>

//             {/* Tehsil */}
//             <label className="font-semibold">Tehsil</label>
//             <select
//               className="w-full border p-2 rounded mb-3"
//               value={filterValues.tehsil}
//               onChange={(e) =>
//                 setFilterValues({ ...filterValues, tehsil: e.target.value })
//               }
//             >
//               <option value="">Select Tehsil</option>
//               {tehsils.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>

//             {/* Status */}
//             <label className="font-semibold">Status</label>
//             <select
//               className="w-full border p-2 rounded mb-3"
//               value={filterValues.status}
//               onChange={(e) =>
//                 setFilterValues({ ...filterValues, status: e.target.value })
//               }
//             >
//               <option value="">Select Status</option>
//               <option value="Active">Active</option>
//               <option value="Unactive">Unactive</option>
//             </select>

//             {/* ⭐ NAME SORTING */}
//             <label className="font-semibold">Sort by Name</label>
//             <select
//               className="w-full border p-2 rounded mb-4"
//               value={filterValues.sort}
//               onChange={(e) =>
//                 setFilterValues({ ...filterValues, sort: e.target.value })
//               }
//             >
//               <option value="">No Sorting</option>
//               <option value="asc">A → Z</option>
//               <option value="desc">Z → A</option>
//             </select>

//             {/* Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={clearFilter}
//                 className="px-14 py-2 bg-gray-400 text-white rounded-lg"
//               >
//                 Clear
//               </button>

//               <button
//                 onClick={applyFilter}
//                 className="px-14 py-2 bg-black text-white rounded-lg"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default All;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function All() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);

  const [showFilter, setShowFilter] = useState(false);

  const [filterValues, setFilterValues] = useState({
    district: "",
    tehsil: "",
    status: "",
    sort: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("farmers")) || [];

    const updated = data.map((f) => ({
      ...f,
      status: f.status || "Active",
    }));

    setStocks(updated);
    setFilteredStocks(updated);

    localStorage.setItem("farmers", JSON.stringify(updated));
  }, []);

  const districts = [...new Set(stocks.map((f) => f.district))];
  const tehsils = [...new Set(stocks.map((f) => f.tehsil))];

  const applyFilter = () => {
    let result = [...stocks];

    if (filterValues.district)
      result = result.filter((f) => f.district === filterValues.district);

    if (filterValues.tehsil)
      result = result.filter((f) => f.tehsil === filterValues.tehsil);

    if (filterValues.status)
      result = result.filter((f) => f.status === filterValues.status);

    if (filterValues.sort === "asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterValues.sort === "desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredStocks(result);
    setShowFilter(false);
  };

  const clearFilter = () => {
    setFilterValues({ district: "", tehsil: "", status: "", sort: "" });
    setFilteredStocks(stocks);
    setShowFilter(false);
  };

  const toggleStatus = (farmerId) => {
    const updated = stocks.map((f) =>
      f.farmerId === farmerId
        ? { ...f, status: f.status === "Active" ? "Unactive" : "Active" }
        : f
    );

    setStocks(updated);
    setFilteredStocks(updated);
    localStorage.setItem("farmers", JSON.stringify(updated));
  };

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

  const modifiedStocks = filteredStocks.map((item) => ({
    "Farmer ID": item.farmerId || "—",
    "Farmer Name": item.name,
    Contact: item.contact,
    Village: item.village,
    Tehsil: item.tehsil,
    District: item.district,

    Status: (
      <button
        className={`px-3 py-1 rounded-lg text-white ${
          item.status === "Active" ? "bg-green-600" : "bg-red-600"
        }`}
        onClick={() => toggleStatus(item.farmerId)}
      >
        {item.status}
      </button>
    ),

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
      <div className="ml-64  min-h-screen ">
        <div className="flex justify-between items-center p-4">
          <h1 className="mt-5 text-2xl font-semibold">All Farmers</h1>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setShowFilter(true)}
              className="bg-[#CBD5E1] text-[#475569] mt-3 px-3 py-2 rounded-lg font-semibold"
            >
              <i className="fa-solid fa-filter mr-1"></i> Filter
            </button>

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

      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-[400px] rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              Filter Farmers
            </h2>

            <label className="font-semibold">District</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={filterValues.district}
              onChange={(e) =>
                setFilterValues({ ...filterValues, district: e.target.value })
              }
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label className="font-semibold">Tehsil</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={filterValues.tehsil}
              onChange={(e) =>
                setFilterValues({ ...filterValues, tehsil: e.target.value })
              }
            >
              <option value="">Select Tehsil</option>
              {tehsils.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <label className="font-semibold">Status</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={filterValues.status}
              onChange={(e) =>
                setFilterValues({ ...filterValues, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Unactive">Unactive</option>
            </select>

            <label className="font-semibold">Sort by Name</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={filterValues.sort}
              onChange={(e) =>
                setFilterValues({ ...filterValues, sort: e.target.value })
              }
            >
              <option value="">No Sorting</option>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>

            <div className="flex justify-between mt-4">
              <button
                onClick={clearFilter}
                className="px-14 py-2 bg-gray-400 text-white rounded-lg"
              >
                Clear
              </button>

              <button
                onClick={applyFilter}
                className="px-14 py-2 bg-black text-white rounded-lg"
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

export default All;

