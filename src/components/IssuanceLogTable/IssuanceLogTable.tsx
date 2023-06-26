
import { IssuedMaterialLog } from "../../model"
import Loading from "../Loading/Loading"
import "./IssuanceLogTable.scss"

interface Props{
  issuedMaterial : IssuedMaterialLog[]
}


const IssuanceLogTable :React.FC<Props> = ({issuedMaterial}) => {


  if (!issuedMaterial) {
    return <Loading/>
  }

  return (
    <>
      {issuedMaterial.map(({issuanceLog_id,material_number,quantity,size,issued_date,issued_time,issued_employee
}) => {
        return <div className="issuance-log-row" key={issuanceLog_id}>
          <div className="issuance-log-row__column ">
            <div className="material-row__mobile-heading">Material Number</div>
            {material_number}
          </div>
          <div className="issuance-log-row__column">
            <div className="material-row__mobile-heading">Quantity</div>
            {quantity}
          </div>
          <div className="issuance-log-row__column ">
            <div className="material-row__mobile-heading">Size</div>
            {size}
          </div>
          <div className="issuance-log-row__column ">
            <div className="material-row__mobile-heading">IssuedTime</div>
            {issued_time}
          </div>
          <div className="issuance-log-row__column ">
            <div className="material-row__mobile-heading">IssuedDate</div>
            {issued_date.substring(0,10)}
          </div>
          <div className="issuance-log-row__column ">
            <div className="material-row__mobile-heading">Employee</div>
            {issued_employee}
          </div>
        </div>
      })}
    </>
  )
}

export default IssuanceLogTable
