import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function ProductSchema() {
  const columns = [
    "Serial ID",
    "Product Name",
    "Scheme Name",
    "SKU",
    "Quantity",
    "Start Date",
    "End Date",
    "Action",
  ];

  const navigate = useNavigate();

  const [product, setProduct] = useState([]);

  // LOAD SCHEME FROM LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem("addScheme");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  // EDIT
  const editProduct = (serialNo) => {
    const item = product.find((i) => i.Serialno === serialNo);
    navigate("/products/scheme/addscheme", { state: { editItem: item } });
  };

  // TABLE DATA
  const productRows = product.map((item) => ({
    "Serial ID": item.Serialno,
    "Product Name": item.ProductName,
    "Scheme Name": item.SchemeName,
    SKU: item.SKU,
    Quantity: item.Quantity,
    "Start Date": item.StartDate,
    "End Date": item.EndDate,

    Action: (
      <div className="flex gap-3 justify-center">
        <button
          className="text-green-600"
          onClick={() => editProduct(item.Serialno)}
        >
          <i className="fa-solid fa-pen"></i>
        </button>

        <div className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer">
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <div className="ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">Product Scheme</h1>

        <div className="flex gap-2">
          <NavLink className="bg-[#CBD5E1] text-[#475569]  mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#CBD5E1] text-[#475569]  mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>

          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/products/scheme/addscheme")}
          >
            + Add Scheme
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {productRows.length > 0 ? (
          <TableLayout columns={columns} data={productRows} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No product scheme added yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductSchema;
