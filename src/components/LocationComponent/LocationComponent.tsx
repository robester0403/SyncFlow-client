
import { Material } from "../../model";
import "./LocationComponent.scss"

import { Draggable, Droppable } from "react-beautiful-dnd";
interface Props {
  location: string;
  materials: Material[];
}

const LocationComponent: React.FC<Props> = ({ location, materials }) => {
  return (
    <Droppable droppableId={location} >
      {
        (provided, snapshot) => (
          <div className={`location-container ${snapshot.isDraggingOver ? "location-container--dragging-over" : ""}`}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            <h2 className="location-container__heading">{location}</h2>
            <div className="location-container__materials">
              {
                materials.map((material: Material, index: number) => {
                  return <Draggable draggableId={material.material_number} key={material.material_number} index={index}>
                    {(provided, snapshot) => (
                      <div key={material.material_id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`location-container__material 
                                       ${snapshot.isDragging ? "location-container__material--is-dragging" : ""}`}>
                        {material.material_number}
                      </div>
                    )}
                  </Draggable>
                })
              }
            </div>
            {provided.placeholder}
          </div>
        )
      }

    </Droppable>
  )
}

export default LocationComponent
