import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Available from "./pages/stackManagement/Available";
import Finished from "./pages/stackManagement/Finished";
import Lost from "./pages/stackManagement/Lost";
import Damaged from "./pages/stackManagement/Damaged";
import AllFarmers from "./pages/farmerList/All";
import NewFarmer from "./pages/farmerList/New";
import Gold from "./pages/farmerList/Gold";
import Premium from "./pages/farmerList/Premium";
import Normal from "./pages/farmerList/Normal";
import Defaulter from "./pages/farmerList/Defaulter";
import Block from "./pages/farmerList/Block";
import DemoVisits from "./pages/farmerList/DemoVisits";
import PendingPayment from "./pages/payment/PendingPayment";
import UpcomingPayment from "./pages/payment/UpcomingPayment";
import ManageEmployee from "./pages/manageEmployees/ManageEmployee";
import FieldEmployee from "./pages/manageEmployees/FieldEmployee";
import BannerAdd from "./pages/advertisement/BannerAdd";
import VideoAdd from "./pages/advertisement/VideoAdd";
import Category from "./pages/manageProducts/Category";
import ProductList from "./pages/manageProducts/ProductList";
import ProductScheme from "./pages/manageProducts/ProductScheme";
import ProductRequest from "./pages/manageProducts/ProductRequest";
import TechnicalList from "./pages/data/TechnicalList";
import CropList from "./pages/data/CropList";
import AddCrop from "./pages/data/AddCrop";
import InsectsList from "./pages/data/InsectsList";
import FungusList from "./pages/data/FungusList";
import Herbicide from "./pages/data/Herbicide";
import SoilList from "./pages/data/SoilList";
import NewComplaints from "./pages/complains/NewComplaints";
import Technical from "./pages/complains/Technical";
import PendingComplaints from "./pages/complains/Pending";
import CompletedComplaints from "./pages/complains/Completed";
import MonthlyReport from "./pages/reports/MonthlyReport";
import AnnualReport from "./pages/reports/AnnualReport";
import ProfileSettings from "./pages/settings/ProfileSettings";
import AppSettings from "./pages/settings/AppSettings";
import Topbar from "./components/Topbar";
import AddStock from "./pages/stackManagement/AddStock";
import AddUsers from "./pages/AddUsers";
import AddFinishedStock from "./pages/stackManagement/AddFinishedStock";
import AddLost from "./pages/stackManagement/AddLost";
import Adddamaged from "./pages/stackManagement/Adddamaged";
import Addfield from "./pages/manageEmployees/Addfield";
import AddManage from "./pages/manageEmployees/AddManage";
import AddTechnical from "./pages/data/AddTechnical";
import AddFarmer from "./pages/farmerList/AddFarmer";
import AddCategory from "./pages/manageProducts/AddCategory";
import AddProduct from "./pages/manageProducts/AddProduct";
import AddScheme from "./pages/manageProducts/AddScheme";
import AddRequest from "./pages/manageProducts/AddRequest";
import AddInsects from "./pages/data/AddInsects";
import AddFungus from "./pages/data/AddFungus";
import AddHerbicide from "./pages/data/AddHerbicide";
import AddSoil from "./pages/data/AddSoil";
import AddNewComplaints from "./pages/complains/AddNewComplainst";
import AddTech from "./pages/complains/AddTech";
import AreaManager from "./pages/manageEmployees/AreaManager";
import AddAreaManager from "./pages/manageEmployees/AddAreaManager";
import Visit from "./pages/WorkManagement/Visit";
import Demo from "./pages/WorkManagement/Demo";
import FarmerOrder from "./pages/orderManagement/FarmerOrder";
import ByEmployeeOrder from "./pages/orderManagement/ByEmployeeOrder";
import FReturnOrder from "./pages/orderManagement/FReturnOrder";
import FCompletedOrder from "./pages/orderManagement/FComplitedOrder";
import FCenceledOrder from "./pages/orderManagement/FCenceledOrder";
import FRejectedOrder from "./pages/orderManagement/FRejectedOrder";
import EReturnOrder from "./pages/orderManagement/EReturnOrder";
import ECompletedOrder from "./pages/orderManagement/EComplitedOrder";
import ECenceledOrder from "./pages/orderManagement/ECenceledOrder";
import ERejectedOrder from "./pages/orderManagement/ERejectedOrder";
import Employee from "./pages/cart/Employee";
import Farmer from "./pages/cart/Farmer";
import SendStock from "./pages/stackManagement/SendStock";
import Godown from "./pages/data/Godown";
import AddGodown from "./pages/data/AddGodown";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Topbar />
      <div className="flex-1 main_card  ">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/adduser" element={<AddUsers />} />
            <Route path="/stack/available" element={<Available />} />
            <Route path="/stack/available/addstock" element={<AddStock />} />
            <Route path="/stack/finished" element={<Finished />} />
            <Route
              path="/stack/finished/addfinishedstock"
              element={<AddFinishedStock />}
            />
            <Route path="/stack/lost" element={<Lost />} />
            <Route path="/stack/lost/addlost" element={<AddLost />} />
            <Route path="/stack/damaged" element={<Damaged />} />
            <Route path="/stack/damaged/adddamaged" element={<Adddamaged />} />
            <Route path="/stack/send" element={<SendStock/>} />


            <Route path="/cart/employee" element={<Employee />} />
            <Route path="/cart/farmer" element={<Farmer />} />

            <Route path="/orders/farmer" element={<FarmerOrder />} />
            <Route path="/orders/byemployee" element={<ByEmployeeOrder />} />
            <Route path="/orders/farmer/return" element={<FReturnOrder />} />
            <Route
              path="/orders/farmer/completed"
              element={<FCompletedOrder />}
            />
            <Route
              path="/orders/farmer/canceled"
              element={<FCenceledOrder />}
            />
            <Route
              path="/orders/farmer/rejected"
              element={<FRejectedOrder />}
            />
            <Route
              path="/orders/byemployee/return"
              element={<EReturnOrder />}
            />
            <Route
              path="/orders/byemployee/completed"
              element={<ECompletedOrder />}
            />
            <Route
              path="/orders/byemployee/canceled"
              element={<ECenceledOrder />}
            />
            <Route
              path="/orders/byemployee/rejected"
              element={<ERejectedOrder />}
            />

            <Route path="/farmers/all" element={<AllFarmers />} />
            <Route path="/farmer/all/addfarmer" element={<AddFarmer />} />
            <Route path="/farmers/new" element={<NewFarmer />} />
            <Route path="/farmers/gold" element={<Gold />} />
            <Route path="/farmers/premium" element={<Premium />} />
            <Route path="/farmers/normal" element={<Normal />} />
            <Route path="/farmers/defaulter" element={<Defaulter />} />
            <Route path="/farmers/block" element={<Block />} />
            <Route path="/farmers/demo" element={<DemoVisits />} />

            <Route path="/payment/pending" element={<PendingPayment />} />
            <Route path="/payment/upcoming" element={<UpcomingPayment />} />

            <Route path="/employees/manage" element={<ManageEmployee />} />
            <Route path="/employees/manage/addmanage" element={<AddManage />} />
            <Route path="/employees/areamanager" element={<AreaManager />} />
            <Route
              path="/employee/areamanager/addareamanager"
              element={<AddAreaManager />}
            />
            <Route path="/employees/field" element={<FieldEmployee />} />
            <Route path="/employees/field/addfield" element={<Addfield />} />

            <Route path="/ads/banner" element={<BannerAdd />} />
            <Route path="/ads/video" element={<VideoAdd />} />

            <Route path="/products/category" element={<Category />} />
            <Route
              path="/products/category/addcategory"
              element={<AddCategory />}
            />
            <Route path="/products/list" element={<ProductList />} />
            <Route path="/products/list/addproduct" element={<AddProduct />} />
            <Route path="/products/scheme" element={<ProductScheme />} />
            <Route path="/products/scheme/addscheme" element={<AddScheme />} />
            <Route path="/products/request" element={<ProductRequest />} />
            <Route
              path="/products/request/addrequest"
              element={<AddRequest />}
            />

            <Route path="/data/technical" element={<TechnicalList />} />
            <Route
              path="/data/technical/addtechnical"
              element={<AddTechnical />}
            />
            <Route path="/data/crops" element={<CropList />} />
            <Route path="/data/crops/addcrop" element={<AddCrop />} />
            <Route path="/data/insects" element={<InsectsList />} />
            <Route path="/data/insects/addinsert" element={<AddInsects />} />
            <Route path="/data/fungus" element={<FungusList />} />
            <Route path="/data/fungus/addfungus" element={<AddFungus />} />
            <Route path="/data/herbicide" element={<Herbicide />} />
            <Route
              path="/data/herbicide/addherbicide"
              element={<AddHerbicide />}
            />
            <Route path="/data/soil" element={<SoilList />} />
            <Route path="/data/soil/addsoil" element={<AddSoil />} />
            <Route path="/data/Godown" element={<Godown/>}/>
            <Route path="/data/godown/add" element={<AddGodown/>}/>

            <Route path="/complains/new" element={<NewComplaints />} />
            <Route
              path="/complains/new/addnewcomplaints"
              element={<AddNewComplaints />}
            />
            <Route path="/complains/technical" element={<Technical />} />
            <Route
              path="/complains/technical/addtechnical"
              element={<AddTech />}
            />
            <Route path="/complains/pending" element={<PendingComplaints />} />
            <Route
              path="/complains/completed"
              element={<CompletedComplaints />}
            />

            <Route path="/workmanagement/demo" element={<Demo />} />
            <Route path="/workmanagement/visit" element={<Visit />} />

            <Route path="reports/monthly" element={<MonthlyReport />} />
            <Route path="reports/annual" element={<AnnualReport />} />

            <Route path="settings/profile" element={<ProfileSettings />} />
            <Route path="settings/app" element={<AppSettings />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
