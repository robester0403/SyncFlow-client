import { useState } from "react"
import { IssuedMaterial, Material } from "../../model"
import "./IssuanceTableModal.scss"
import { issueMaterial } from "../../utils/api";
interface Props {
    checkedMaterials: Material[];
    setCheckedMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    employee: string;
    updateState : () => Promise<void>
}



const IssuenceTableModal: React.FC<Props> = ({ checkedMaterials, setCheckedMaterials, setOpenModal, employee,updateState }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [employeeIssued, setEmployeeIssued] = useState<string[]>([])
    const [error,setError] = useState<{ [key: number]: boolean}>({})
    const onChangeHandler = (id: number, maxQuantity: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(event.target.value);
        if (newValue > maxQuantity) {
            newValue = maxQuantity;
        }
        setQuantities((prev) => ({
            ...prev,
            [id]: newValue,
        }));

        setError((prev) => ({
            ...prev,
            [id]: false
        }))
    };



    const onClickHandler = () => {
        let updatedMaterial: Material[] = [...checkedMaterials];
        let newErrors: { [key: number]: boolean } = {};
        updatedMaterial = updatedMaterial.map(material => {
            if (quantities[material.material_id] !== undefined && quantities[material.material_id] > 0) {
                return {
                    ...material,
                    quantity: quantities[material.material_id]
                }
            } else {
                newErrors[material.material_id] = true;
                return material;
            }
        });
        console.log(error)

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        updatedMaterial.forEach(eachMaterial => {
            const issued_employee = employeeIssued.join(',');
            const issuedMaterial: IssuedMaterial = {
                material_number: eachMaterial.material_number,
                quantity: eachMaterial.quantity,
                size: eachMaterial.size,
                issued_employee: issued_employee,
                work_order_id: eachMaterial.work_order_id
            }
            issueMaterial(eachMaterial.material_id, issuedMaterial);

        });

        setCheckedMaterials([]);
        setOpenModal(false);
        updateState();
    }

    const handleEmployeeIssued = (employee: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setEmployeeIssued(prev => {
            if (isChecked) {
                return [...prev, employee];
            } else {
                return prev.filter(emp => emp !== employee);
            }
        });
    }


    return (
        <div className="issuance" >
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
                                    <input className={`issuance-table-row__column-quantity ${error[material.material_id] ? 'issuance-table-row__column-quantity--error' : ''}`}
                                        value={quantities[material.material_id] || ''}
                                        placeholder="Quantity"
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
                    <div className="issuance-table__submit-container">
                        <div className="issuance-table__employee-name">
                            <h3 className="issuance-table__employee-title">Issued To : </h3>
                            {employee.split(',').map((employee) => (
                                <label className="issuance-table__employee-label"
                                    key={employee}>
                                    {employee}
                                    <input type="checkbox"
                                        className="issuance-table__employee-checkbox"
                                        onChange={handleEmployeeIssued(employee)} />
                                </label>
                            ))}
                        </div>
                        <button className="issuance-table__button" 
                                 onClick={() => onClickHandler()} > 
                                 Issue Material</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default IssuenceTableModal

