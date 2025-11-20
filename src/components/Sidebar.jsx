import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  FileText,
  Settings,
  BarChart,
  Megaphone,
  ChevronDown,
  ChevronRight,
  ListChecks,
} from "lucide-react";

export default function Sidebar({ setMenuItems }) {
  const location = useLocation();

  // ============================
  // 🔥 DUMMY COUNTS (Replace with API later)
  // ============================
  const [counts, setCounts] = useState({
    farmer: { main: 6, return: 2, canceled: 1, rejected: 1, completed: 2 },
    employee: { main: 5, return: 1, canceled: 1, rejected: 1, completed: 2 },
    payment: { pending: 3, upcoming: 2 },
    complains: { new: 4, technical: 1, pending: 2, completed: 0 },
    workmanagement:{ demo:2, visit:3},
  });

useEffect(() => {
   const items = [
      { label: "Dashboard", to: "/" },
      { label: "Available Stock", to: "/stack/available" },
      { label: "Finished Stock", to: "/stack/finished" },
      { label: "Lost Stock", to: "/stack/lost" },
      { label: "Damaged Stock", to: "/stack/damaged" },

      { label: "Employee Cart", to: "/cart/employee" },
      { label: "Farmer Cart", to: "/cart/farmer" },

      { label: "Farmer Orders", to: "/orders/farmer" },
      { label: "Farmer Return", to: "/orders/farmer/return" },
      { label: "Farmer Canceled", to: "/orders/farmer/canceled" },
      { label: "Farmer Rejected", to: "/orders/farmer/rejected" },
      { label: "Farmer Completed", to: "/orders/farmer/completed" },

      { label: "Employee Orders", to: "/orders/byemployee" },
      { label: "Employee Return", to: "/orders/byemployee/return" },
      { label: "Employee Canceled", to: "/orders/byemployee/canceled" },
      { label: "Employee Rejected", to: "/orders/byemployee/rejected" },
      { label: "Employee Completed", to: "/orders/byemployee/completed" },

      { label: "Demo Work", to: "/workmanagement/demo" },
      { label: "Visit Work", to: "/workmanagement/visit" },

      { label: "Pending Payment", to: "/payment/pending" },
      { label: "Upcoming Payment", to: "/payment/upcoming" },

      { label: "New Complaint", to: "/complains/new" },
      { label: "Technical Complaint", to: "/complains/technical" },
      { label: "Pending Complaint", to: "/complains/pending" },
      { label: "Completed Complaint", to: "/complains/completed" },
    ];
    setMenuItems(items);
   }, []);

  // ============================
  // 🔥 HIDE COUNT AFTER VISITING PAGE
  // ============================
  useEffect(() => {
    const path = location.pathname;

    const update = { ...counts };

    // AUTO-CLEAR COUNTS ONLY FOR THAT PAGE
    if (path.includes("/orders/farmer")) {
      update.farmer.main = 0;
      if (path.includes("/return")) update.farmer.return = 0;
      if (path.includes("/canceled")) update.farmer.canceled = 0;
      if (path.includes("/rejected")) update.farmer.rejected = 0;
      if (path.includes("/completed")) update.farmer.completed = 0;
    }

    if (path.includes("/orders/byemployee")) {
      update.employee.main = 0;
      if (path.includes("/return")) update.employee.return = 0;
      if (path.includes("/canceled")) update.employee.canceled = 0;
      if (path.includes("/rejected")) update.employee.rejected = 0;
      if (path.includes("/completed")) update.employee.completed = 0;
    }

    if(path.includes("/workmanagement/demo"))update.workmanagement.demo=0;
    if(path.includes("/workmanagement/visit"))update.workmanagement.visit=0;

    if (path.includes("/payment/pending")) update.payment.pending = 0;
    if (path.includes("/payment/upcoming")) update.payment.upcoming = 0;

    if (path.includes("/complains/new")) update.complains.new = 0;
    if (path.includes("/complains/technical")) update.complains.technical = 0;
    if (path.includes("/complains/pending")) update.complains.pending = 0;
    if (path.includes("/complains/completed")) update.complains.completed = 0;

    setCounts(update);
  }, [location.pathname]);

  // ============================
  // MENU STATE
  // ============================
  const [open, setOpen] = useState({
    stack: false,
    orders: false,
    farmers: false,
    payment: false,
    employees: false,
    ads: false,
    products: false,
    data: false,
    complains: false,
    workmanagement:false,
    reports: false,
    settings: false,
    cart:false,
    farmerOrders: false,
    employeeOrders: false,
  });

  const toggle = (section) => {
    setOpen((prev) => {
      const updated = { ...prev };

      if (section === "farmerOrders" || section === "employeeOrders") {
        updated.farmerOrders = section === "farmerOrders" ? !prev.farmerOrders : false;
        updated.employeeOrders = section === "employeeOrders" ? !prev.employeeOrders : false;
        updated.orders = true;
        return updated;
      }

      for (const key in prev) {
        updated[key] = key === section ? !prev[key] : false;
      }
      return updated;
    });
  };

  // ============================
  // UI COMPONENTS
  // ============================
//   <div
//   className="
//     flex items-center justify-center
//     bg-red-500 text-white
//     rounded-full
//     w-5 h-5 text-[10px]     /* mobile */
//     sm:w-6 sm:h-6 sm:text-xs /* small screens */
//     md:w-7 md:h-7 md:text-sm /* tablet */
//   "
// >
//   {count}
// </div>

  const CountBadge = ({ count }) =>
    count > 0 ? (
      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full sm:w-6 sm:h-6 sm:text-xs md:w-7 md:h-7 md:text-sm ">
        {count}
      </span>
    ) : null;

  const Item = ({ to, children, count }) => (
    <Link
      to={to}
      className={`flex justify-between px-3 py-2 rounded transition-all duration-200 ${
        location.pathname === to
          ? "font-bold text-black"
          : "hover:bg-gray-100 rounded"
      }`}
    >
      <span>{children}</span>
      <CountBadge count={count} />
    </Link>
  );

  const MainButton = ({ section, icon, label, count }) => (
    <button
      onClick={() => toggle(section)}
      className={`w-full flex justify-between items-center px-3 py-2 rounded-lg transition-all duration-200
        ${
          open[section]
            ? "bg-[#1A1A1D] text-[#FFFFFF]"
            : "hover:bg-[#EDEDED] text-[#000000]"
        }
      `}
    >
      <span className="flex items-center">
        {icon}
        {label}
        <CountBadge count={count} />
      </span>
      {open[section] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>
  );

  return (
    <aside className="fixed left-0 top-[64px] w-64 h-[calc(100%-64px)] bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide pt-4">
      <nav className="px-2 py-3">
{/* ====================== DASHBOARD  ===================== */}

        <Item to="/" count={0}>
          <LayoutDashboard size={16} className="inline-block mr-2" /> Dashboard
        </Item>

       {/* ====================== STOCK  ===================== */}
        <div className="mt-2">
          <MainButton
            section="stack"
            icon={<Package size={16} className="inline-block mr-2" />}
            label="Stock Management"
          />
          {open.stack && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/stack/available">Available</Item>
              <Item to="/stack/finished">Finished</Item>
              <Item to="/stack/lost">Lost</Item>
              <Item to="/stack/damaged">Damaged</Item>
            </div>
          )}
        </div>
        {/* ====================== CART  ===================== */}
        <div className="mt-2">
          <MainButton
            section="cart"
            icon={<ShoppingCart size={16} className="inline-block mr-2" />}
            label="Cart Management"
          />
          {open.cart && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/cart/employee">Employee</Item>
              <Item to="/cart/farmer">Farmer</Item>

            </div>
          )}
        </div>

        {/* ====================== ORDER MANAGEMENT ===================== */}
        <div className="mt-2">
          <MainButton
            section="orders"
            icon={<ShoppingCart size={16} className="inline-block mr-2" />}
            label="OrderManagement"
            count={counts.farmer.main + counts.employee.main}
          />

          {open.orders && (
            <div className="pl-6 mt-1 space-y-1">

              {/* FARMER ORDER */}
              <MainButton
                section="farmerOrders"
                icon={<Users size={16} className="inline-block mr-2" />}
                label="Farmer"
                count={counts.farmer.main}
              />
              {open.farmerOrders && (
                <div className="pl-6 mt-1 space-y-1">
                  <Item to="/orders/farmer" count={counts.farmer.main}>Farmer</Item>
                  <Item to="/orders/farmer/return" count={counts.farmer.return}>Return</Item>
                  <Item to="/orders/farmer/canceled" count={counts.farmer.canceled}>Canceled</Item>
                  <Item to="/orders/farmer/rejected" count={counts.farmer.rejected}>Rejected</Item>
                  <Item to="/orders/farmer/completed" count={counts.farmer.completed}>Completed</Item>
                </div>
              )}

              {/* EMPLOYEE ORDER */}
              <MainButton
                section="employeeOrders"
                icon={<Users size={16} className="inline-block mr-2" />}
                label="By Employee"
                count={counts.employee.main}
              />
              {open.employeeOrders && (
                <div className="pl-6 mt-1 space-y-1">
                  <Item to="/orders/byemployee" count={counts.employee.main}>By Employee</Item>
                  <Item to="/orders/byemployee/return" count={counts.employee.return}>Return</Item>
                  <Item to="/orders/byemployee/canceled" count={counts.employee.canceled}>Canceled</Item>
                  <Item to="/orders/byemployee/rejected" count={counts.employee.rejected}>Rejected</Item>
                  <Item to="/orders/byemployee/completed" count={counts.employee.completed}>Completed</Item>
                </div>
              )}

            </div>
          )}
        </div>

{/* ====================== FARMERS LIST ===================== */}

        <div className="mt-2">
          <MainButton
            section="farmers"
            icon={<Users size={16} className="inline-block mr-2" />}
            label="Farmer List"
          />
          {open.farmers && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/farmers/all">All</Item>
              <Item to="/farmers/new">New</Item>
              <Item to="/farmers/gold">Gold</Item>
              <Item to="/farmers/premium">Premium</Item>
              <Item to="/farmers/normal">Normal</Item>
              <Item to="/farmers/defaulter">Defaulter</Item>
              <Item to="/farmers/block">Block</Item>
            </div>
          )}
        </div>

        {/* ====================== PAYMENT ===================== */}
        <div className="mt-2">
          <MainButton
            section="payment"
            icon={<CreditCard size={16} className="inline-block mr-2" />}
            label="Payment"
            count={counts.payment.pending + counts.payment.upcoming}
          />
          {open.payment && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/payment/pending" count={counts.payment.pending}>Pending Payment</Item>
              <Item to="/payment/upcoming" count={counts.payment.upcoming}>Upcoming Payment</Item>
            </div>
          )}
        </div>

        {/* ====================== MANAGE EMPLOYEES ===================== */}
        <div className="mt-2">
          <MainButton
            section="employees"
            icon={<Users size={16} className="inline-block mr-2" />}
            label="Manage Employees"
          />
          {open.employees && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/employees/manage">Manager Employee</Item>
              <Item to="/employees/areamanager">Area Manager</Item>
              <Item to="/employees/field">Field Employee</Item>
            </div>
          )}
        </div>

