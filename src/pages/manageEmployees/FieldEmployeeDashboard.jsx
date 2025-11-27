import React, { useEffect, useState } from "react";

export default function FieldEmployeeDashboard() {
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("editfieldm")) || null;
    setManager(stored);
  }, []);

  if (!manager) {
    return (
      <div className="ml-64 min-h-screen flex justify-center items-center text-xl">
        No manager selected.
      </div>
    );
  }

  return (
    <div className="ml-64 min-h-screen ">
      {/* Employee Detail Section */}
      <h2 className="text-xl font-semibold mt-10 mb-3">Field Employee Details</h2>

      <section className="bg-white rounded-2xl p-6 shadow">
        <div className="flex flex-wrap items-center gap-6">
          {/* Profile Image */}
          <img
            src={
              manager.profilePic
                ? URL.createObjectURL(manager.profilePic)
                : "data:image/png;base64,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"
            }
            alt="Employee"
            className="w-28 h-28 rounded-full object-cover shadow"
          />

          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold"> {manager.name} </p>
            </div>

            <div className="flex gap-16 text-gray-700">
              <p>
                <span className="font-semibold text-[#767474]">
                  Employee ID
                </span>
                <p className="text-[#000000]">{manager.id}</p>
              </p>

              <p>
                <span className="font-semibold text-[#767474]">Address</span>
                <p className="text-[#000000]">
                  {manager.city}, {manager.state}
                </p>
              </p>

              <p>
                <span className="font-semibold text-[#767474]">Phone</span>
                <p className="text-[#000000]">{manager.phone}</p>
              </p>

              <p>
                <span className="font-semibold text-[#767474]">
                  Designation
                </span>
                <p className="text-[#000000]">{manager.designation}</p>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <h2 className="text-xl font-semibold my-3">Overview</h2>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center mb-4">
          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Total Sales</h3>
            <p className="text-xl font-bold">RS. 0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Total Orders</h3>
            <p className="text-xl font-bold">0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Advance Payment</h3>
            <p className="text-xl font-bold">RS. 0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Payment Collected</h3>
            <p className="text-xl font-bold">Rs. 0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Pending Payment</h3>
            <p className="text-xl font-bold">RS. 0</p>
          </div>
        
          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Total Visit</h3>
            <p className="text-xl font-bold"> 0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Total Demo</h3>
            <p className="text-xl font-bold">0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Camplains</h3>
            <p className="text-xl font-bold">0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Farmer</h3>
            <p className="text-xl font-bold"> 0</p>
          </div>

          <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
            <h3 className="font-semibold text-[#000000]">Work</h3>
            <p className="text-xl font-bold"> 0</p>
          </div>
        </div>
      </section>

      {/* Record Section */}
      <h2 className="text-xl font-semibold my-3">Record</h2>

      <section className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex gap-6">
          {/* Attendance Section */}
          <div className="p-2">
            <h3 className="text-lg font-semibold mb-3 ">Attendance</h3>
            <p className="border-b border-gray-500 mb-2"></p>
            <iframe
              title="Calendar"
              className="w-50 h-20 rounded-lg border"
              src="https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata"
            ></iframe>
          </div>

          {/* Target Records */}
          <div className="p-2">
            <h3 className="text-lg font-semibold mb-3 ">Target Records</h3>
            <p className="border-b border-gray-500 mb-2"></p>
            <div className="flex justify-around gap-8 text-gray-700">
              <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
                <h3 className="font-semibold">Target Assigned</h3>
                <p className="text-xl font-bold">0 Units</p>
              </div>

              <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
                <h3 className="font-semibold">Target Completed</h3>
                <p className="text-xl font-bold">0 Units</p>
              </div>

              <div className="bg-[#F6F6F6] p-5 rounded-xl shadow">
                <h3 className="font-semibold">Target Remaining</h3>
                <p className="text-xl font-bold">0 Units</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold my-3">Visit History</h2>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <table className="w-full border-collapse">
            <thead className="border-b border-gray-300 bg-gray-100">
              <tr>
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Manager Employee</th>
                <th className="p-3 text-left">Visit Date</th>
                <th className="p-3 text-left">Visit Time</th>
                <th className="p-3 text-left">Order Date</th>
                <th className="p-3 text-left">Order Time</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3">1</td>
                <td className="p-3">Rahul Sharma </td>
                <td className="p-3">25 Nov 2025</td>
                <td className="p-3">10:45 AM</td>
                <td className="p-3">25 Nov 2025</td>
                <td className="p-3">11:10 AM</td>
              </tr>

              <tr className="border-b border-gray-200">
                <td className="p-3">2</td>
                <td className="p-3">Amit Verma </td>
                <td className="p-3">24 Nov 2025</td>
                <td className="p-3">04:20 PM</td>
                <td className="p-3">24 Nov 2025</td>
                <td className="p-3">04:45 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
