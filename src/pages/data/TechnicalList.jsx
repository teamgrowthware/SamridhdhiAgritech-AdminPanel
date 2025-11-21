import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function TechnicalList() {
  const columns = [
    "Request ID",
    "Technical Name",
    "Hindi Name",
    "Sub Category",
    "Action",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);

  // LOAD LIST FROM LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem("technicaldata");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  // For future edit feature (ignore for now)
  useEffect(() => {
    if (location.state?.newItem) {
      setProduct((prev) => {
        const updated = [...prev, location.state.newItem];
        localStorage.setItem("technicaldata", JSON.stringify(updated));
        return updated;
      });
    }
  }, [location.state]);

  const editproduct = (RequestId) => {
    const item = product.find((i) => i.RequestId === RequestId);
    navigate("/data/technical/addtechnical", { state: { editItem: item } });
  };

  // FIXED FIELD NAMES ♥
  const tableData = product.map((item) => ({
    "Request ID": item.RequestId,
    "Technical Name": item.TechnicalName,
    "Hindi Name": item.HindiName,
    "Sub Category": item.SubCategory,
    Action: (
      <div className="flex gap-3 justify-center">
        <button
          className="text-green-500"
          onClick={() => editproduct(item.RequestId)}
        >
          <i className="fa-solid fa-eye"></i>
        </button>

        <div className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer">
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <div className="ml-64  min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">Technical List</h1>

        <div className="flex gap-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
                      <i className="fa-solid fa-filter mr-1"></i> Filter
                    </NavLink>
          
                    <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
                      <i className="fa-solid fa-gear mr-1"></i> Settings
                    </NavLink>
          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/data/technical/addtechnical")}
          >
            + Add Technical
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No technical data added yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default TechnicalList;
