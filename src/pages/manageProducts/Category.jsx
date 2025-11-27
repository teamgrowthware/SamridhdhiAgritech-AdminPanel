import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TableLayout from "../layout/TableLayout";

function Category() {
  const columns = [
    "S.no",
    "Category Type",
    "Category Name",
    "Image",
    "Status",
    "Action",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);

  // LOAD LIST FROM LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem("categories");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  // ADD / EDIT NEW DATA
  useEffect(() => {
    if (location.state?.newItem) {
      setProduct((prev) => {
        let updated;

        const exists = prev.some((p) => p.id === location.state.newItem.id);

        if (exists) {
          updated = prev.map((p) =>
            p.id === location.state.newItem.id ? location.state.newItem : p
          );
        } else {
          updated = [...prev, location.state.newItem];
        }

        localStorage.setItem("categories", JSON.stringify(updated));
        return updated;
      });
    }
  }, [location.state]);

  const editproduct = (id) => {
    const item = product.find((i) => i.id === id);
    navigate("/products/category/addcategory", { state: { editItem: item } });
  };

  const modifiedStocks = product.map((item, index) => ({
    "S.no": index + 1,
    "Category Type": item.CategoryType,
    "Category Name": item.CategoryName,
    Image: (
      <img
        src={item.Image}
        alt="Category"
        className="h-14 w-14 object-cover rounded-lg border"
      />
    ),
    Status: "Active",
    Action: (
      <div className="flex gap-3 justify-center">
        <button className="text-green-500" onClick={() => editproduct(item.id)}>
          <i className="fa-solid fa-eye"></i>
        </button>

        <div className="w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer">
          <i className="fa-solid fa-ellipsis text-blue-400"></i>
        </div>
      </div>
    ),
  }));

  return (
    <div className="lg:ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h1 className="mt-5 text-2xl font-semibold">Category</h1>
        <div className="flex gap-2">

          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-filter mr-1"></i> Filter
          </NavLink>

          <NavLink className="bg-[#CBD5E1] text-[#475569] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold">
            <i className="fa-solid fa-gear mr-1"></i> Settings
          </NavLink>

          {/* ADD CATEGORY BUTTONS */}
          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() =>
              navigate("/products/category/addcategory", {
                state: { formTitle: "Add Category" },
              })
            }
          >
            + Add Category
          </button>

          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() =>
              navigate("/products/category/addcategory", {
                state: { formTitle: "Add Main Category" },
              })
            }
          >
            + Add Main Category
          </button>

          <button
            className="bg-[#000000] text-white hover:bg-[#5e1aa1] mt-10 mb-2 px-4 py-2 rounded-lg font-semibold"
            onClick={() =>
              navigate("/products/category/addcategory", {
                state: { formTitle: "Add Sub Category" },
              })
            }
          >
            + Add Sub Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {modifiedStocks.length > 0 ? (
          <TableLayout columns={columns} data={modifiedStocks} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            No category added yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Category;
