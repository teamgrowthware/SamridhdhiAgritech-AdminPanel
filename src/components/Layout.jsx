import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <Topbar />
        </div>
        <main className="p-6 bg-gray-50 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
