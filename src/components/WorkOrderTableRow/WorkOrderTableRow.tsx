import { WorkOrder } from "../../interface"
import "./WorkOrderTableRow.scss"
interface Props{
    workOrder : WorkOrder;
}



const WorkOrderTableRow: React.FC<Props>  = ({workOrder}) => {
    const{project_name,client_name ,employee_name ,workoder_Number} = workOrder
  return (
    <div className="work-order-table__row">
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
