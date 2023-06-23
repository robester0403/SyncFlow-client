import { useState } from "react"
import { Material } from "../../model"
import "./IssuanceTableModal.scss"
import axios from "axios";
interface Props {
    checkedMaterials: Material[];
    setCheckedMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}


const IssuenceTableModal: React.FC<Props> = ({ checkedMaterials, setCheckedMaterials }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const onChangeHandler = (id: number, maxQuantity: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(event.target.value);
        if (newValue > maxQuantity) {
            newValue = maxQuantity;
        }
        setQuantities((prev) => ({
            ...prev,
            [id]: newValue,
        }));
    };

    const onClickHandler = () => {
        let updatedMaterial: Material[] = [...checkedMaterials];

        updatedMaterial = updatedMaterial.map(material => {
            if (quantities[material.material_id] !== undefined) {
                return {
                    ...material,
                    quantity: quantities[material.material_id]
                }
            } else {
                return material;
            }
        });
         

        updatedMaterial.forEach(eachMaterial => {
           const issuedMaterial  = {
            material_number : eachMaterial.material_number,
            quantity : eachMaterial.quantity,
            size : eachMaterial.size,
            receive_date: eachMaterial.receive_date,
            work_order_id : eachMaterial.work_order_id
           }
            axios.post(`http://localhost:8080/materials/${eachMaterial.material_id}`, issuedMaterial)
                .then(response => {console.log(response);})
                .catch(err => console.log(err));
        });

        // Clear checked materials after issuance
        setCheckedMaterials([]);
    }


    return (
        < section className="issuance-table">

            <div className="issuance-table__header">
                <p className="issuance-table__title">MATERIAL NUMBER</p>
                <p className="issuance-table__title">Quantity</p>
                <p className="issuance-table__title">Size</p>
                <p className="issuance-table__title">Date Recieved</p>
                <p className="issuance-table__title">location</p>
            </div>
            <div>
                {
                    checkedMaterials.map((material) => {
                        return <div key={material.material_id} className="issuance-table-row" >
                            <div className="issuance-table-row__column ">
                                <div className="issuance-table-row__mobile-heading">Material Number</div>
                                {material.material_number}
                            </div>
                            <div className="issuance-table-row__column issuance-table-row__column--quantity ">
                                <input className="issuance-table-row__column-quantity"
                                       value={quantities[material.material_id] || ''}
                                       onChange={onChangeHandler(material.material_id, material.quantity)} />
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
                <button className="issuance-table__button"  onClick={() => onClickHandler()} > Issue Material</button>
            </div>
        </section>
    )
}

export default IssuenceTableModal

