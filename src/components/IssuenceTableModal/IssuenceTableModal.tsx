import { useState } from "react"
import { Material } from "../../model"
import "./IssuanceTableModal.scss"
interface Props {
    checkedMaterials: Material[]
}
const IssuenceTableModal: React.FC<Props> = ({ checkedMaterials }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const onChangeHandler = (id: number,maxQuantity: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(event.target.value);
        if (newValue > maxQuantity) {
            newValue = maxQuantity;
          }
        setQuantities((prev) => ({
          ...prev,
          [id]: newValue,
        }));
      };

    return (
        < section className="issuance-table">
            <div>
            {
                checkedMaterials.map((material) => {
                    return <div key={material.material_id} className="issuance-table-row" >
                        <div className="issuance-table-row__column ">
                            <div className="issuance-table-row__mobile-heading">Material Number</div>
                            {material.material_number}
                        </div>
                        <div className="issuance-table-row__column">
                           <input value={quantities[material.material_id] || ''}
                                  onChange={onChangeHandler(material.material_id,material.quantity)}   />
                        </div>
                        <div className="issuance-table-row__column ">
                            <div className="issuance-table-row__mobile-heading">Size</div>
                            {material.size}
                        </div>

                        <div className="issuance-table-row__column ">
                            <div className="issuance-table-row__mobile-heading">Date Recieved</div>
                            {material.receive_date ? material.receive_date.substring(0, 10) : "---"}
                        </div>
                        <div className="issuance-table-row__column ">
                            <div className="issuance-table-row__mobile-heading">Location</div>
                            {material.location}
                        </div>
                    </div>
                })
            }
         <button className="issuance-table__button"> Issue Material</button>
         </div>
        </section>
    )
}

export default IssuenceTableModal
