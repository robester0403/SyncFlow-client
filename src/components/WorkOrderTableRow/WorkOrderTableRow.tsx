import { WorkOrder } from "../../model"
import "./WorkOrderTableRow.scss"
import { useNavigate } from "react-router-dom";
interface Props{
    workOrder : WorkOrder;
}



const WorkOrderTableRow: React.FC<Props>  = ({workOrder}) => {
    const navigate = useNavigate();
    const{project_name,client_name ,employee_name ,workoder_Number,work_order_id} = workOrder
  return (
    <div className="work-order-table__row" onClick={() => {navigate(`/workOrder/${work_order_id}`)}}>
    <div className="work-order-table__row__column ">
        <div className="work-order-table__mobile-heading">JOB NUMBER</div>
            {workoder_Number}
    </div>
    <div className="work-order-table__row__column">
        <div className="work-order-table__mobile-heading">CLIENT NAME</div>
        {client_name}
    </div>
    <div className="work-order-table__row__column ">
    <div className="work-order-table__mobile-heading">JOB NAME</div>
        {project_name}
    </div>
    <div className="work-order-table__row__column ">
    <div className="work-order-table__mobile-heading">EMPLOYEE ASSIGNED</div>
        {employee_name}
    </div>
</div>
  )
}

export default WorkOrderTableRow
