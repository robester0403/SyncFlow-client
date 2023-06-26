import { useEffect, useState } from "react"
import { Employee, WorkOrder } from "../../model"
import { getEmployees, initateWorkOrder } from "../../utils/api";
import Loading from "../Loading/Loading";
import "./PendingTableOrder.scss"

interface Props {
  workOrders: WorkOrder[]
}



const PendingTableOrder: React.FC<Props> = ({ workOrders }) => {
  const [employees, setEmployees] = useState<Employee[]>();
  const [selectedEmployees, setSelectedEmployees] = useState<{ [key: number]: string }>({});
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees()
      setEmployees(response)
    }
    fetchEmployees();
  }, [])
   
  const handleSelectChange = (work_order_id: number, selectedEmployee: string) => {
    setSelectedEmployees(prev => ({ ...prev, [work_order_id]: selectedEmployee }));
  }

  if (!employees) {
    return <Loading/>
  }
  
  const onClickHandler = async(work_order_id:number) =>{
    const employee = selectedEmployees[work_order_id];
      initateWorkOrder({work_order_id : work_order_id ,employee_id : Number(employee) })
  }
 

  return (
    <div className="start-workorder">
      {
        workOrders.map(({ workorder_Number, client_name, project_name ,work_order_id}) => {
          return <div className="work-order-table__row" key={workorder_Number}>
            <div className="work-order-table__row__column ">
              <div className="work-order-table__mobile-heading">JOB NUMBER</div>
              {workorder_Number}
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
              <select onChange={(e) => handleSelectChange(work_order_id, e.target.value)}
                placeholder="Select Employee"   >
                {employees.map(employee => (
                  <option key={employee.employee_id} 
                          value={employee.employee_id}>
                           {employee.employee_name}</option>
                ))}
              </select>
            </div>
            <button onClick={() => onClickHandler(work_order_id)}>Initate Order</button>
          </div>
        })
      }




    </div>
  )
}

export default PendingTableOrder
