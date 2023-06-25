
import { Material, WorkOrder } from "../../model";
import "./WorkOrderDetails.scss"


interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  checkedMaterials: Material[];
  workOrder : WorkOrder | undefined;
}

const WorkOrderDetails: React.FC<Props> = ({ setOpenModal, checkedMaterials ,workOrder}) => {


  if (!workOrder) {
    return <div>Loading...</div>
  }

  const showModal = () => {
    setOpenModal(true)
  }


  return (
    <>
      <div className="order-details-header">
        <p className="order-details-header__name"> Workorder Details</p>
        <div>
          <button className="order-details-header__button" 
                  disabled={checkedMaterials.length === 0}
                  onClick={() => showModal()} > Issue Material</button>
        </div>
      </div>
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
    </>
  )
}

export default WorkOrderDetails;
