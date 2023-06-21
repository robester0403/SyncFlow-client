
import { Material } from "../../model"
import "./JobMaterialsRow.scss"

import { Draggable } from 'react-beautiful-dnd';
interface Props {
    material: Material;
    index: number;
}


const JobMaterialsRow: React.FC<Props> = ({ material, index }) => {

    const { location, material_number, quantity, receive_date, size,  material_id } = material;

    return (
        <Draggable draggableId={material_id.toString()} index={index}>
            {(provided) => (
                <div className="material-row" {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref ={provided.innerRef}>
                    <div className="material-row__column ">
                        <div className="material-row__mobile-heading">Material Number</div>
                        {material_number}
                    </div>
                    <div className="material-row__column">
                        <div className="material-row__mobile-heading">Quantity</div>
                        {quantity}
                    </div>
                    <div className="material-row__column ">
                        <div className="material-row__mobile-heading">Size</div>
                        {size}
                    </div>
                   
                    <div className="material-row__column ">
                        <div className="material-row__mobile-heading">Date Recieved</div>
                        {receive_date ? receive_date.substring(0, 10) : "---"}
                    </div>
                    <div className="material-row__column ">
                        <div className="material-row__mobile-heading">Location</div>
                        {location}
                    </div>
                </div>
            )}

        </Draggable>

    )
}

export default JobMaterialsRow
