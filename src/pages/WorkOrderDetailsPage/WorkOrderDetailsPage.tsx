
import JobMaterialTable from "../../components/JobMaterialsTable/JobMaterialTable"
import WorkOrderDetails from "../../components/WorkOrderDetails/WorkOrderDetails"
import IssuenceTableModal from "../../components/IssuenceTableModal/IssuenceTableModal";

import "./WorkOrdersDetails.scss"
import { useState } from "react";
import { Material } from "../../model";

const WorkOrderDetailsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [checkedMaterials, setCheckedMaterials] = useState<Material[]>([]) 
  return (
    <section className="work-order__details-page">
    {
    openModal && (<IssuenceTableModal checkedMaterials={checkedMaterials}
                                      setCheckedMaterials = {setCheckedMaterials}
                                      setOpenModal = {setOpenModal} />)
  }
  
      <WorkOrderDetails setOpenModal = {setOpenModal}
                        checkedMaterials={checkedMaterials}/>   
      <JobMaterialTable setCheckedMaterials ={setCheckedMaterials}
                        checkedMaterials={checkedMaterials}/>
    </section>

  )
}

export default WorkOrderDetailsPage
