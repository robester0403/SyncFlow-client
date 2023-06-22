import { useEffect, useState } from "react";
import { Material } from "../../model";
import "./LocationComponent.scss"
import axios from "axios";
import { Draggable, Droppable } from "react-beautiful-dnd";
interface Props{
    location : string;
    index : number;
}

const LocationComponent:React.FC<Props> = ({location,index}) => {
  const [materials, setMaterials] = useState<Material[]>()
 
  useEffect(() =>{
    axios.get(`http://localhost:8080/location/materials/${location}`)
    .then((res) => setMaterials(res.data.filter((material:Material) => material.status === "received")))
    .catch((err) =>{
      console.log(err)
    })
  },[])

  if(!materials){
    return <div>Loading...</div>
  }


  return (
    <Droppable droppableId={location}>
      {
        (provided) =>(
          <div className="location-container"  {...provided.droppableProps}
          ref={provided.innerRef}>
          {location}
          <div className="location-container__materials">
           {
            materials.map((material:Material,index:number) => {
               return  <Draggable draggableId={material.material_number} index={index}>
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
