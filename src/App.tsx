import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import WorkOrderPage from "./pages/WorkOrderPage/WorkOrderPage"
import WorkOrderDetailsPage from "./pages/WorkOrderDetailsPage/WorkOrderDetailsPage";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

import"./App.scss";
import LocationPage from "./pages/LocationPage/LocationPage";
import IssuanceLog from "./pages/IssuanceLog/IssuanceLog";
function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="sideBar">
      <Sidebar />
      <Routes>
        <Route path="/" element={<WorkOrderPage />} />
        <Route path="/workOrder/:id" element={<WorkOrderDetailsPage />} />
        <Route path="/locations" element={<LocationPage/>}/>
        <Route path="/issuanceLog" element={<IssuanceLog/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
