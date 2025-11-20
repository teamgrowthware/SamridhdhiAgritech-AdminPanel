import React from "react";

function TableLayout({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden shadow-lg ">
        {/* Light Gradient Header */}
        <thead className="bg-[#393636] text-[#E8E8E8]">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-lg font-semibold tracking-wide  "
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-[#E0E0FF]">
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-[#f4f2ff] transition-all duration-200"
            >
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  className="px-4 py-3 whitespace-nowrap text-[15px] text-[#1a1a3e] font-medium"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableLayout;
