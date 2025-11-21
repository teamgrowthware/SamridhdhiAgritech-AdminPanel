import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiFilter, FiSettings, FiPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import {useState,useEffect} from "react";

export default function Dashboard() {
  const lineData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 80 },
    { name: "May", value: 70 },
  ];

  const barData = [
    { name: "Jan", value: 60 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 70 },
    { name: "Apr", value: 30 },
    { name: "May", value: 90 },
  ];

    const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("farmers")) || [];
    setFarmers(data);
  }, []);


  return (
    <div className="ml-64  min-h-screen pt-8">
      {/* STATS CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Sales", value: "Rs. 2,72,000" },
          { title: "Total Orders", value: "12,900" },
          { title: "Payment Collected", value: "Rs. 1,76,000" },
          { title: "Pending Payment", value: "Rs. 96,000" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-gray-600">Item Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="black"
                strokeWidth={3}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-gray-600">
            Sales Performance
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <Bar dataKey="value" fill="black" radius={[6, 6, 0, 0]} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SMALL STATS */}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-600 text-sm">65%</h3>
          <p className="text-xs text-gray-500">Your stat title here</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-600 text-sm">5,000</h3>
          <p className="text-xs text-gray-500">Your stat title here</p>
        </div>
        <div className="bg-black text-white shadow rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm">65% Your stat</p>
          <div className="w-10 h-10 -4 -white rounded-full"></div>
        </div>
      </div>

      {/* CUSTOMER TABLE */}
     <div className="bg-white rounded-xl shadow p-4">
  <div className="flex items-center justify-between -b pb-3 mb-4">
    <h3 className="font-semibold text-lg text-gray-700">Your Customers</h3>

    <div className="flex items-center gap-3">
      <NavLink
        to="/filter"
        className="flex items-center gap-2 bg-[#CBD5E1] text-[#475569] px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] hover:text-white transition-all"
      >
        <i className="fa-solid fa-filter"></i>
        <span>Filter</span>
      </NavLink>

      <NavLink
        to="/settings"
        className="flex items-center gap-2 bg-[#CBD5E1] text-[#475569] px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] hover:text-white transition-all"
      >
        <i className="fa-solid fa-gear"></i>
        <span>Settings</span>
      </NavLink>

      <NavLink
        to="/farmer/all/addfarmer"
        className="flex items-center gap-2 bg-[#1A1A1D] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#5e1aa1] transition-all"
      >
        <i className="fa-solid fa-user-plus"></i>
        <span>Add Farmer</span>
      </NavLink>
    </div>
  </div>

  <table className="min-w-full ">
          <thead>
            <tr className="bg-gray-200 text-left">
             
              <th className=" p-2">Farmer ID</th>
              <th className=" p-2 text-center">Image</th>
              <th className=" p-2">Name</th>
              <th className="p-2">Father Name</th>
              <th className=" p-2">Contact</th>
              <th className=" p-2">Land Area</th>
              <th className=" p-2">Tehsil</th>
              <th className=" p-2">District</th>
              <th className=" p-2">State</th>
              <th className=" p-2">Village</th>
            </tr>
          </thead>

          <tbody>
            {farmers.length > 0 ? (
              farmers.map((farmer, index) => (
                <tr key={index} className="hover:bg-gray-100">

                 

                  <td className=" p-2">{farmer.farmerId}</td>
                   {/* IMAGE COLUMN */}
                  <td className=" p-2 text-center">
                    {farmer.photo ? (
                      <img
                        src={farmer.photo}
                        alt="Farmer"
                        className="w-12 h-12 rounded-full object-cover "
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className=" p-2">{farmer.name}</td>
                  <td className=" p-2">{farmer.fatherName}</td>
                  <td className=" p-2">{farmer.contact}</td>
                  <td className=" p-2">{farmer.landArea}</td>
                  <td className=" p-2">{farmer.tehsil}</td>
                  <td className=" p-2">{farmer.district}</td>
                  <td className=" p-2">{farmer.state}</td>
                  <td className=" p-2">{farmer.village}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="text-center p-4 text-gray-500">
                  No farmers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
</div>

    </div>
  );
}
