// TOOLS
import axios from "axios";
import { useEffect, useState } from "react";
// Components
import WorkOrderPageHeader from "../../components/WorkOrderPageHeader/WorkOrderPageHeader";
import WorkOrderTableRow from "../../components/WorkOrderTableRow/WorkOrderTableRow";
import { WorkOrder } from "../../interface";

import "./WorkOrderPage.scss"


const WorkOrderPage = () => {
 const[workOrders , setWorkOrders] = useState<WorkOrder[]>([])
 const [loading,setLoading] = useState<boolean>(true)
  useEffect(() =>{
   axios.get("http://localhost:8080/workorders")
   .then((res) =>{
      setWorkOrders(res.data);
      setLoading(false);
   })
  },[])

  if(loading){
    return <div>Loading....</div>
  }

  return (
    <section className="container">
    <div className="container__card">
        <div className="container__card__overflow">
            <WorkOrderPageHeader/>
            <div className="container__card__content">
                {
                    workOrders.map((workOrder) => {
                        return  <WorkOrderTableRow workOrder={workOrder} />
                    })
                }
            </div>
        </div>
    </div>
</section>
  )
}

export default WorkOrderPage
