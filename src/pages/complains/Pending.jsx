import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function Pending() {
  const columns = [
    "Complaint ID",
    "Employee ID",
    "Employee Name",
    "Ticket For",
    "Date",
    "Handler Name",
    "Action",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  // Default Dummy Data
  const defaultData = [
    {
      RequestId: 1,
      ComplaintID: "CMP001",
      EmployeeID: "EMP123",
      EmployeeName: "Ramesh",
      TicketFor: "Laptop Issue",
      Date: "2024-11-17",
      HandlerName: "Vikas",
    },
    {
      RequestId: 2,
      ComplaintID: "CMP002",
      EmployeeID: "EMP456",
      EmployeeName: "Suresh",
      TicketFor: "Network Down",
      Date: "2024-11-18",
      HandlerName: "Amit",
    },
  ];

  const [product, setProduct] = useState([]);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem("pending");

    if (saved) {
      setProduct(JSON.parse(saved));
    } else {
      // Store default data on first load
      localStorage.setItem("pending", JSON.stringify(defaultData));
      setProduct(defaultData);
    }
  }, []);

  // Add New Record Coming From AddTech Page
  useEffect(() => {
    if (location.state?.newItem) {
      setProduct((prev) => {
        const exists = prev.some(
          (item) => item.RequestId === location.state.newItem.RequestId
        );

        if (!exists) {
          const updated = [...prev, location.state.newItem];
          localStorage.setItem("pending", JSON.stringify(updated));
          return updated;
        }

        return prev;
      });
    }
  }, [location.state]);

  const editproduct = (RequestId) => {
    const item = product.find((i) => i.RequestId === RequestId);
    navigate("/complains/technical/addtechnical", { state: { editItem: item } });
  };

  // Prepare Table Data
  const tableData = product.map((item) => ({
    "Complaint ID": item.ComplaintID,
    "Employee ID": item.EmployeeID,
    "Employee Name": item.EmployeeName,
    "Ticket For": item.TicketFor,
    "Date": item.Date,
    "Handler Name": item.HandlerName,
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
    <div className="ml-64 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">Pending Complaints</h1>

        <div className="flex gap-2">
          <NavLink className="bg-[#4B0082] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#4B0082] text-white mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {tableData.length > 0 ? (
          <TableLayout columns={columns} data={tableData} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No Pending Complaints yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Pending;
