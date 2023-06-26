import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import WorkOrderPage from "./pages/WorkOrderPage/WorkOrderPage"
import WorkOrderDetailsPage from "./pages/WorkOrderDetailsPage/WorkOrderDetailsPage";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.scss";
import LocationPage from "./pages/LocationPage/LocationPage";
import IssuanceLog from "./pages/IssuanceLog/IssuanceLog";
import PendingWorkOrderPage from "./pages/PendingWorkOrderPage/PendingWorkOrderPage";
import EmployeeData from "./pages/EmployeeData/EmployeeData";
import NotFound from "./components/NotFound/NotFound";
function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="sideBar">
        <Sidebar />
        <Routes>
          <Route path="/" element={<WorkOrderPage />} />
          <Route path="/workOrder/:id" element={<WorkOrderDetailsPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/issuanceLog" element={<IssuanceLog />} />
          <Route path= "/workorders" element={<PendingWorkOrderPage/>}/>
          <Route path= "/employeeData" element={<EmployeeData/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