{/* ====================== ADVERTISEMENT ===================== */}
        <div className="mt-2">
          <MainButton
            section="ads"
            icon={<Megaphone size={16} className="inline-block mr-2" />}
            label="Advertisement"
          />
          {open.ads && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/ads/banner">Banner Add</Item>
              <Item to="/ads/video">Video Add</Item>
            </div>
          )}
        </div>

{/* ====================== MANAGE PRODUCTS ===================== */}
        <div className="mt-2">
          <MainButton
            section="products"
            icon={<Package size={16} className="inline-block mr-2" />}
            label="Manage Products"
          />
          {open.products && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/products/category">Category</Item>
              <Item to="/products/list">Product List</Item>
              <Item to="/products/scheme">Product Scheme</Item>
              <Item to="/products/request">Product Request</Item>
            </div>
          )}
        </div>

{/* ====================== DATA ===================== */}
        <div className="mt-2">
          <MainButton
            section="data"
            icon={<BarChart size={16} className="inline-block mr-2" />}
            label="Data"
          />
          {open.data && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/data/technical">Technical List</Item>
              <Item to="/data/crops">Crop List</Item>
              <Item to="/data/insects">Insects List</Item>
              <Item to="/data/fungus">Fungus List</Item>
              <Item to="/data/herbicide">Herbicide</Item>
              <Item to="/data/soil">Soil List</Item>
            </div>
          )}
        </div>

