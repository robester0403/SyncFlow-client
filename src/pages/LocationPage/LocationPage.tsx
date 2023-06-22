import axios from "axios";
import { useEffect, useState } from "react";
import "./LocationPage.scss";
import { Material } from "../../model";
import LocationComponent from "../../components/LocationComponent/LocationComponent";
import { DragDropContext, Droppable,  } from "react-beautiful-dnd";


const LocationPage = () => {
  const [materials,setMaterials] = useState<Material[]>([])
  useEffect(() =>{
    axios.get('http://localhost:8080/materials')
    .then((res) => {
       setMaterials(res.data)
    })
  },[])
if(!materials){
  return <div>Loading...</div>
}


  return (
    <DragDropContext onDragEnd={() =>{}}>
    <section className="location-table">
      <Droppable droppableId="A">
         {
        (provided)=>(<div  ref={provided.innerRef}  {...provided.droppableProps}>
        <LocationComponent location  = "A"  />
        {provided.placeholder}
        </div>)
      }
      </Droppable>
      
      <Droppable droppableId="B">
         {
        (provided)=>(<div  ref={provided.innerRef}  {...provided.droppableProps}>
        <LocationComponent location  = "B"  />
        {provided.placeholder}
        </div>)
      }
      </Droppable>
      
      <Droppable droppableId="C">
         {
        (provided)=>(<div  ref={provided.innerRef}  {...provided.droppableProps}>
        <LocationComponent location  = "C"  />
        {provided.placeholder}
        </div>)
      }
      </Droppable>
      
      <Droppable droppableId="D">
         {
        (provided)=>(<div  ref={provided.innerRef}  {...provided.droppableProps}>
        <LocationComponent location  = "D"  />
        {provided.placeholder}
        </div>)
      }
      </Droppable>
      
      <Droppable droppableId="E">
         {
        (provided)=>(<div  ref={provided.innerRef}  {...provided.droppableProps}>
        <LocationComponent location  = "E"  />
        {provided.placeholder}
        </div>)
      }
      </Droppable>
      
      <Droppable droppableId="F">
         {
        (provided)=>(<div  ref={provided.innerRef}  {...provided.droppableProps}>
        <LocationComponent location  = "F"  />
        {provided.placeholder}
        </div>)
      }
      </Droppable>
      
      <Droppable droppableId="G">
         {
        (provided)=>(<div  ref={provided.innerRef}  {...provided.droppableProps}>
        <LocationComponent location  = "G"  />
        {provided.placeholder}
        </div>)
      }
      </Droppable>
    </section>
    </DragDropContext>
  )
}

export default LocationPage
