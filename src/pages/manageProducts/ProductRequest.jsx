import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function ProductRequest() {
  const columns = [
    "Request ID",
    "Product Name",
    "Requester Name",
    "SKU",
    "Amount",
    "Village",
    "District",
    "Action",
  ];

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("addrequest");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  // EDIT REQUEST FUNCTION
  const editProduct = (requestId) => {
    const item = product.find((i) => i.requestId === requestId);
    navigate("/products/request/addrequest", { state: { editItem: item } });
  };

  const productRows = product.map((item) => ({
    "Request ID": item.requestId,
    "Product Name": item.productName,
    "Requester Name": item.requesterName,
    SKU: item.sku,
    Amount: item.amount,
    Village: item.village,
    District: item.district,

    Action: (
      <div className="flex gap-3 justify-center">
        <button
          className="text-green-600"
          onClick={() => editProduct(item.requestId)}
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
        <h1 className="mt-5 text-2xl font-semibold">Product Request</h1>

<div className="flex gap-2"><NavLink className="bg-[#CBD5E1] text-[#475569]  mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#CBD5E1] text-[#475569]  mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>
        <button
          className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
          onClick={() => navigate("/products/request/addrequest")}
        >
          + Add Request
        </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {productRows.length > 0 ? (
          <TableLayout columns={columns} data={productRows} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No product Request added yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductRequest;
