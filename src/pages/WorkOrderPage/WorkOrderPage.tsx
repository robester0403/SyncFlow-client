// TOOLS
import axios from "axios";
import { useEffect, useState } from "react";

// Components
import WorkOrderPageHeader from "../../components/WorkOrderPageHeader/WorkOrderPageHeader";
import WorkOrderTableRow from "../../components/WorkOrderTableRow/WorkOrderTableRow";
import { WorkOrder } from "../../model";

import "./WorkOrderPage.scss"


const WorkOrderPage = () => {

 const[workOrders , setWorkOrders] = useState<WorkOrder[]>()
 
  useEffect(() =>{
   axios.get("http://localhost:8080/workoders")
   .then((res) =>{
      setWorkOrders(res.data);
   })
  },[])

  if(!workOrders){
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
