
import { Material } from "../../model";
import "./LocationComponent.scss"

import { Draggable, Droppable } from "react-beautiful-dnd";
interface Props{
  location : string;
  materials : Material[];
}

const LocationComponent:React.FC<Props> = ({location,materials}) => {
  return (
    <Droppable droppableId={location} >
      {
        (provided) =>(
          <div className="location-container"  
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {location}
          <div className="location-container__materials">
           {
            materials.map((material:Material,index:number) => {
               return  <Draggable draggableId={material.material_number} key={material.material_number} index={index}>
                        {provided =>(
                           <div key={material.material_id}  
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps} 
                            className="location-container__material">
                          {material.material_number }
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
