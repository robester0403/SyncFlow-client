import { useEffect, useState } from "react"
import { Employee, WorkOrder } from "../../model"
import { getEmployees, initateWorkOrder } from "../../utils/api";
import Loading from "../Loading/Loading";
import "./PendingTableOrder.scss"
import { useNavigate } from "react-router-dom";

interface Props {
  workOrders: WorkOrder[]
}



const PendingTableOrder: React.FC<Props> = ({ workOrders }) => {
  const [employees, setEmployees] = useState<Employee[]>();
  const [selectedEmployees, setSelectedEmployees] = useState<{ [key: number]: string }>({});
  const [rowErrors, setRowErrors] = useState<{ [key: number]: boolean }>({});

  const navigate = useNavigate()
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees()
      setEmployees(response)
    }
    fetchEmployees();
  }, [])

  const handleSelectChange = (work_order_id: number, selectedEmployee: string) => {
    setSelectedEmployees(prev => ({ ...prev, [work_order_id]: selectedEmployee }));
    setRowErrors(prev => ({ ...prev, [work_order_id]: false }));
  }

  if (!employees) {
    return <Loading />
  }

  const onClickHandler = async (work_order_id: number) => {
    const employee = selectedEmployees[work_order_id];
    if (employee === "" || employee === undefined) {
      setRowErrors(prev => ({ ...prev, [work_order_id]: true }));
      return;
    }
    setRowErrors(prev => ({ ...prev, [work_order_id]: false }));
    await initateWorkOrder({ work_order_id: work_order_id, employee_id: Number(employee) })
    navigate("/")
  }


  return (
    <div className="start-workorder">
         <div className="start-workorder__header">
           <p className="start-workorder__title">WORKORDER NUMBER</p>
           <p className="start-workorder__title">Client Name</p>
           <p className="start-workorder__title">Job Name</p>
           <p className="start-workorder__title">Assign Employee</p>
           <p className="start-workorder__title"></p>
         </div>
      {
        workOrders.map(({ workorder_Number, client_name, project_name, work_order_id }) => {
          return <div className="start-workorder__row" key={workorder_Number}>
            <div className="start-workorder__row__column ">
              <div className="start-workorder__mobile-heading">JOB NUMBER</div>
              {workorder_Number}
            </div>
            <div className="start-workorder__row__column">
              <div className="start-workorder__mobile-heading">CLIENT NAME</div>
              {client_name}
            </div>
            <div className="start-workorder__row__column ">
              <div className="start-workorder__mobile-heading">JOB NAME</div>
              {project_name}
            </div>
            <div className="start-workorder__row__column ">
              <div className="start-workorder__mobile-heading">EMPLOYEE ASSIGNED</div>
              <select value={selectedEmployees[work_order_id] || ''}
                onChange={(e) => handleSelectChange(work_order_id, e.target.value)}
                className={`start-workorder__select ${rowErrors[work_order_id] ? 'start-workorder__select--error' : ''}`}
              >
                <option value="" disabled >Select an Employee</option>
                {employees.map(employee => (
                  <option key={employee.employee_id}
                    className="start-workorder__select-option"
                    value={employee.employee_id}>
                    {employee.employee_name}</option>
                ))}
              </select>
            </div>
            <button className="start-workorder__button"
              onClick={() => onClickHandler(work_order_id)}>Start Order</button>
          </div>
        })
      }




    </div>
  )
}

export default PendingTableOrder
