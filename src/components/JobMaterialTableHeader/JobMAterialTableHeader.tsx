import "./JobMaterialTableHeader.scss"

const JobMAterialTableHeader = () => {
  return (
  <div className="materials-table__header">
    <p className="materials-table__title">MATERIAL NUMBER</p>
    <p className="materials-table__title">Quantity</p>
    <p className="materials-table__title">Size</p>
    <p className="materials-table__title">Status</p>
    <p className="materials-table__title">Date Recieved</p>
    <p className="materials-table__title">location</p>
  </div>
  )
}

export default JobMAterialTableHeader
