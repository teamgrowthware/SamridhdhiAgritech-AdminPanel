import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, CreditCard, FileText,
  Settings, BarChart, Megaphone, ChevronDown, ChevronRight
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState({
    stack: false, orders: false, farmers: false, payment: false,
    employees: false, ads: false, products: false, data: false,
    complains: false, reports: false, settings: false
  });

  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));
  const Item = ({ to, children }) => (
    <Link
      to={to}
      className={`block px-3 py-2 rounded transition-all duration-200 ${
        location.pathname === to
          ? 'bg-green-50 font-semibold text-green-800'
          : 'hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <aside className="fixed left-0 top-[64px] w-64 h-[calc(100%-64px)] bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide pt-4">
      <nav className="px-2 py-3">
        <Item to="/"><LayoutDashboard size={16} className="inline-block mr-2" /> Dashboard</Item>

        <div className="mt-2">
          <button onClick={() => toggle('stack')} className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100">
            <span><Package size={16} className="inline-block mr-2" /> Stock Management</span>
            {open.stack ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {open.stack && (
            <div className="pl-6 mt-1 space-y-1">
              <Item to="/stack/available">Available</Item>
              <Item to="/stack/finished">Finished</Item>
              <Item to="/stack/lost">Lost</Item>
              <Item to="/stack/damaged">Damaged</Item>
            </div>
          )}
        </div>


        <div className='mt-2'><button onClick={()=>toggle('orders')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><ShoppingCart size={16} className='inline-block mr-2'/> Order Management</span>{open.orders? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.orders&&(<div className='pl-6 mt-1 space-y-1'><Item to='/orders/new'>New</Item><Item to='/orders/return'>Return</Item><Item to='/orders/completed'>Completed</Item><Item to='/orders/canceled'>Canceled</Item><Item to='/orders/rejected'>Rejected</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('farmers')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><Users size={16} className='inline-block mr-2'/> Farmer List</span>{open.farmers? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.farmers&&(<div className='pl-6 mt-1 space-y-1'><Item to='/farmers/all'>All</Item><Item to='/farmers/new'>New</Item><Item to='/farmers/gold'>Gold</Item><Item to='/farmers/premium'>Premium</Item><Item to='/farmers/normal'>Normal</Item><Item to='/farmers/defaulter'>Defaulter</Item><Item to='/farmers/block'>Block</Item><Item to='/farmers/demo'>Demo/Visits</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('payment')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><CreditCard size={16} className='inline-block mr-2'/> Payment</span>{open.payment? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.payment&&(<div className='pl-6 mt-1 space-y-1'><Item to='/payment/pending'>Pending Payment</Item><Item to='/payment/upcoming'>Upcoming Payment</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('employees')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><Users size={16} className='inline-block mr-2'/> Manage Employees</span>{open.employees? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.employees&&(<div className='pl-6 mt-1 space-y-1'><Item to='/employees/manage'>Manage Employee</Item><Item to='/employees/field'>Field Employee</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('ads')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><Megaphone size={16} className='inline-block mr-2'/> Advertisement</span>{open.ads? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.ads&&(<div className='pl-6 mt-1 space-y-1'><Item to='/ads/banner'>Banner Add</Item><Item to='/ads/video'>Video Add</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('products')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><Package size={16} className='inline-block mr-2'/> Manage Products</span>{open.products? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.products&&(<div className='pl-6 mt-1 space-y-1'><Item to='/products/category'>Category</Item><Item to='/products/list'>Product List</Item><Item to='/products/scheme'>Product Scheme</Item><Item to='/products/request'>Product Request</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('data')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><BarChart size={16} className='inline-block mr-2'/> Data</span>{open.data? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.data&&(<div className='pl-6 mt-1 space-y-1'><Item to='/data/technical'>Technical List</Item><Item to='/data/crops'>Crop List</Item><Item to='/data/insects'>Insects List</Item><Item to='/data/fungus'>Fungus List</Item><Item to='/data/herbicide'>Herbicide</Item><Item to='/data/soil'>Soil List</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('complains')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><FileText size={16} className='inline-block mr-2'/> Complains</span>{open.complains? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.complains&&(<div className='pl-6 mt-1 space-y-1'><Item to='/complains/new'>New Complaints</Item><Item to='/complains/technical'>Technical</Item><Item to='/complains/pending'>Pending</Item><Item to='/complains/completed'>Completed</Item></div>)}</div>
        <div className='mt-2'><button onClick={()=>toggle('reports')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><BarChart size={16} className='inline-block mr-2'/> Reports</span>{open.reports? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.reports&&(<div className='pl-6 mt-1 space-y-1'><Item to='/reports/monthly'>Monthly Report</Item><Item to='/reports/annual'>Annual Report</Item></div>)}</div>
        <div className='mt-2 mb-6'><button onClick={()=>toggle('settings')} className='w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100'><span><Settings size={16} className='inline-block mr-2'/> Settings</span>{open.settings? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{open.settings&&(<div className='pl-6 mt-1 space-y-1'><Item to='/settings/profile'>Profile Settings</Item><Item to='/settings/app'>App Settings</Item></div>)}</div>
      </nav>
    </aside>
  )
}
