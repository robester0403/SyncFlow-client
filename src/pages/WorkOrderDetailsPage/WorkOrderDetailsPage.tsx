
import JobMaterialTable from "../../components/JobMaterialsTable/JobMaterialTable"
import WorkOrderDetails from "../../components/WorkOrderDetails/WorkOrderDetails"

import "./WorkOrdersDetails.scss"
const WorkOrderDetailsPage = () => {
   
  return (
    <section >
      <WorkOrderDetails/>   
      <JobMaterialTable/>
    </section>
  )
}

export default WorkOrderDetailsPage
