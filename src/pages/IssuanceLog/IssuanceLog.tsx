import IssuanceLogTable from "../../components/IssuanceLogTable/IssuanceLogTable";
import "./IssuanceLog.scss";

const IssuanceLog = () => {
  return (
    <div className="issuance-log-table">
    <div className="issuance-log-table__header">
    <p className="issuance-log-table__title">MATERIAL NUMBER</p>
    <p className="issuance-log-table__title">Quantity</p>
    <p className="issuance-log-table__title">Size</p>
    <p className="issuance-log-table__title">Date Recieved</p>
    <p className="issuance-log-table__title">Date Issued</p>
</div>
     <IssuanceLogTable/>
    
    </div>
  )
}

export default IssuanceLog