{/* ====================== SETTINGS  ===================== */}
        <div className="mt-2">
          <MainButton
            section="settings"
            icon={<Settings size={16} className="inline-block mr-2" />}
            label="Settings"
          />
          {open.settings && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/settings/profile">Profile Settings</Item>
              <Item to="/settings/app">App Settings</Item>
            </div>
          )}
        </div>

        {/* ====================== COMPLAINS ===================== */}
        <div className="mt-2">
          <MainButton
            section="complains"
            icon={<FileText size={16} className="inline-block mr-2" />}
            label="Complains"
            count={
              counts.complains.new +
              counts.complains.pending +
              counts.complains.technical
            }
          />
          {open.complains && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/complains/new" count={counts.complains.new}>New Complaints</Item>
              <Item to="/complains/technical" count={counts.complains.technical}>Technical</Item>
              <Item to="/complains/pending" count={counts.complains.pending}>Pending</Item>
              <Item to="/complains/completed" count={counts.complains.completed}>Completed</Item>
            </div>
          )}
        </div>

        {/* ====================== WORK MANAGEMENT ===================== */}
         <div className="mt-2">
          <MainButton
            section="workmanagement"
            icon={<ListChecks size={16} className="inline-block mr-2" />}
            label="Work Management"
            count={counts.workmanagement.demo + counts.workmanagement.visit}
          />
          {open.workmanagement && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/workmanagement/demo" count={counts.workmanagement.demo}>Demo</Item>
              <Item to="/workmanagement/visit" count={counts.workmanagement.visit}>Visit</Item>
            </div>
          )}
        </div>

        {/* ====================== REPORTS ===================== */}
        <div className="mt-2">
          <MainButton
            section="reports"
            icon={<BarChart size={16} className="inline-block mr-2" />}
            label="Reports"
          />
          {open.reports && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/reports/monthly">Monthly Report</Item>
              <Item to="/reports/annual">Annual Report</Item>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}


