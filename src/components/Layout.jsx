import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const [searchText, setSearchText] = useState("");
  
  const [menuItems, setMenuItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 Sidebar toggle state

  const filteredItems = searchText.trim()
    ? menuItems.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="flex min-h-screen">

      {/* 👇 Sidebar with toggle */}
     <Sidebar menuOpen={menuOpen} setMenuItems={setMenuItems} />

      <div className="flex-1 flex flex-col">

        {/* 👇 Topbar me toggle button bhej rahe */}
        <div className="p-4 border-b bg-white">
          <Topbar
            searchText={searchText}
            setSearchText={setSearchText}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>
        <div className="w-full md:w-[90%] lg:w-[100%] 2xl:w-[70%] mx-auto">
        <main className="p-6 bg-gray-50 flex-1 overflow-auto ">
          {searchText && (
            <div className="p-4 rounded shadow mb-4">
              <h2 className="text-xl font-bold mb-2">Search Results</h2>

              {filteredItems.length > 0 ? (
                <ul className="space-y-2">
                  {filteredItems.map((item, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded">
                      <a href={item.to} className="text-blue-600">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No results found</p>
              )}
            </div>
          )}

          {!searchText && <Outlet />}
        </main>
        </div>
      </div>
    </div>
  );
}
