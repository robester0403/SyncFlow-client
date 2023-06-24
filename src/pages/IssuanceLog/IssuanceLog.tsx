import IssuanceLogTable from "../../components/IssuanceLogTable/IssuanceLogTable"

const IssuanceLog = () => {
  return (
    <>
           <div className="issuance-table__header">
    <p className="issuance-table__title">MATERIAL NUMBER</p>
    <p className="issuance-table__title">Quantity</p>
    <p className="issuance-table__title">Size</p>
    <p className="issuance-table__title">Date Recieved</p>
    <p className="issuance-table__title">Date Issued</p>
</div>
     <IssuanceLogTable/>
    
    </>
  )
}

export default IssuanceLog
