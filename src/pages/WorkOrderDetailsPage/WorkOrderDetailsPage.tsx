
import JobMaterialTable from "../../components/JobMaterialsTable/JobMaterialTable"
import WorkOrderDetails from "../../components/WorkOrderDetails/WorkOrderDetails"
import IssuenceTableModal from "../../components/IssuenceTableModal/IssuenceTableModal";

import "./WorkOrdersDetails.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Material, WorkOrder } from "../../model";
import { getWorkOrderDetails } from "../../utils/api";

const WorkOrderDetailsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [checkedMaterials, setCheckedMaterials] = useState<Material[]>([]) 
  const [workOrder, setWorkOrder] = useState<WorkOrder>();
 const {id} = useParams()
  useEffect(() => {
    const fetchWorkOrders = async () => {
      const response = await getWorkOrderDetails(id)
      setWorkOrder(response[0])
    }
    fetchWorkOrders()
  }, [workOrder])



  return (
    <section className="work-order__details-page">
    {
    openModal && (<IssuenceTableModal checkedMaterials={checkedMaterials}
                                      setCheckedMaterials = {setCheckedMaterials}
                                      setOpenModal = {setOpenModal}
                                      />)
  }
  
      <WorkOrderDetails workOrder = {workOrder}
                        setOpenModal = {setOpenModal}
                        checkedMaterials={checkedMaterials}/>   
      <JobMaterialTable setCheckedMaterials ={setCheckedMaterials}
                        checkedMaterials={checkedMaterials}/>
    </section>

  )
}

export default WorkOrderDetailsPage
