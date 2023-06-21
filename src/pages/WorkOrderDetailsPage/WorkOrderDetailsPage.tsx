
import JobMaterialTable from "../../components/JobMaterialsTable/JobMaterialTable"
import WorkOrderDetails from "../../components/WorkOrderDetails/WorkOrderDetails"

import "./WorkOrdersDetails.scss"
const WorkOrderDetailsPage = () => {
   
  return (
    <section className="work-order__details-page">
      <WorkOrderDetails/>   
      <JobMaterialTable/>
    </section>
  )
}

export default WorkOrderDetailsPage
