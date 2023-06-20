import axios from "axios";
import { WorkOrder } from "../../interface";
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";

import "./WorkOrderDetails.scss"

const WorkOrderDetails = () => {
      
    const [workOrder , setWorkOrder] = useState<WorkOrder>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams();
    let id:string |undefined = params.id
useEffect(() =>{
    axios.get(`http://localhost:8080/workorders/${id}/workoder`)
    .then((res) =>{ setWorkOrder(res.data[0]);
                    setIsLoading(false)})  
    },[])

    if(isLoading){
        return <div>Loading...</div>
    }
     
if(workOrder){
    const {project_name,client_name ,employee_name ,workoder_Number,details} = workOrder;

    return (
        <div className="order-details">
          <div className="order-details__divider">
          <div className="order-details__box">
                <p className="order-details__label">
                   Work Order Number
                </p>
                <p className="order-details__info">
                   {workoder_Number}
                </p>                         
            </div>

            <div className="order-details__box">
            <div className="order-details__box">
                <p className="order-details__label">
                  Details
                </p>
                <p className="order-details__info">
                  {details}
                </p>
            </div>
            </div>
           
            <div className="order-details__box">
                <p className="order-details__label">
                  Project Name
                </p>
                <p className="order-details__info">
                     {project_name}
                </p>
            </div>
          </div>
            
            <div className="order-details__divider">
            <div className="order-details__box">
                <p className="order-details__label">
                  Client Name
                </p>
                <p className="order-details__info">
                  {client_name}
                </p>
            </div>

            <div className="order-details__box">
                <p className="order-details__label">
                  Employee Assigned
                </p>
                <p className="order-details__info">
                   {employee_name}
                </p>
            </div>
            </div>

        </div>
    )
}
}

export default WorkOrderDetails
