import "./IntransitTable.scss";

import { Material } from "../../model"

import { Draggable } from 'react-beautiful-dnd';


interface Props {
    material: Material;
    index: number;
}


const IntransitTable :React.FC<Props> = ({ material, index }) => {
    const {  material_number, quantity,  size, status, material_id } = material;
  return (
   

        <Draggable draggableId={material_id.toString()} index={index}>
            {(provided,snapshot) => (
                <div className={`material-row ${snapshot.isDragging ? 'dragging' : ''}`}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref ={provided.innerRef}>
                    <div className="intransit-row__column ">
                        <div className="material-row__mobile-heading">Material Number</div>
                        {material_number}
                    </div>
                    <div className="intransit-row__column">
                        <div className="material-row__mobile-heading">Quantity</div>
                        {quantity}
                    </div>
                    <div className="intransit-row__column ">
                        <div className="material-row__mobile-heading">Size</div>
                        {size}
                    </div>
                    <div className="intransit-row__column ">
                        <div className="material-row__mobile-heading">Status</div>
                        {status}
                    </div>
                </div>
            )}

        </Draggable>
       
  )
}

export default IntransitTable
