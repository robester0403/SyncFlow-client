// TOOLS
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import WorkOrderPageHeader from "../../components/WorkOrderPageHeader/WorkOrderPageHeader";
import WorkOrderTableRow from "../../components/WorkOrderTableRow/WorkOrderTableRow";
import { WorkOrder } from "../../model";

import "./WorkOrderPage.scss"


const WorkOrderPage = () => {

 const[workOrders , setWorkOrders] = useState<WorkOrder[]>()
 
  useEffect(() =>{
   axios.get("http://localhost:8080/workorders")
   .then((res) =>{
      setWorkOrders(res.data);
   })
   .catch((err) =>{
      console.log(err)
   })
  },[])

  if(!workOrders){
    return <div>Loading....</div>
  }


  return (
    <section className="container">
       <div className="work-orders__header">
        <h1 className="work-orders__title">WorkOrders</h1>
        <div className="work-orders__cta">
          <div className="work-orders__search">
            <input
              type="text"
              name="search"
              id="search"
              className="work-orders__search-input"
              placeholder="Search..."
            />
          </div>
          <Link to="/workorders/add" className="work-orders__add-link">
            <button className="work-orders__add">+ Add New WorkOrder</button>
          </Link>
        </div>
      </div>  
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
