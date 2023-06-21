import axios from "axios";
import { WorkOrder } from "../../model";
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";

import "./WorkOrderDetails.scss"

const WorkOrderDetails:React.FC  = () => {
      
    const [workOrder , setWorkOrder] = useState<WorkOrder>();
    const params = useParams();
    let id:string |undefined = params.id
useEffect(() =>{
    axios.get(`http://localhost:8080/workoders/${id}/workoder`)
    .then((res) =>{ console.log(res)
                    setWorkOrder(res.data[0]);})
    .catch((err) =>{
       console.log(err,"details")
    })                  
    },[])

    if(!workOrder){
        return <div>Loading...</div>
    }
     


    return (
        <div className="order-details">
          <div className="order-details__divider">
          <div className="order-details__box">
                <p className="order-details__label">
                   Work Order Number
                </p>
                <p className="order-details__info">
                   {workOrder.workoder_Number}
                </p>                         
            </div>

            <div className="order-details__box">
            <div className="order-details__box">
                <p className="order-details__label">
                  Details
                </p>
                <p className="order-details__info">
                  {workOrder.details}
                </p>
            </div>
            </div>
           
            <div className="order-details__box">
                <p className="order-details__label">
                  Project Name
                </p>
                <p className="order-details__info">
                     {workOrder.project_name}
                </p>
            </div>
          </div>
            
            <div className="order-details__divider">
            <div className="order-details__box">
                <p className="order-details__label">
                  Client Name
                </p>
                <p className="order-details__info">
                  {workOrder.client_name}
                </p>
            </div>

            <div className="order-details__box">
                <p className="order-details__label">
                  Employee Assigned
                </p>
                <p className="order-details__info">
                   {workOrder.employee_name}
                </p>
            </div>
            </div>
        </div>
    )
  }

export default WorkOrderDetails;
