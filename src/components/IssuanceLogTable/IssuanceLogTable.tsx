import { useEffect, useState } from "react"
import { getIssuedMaterial } from "../../utils/api"
import { IssuedMaterial } from "../../model"
import "./IssuanceLogTable.scss"
interface IssuedMaterialLog extends IssuedMaterial {
  issuanceLog_id: number;
  receive_date: string;
  issued_date : string;

}


const IssuanceLogTable = () => {
  const [issuedMaterial, setIssuedMaterial] = useState<IssuedMaterialLog[]>()
  useEffect(() => {
    const fetchIssuedMaterials = async () => {
      try {
        const response = await getIssuedMaterial()
        setIssuedMaterial(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchIssuedMaterials();
  }, [])

  if (!issuedMaterial) {
    return <div>Loading...</div>
  }

  return (
    <>
      {issuedMaterial.map(({material_number,quantity,size,issued_date}) => {
        return <div className="issuance-log-row">
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
            <div className="material-row__mobile-heading">IssuedDate</div>
            {issued_date.substring(0,10)}
          </div>
        </div>
      })}
    </>
  )
}

export default IssuanceLogTable
