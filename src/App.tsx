import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

// Styling
import "./App.scss";

// Pages
import WorkOrderPage from "./pages/WorkOrderPage/WorkOrderPage"
import WorkOrderDetailsPage from "./pages/WorkOrderDetailsPage/WorkOrderDetailsPage";
import LocationPage from "./pages/LocationPage/LocationPage";
import IssuanceLog from "./pages/IssuanceLog/IssuanceLog";
import PendingWorkOrderPage from "./pages/PendingWorkOrderPage/PendingWorkOrderPage";
import EmployeeData from "./pages/EmployeeData/EmployeeData";
import NotFound from "./components/NotFound/NotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
import RequiredAuth from "./utils/PrivateRoutes/RequiredAuth";

import useAuth from "./hooks/useAuth";

function App() {
  const {auth}= useAuth();
  return (
    <BrowserRouter>
      <Header />
      <div className="sideBar">
        {auth.authorized && <Sidebar />}   
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route element={<RequiredAuth allowedRoles={["welder","material handler"]} />}>
          <Route path="/dashboard" element={<WorkOrderPage />}/>
          <Route path="/workOrder/:id" element={<WorkOrderDetailsPage />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={["material handler"]} />}>
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/issuanceLog" element={<IssuanceLog />} />
          <Route path="/workorders" element={<PendingWorkOrderPage />} />
          <Route path="/employeeData" element={<EmployeeData />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
