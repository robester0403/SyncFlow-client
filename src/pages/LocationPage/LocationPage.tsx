import axios from "axios";
import { useEffect, useState } from "react";
import "./LocationPage.scss";
import LocationComponent from "../../components/LocationComponent/LocationComponent";
import { DragDropContext, DropResult  } from "react-beautiful-dnd";
import { Locations, Material } from "../../model";

interface LocationContainer{
 location : Locations
 materials : Material[]
}


const LocationPage = () => {
  const [locations,setLocations] = useState<LocationContainer[]>();

  useEffect(() =>{
    axios.get('http://localhost:8080/location')
    .then((res) => {
       const locationsWithMaterial = res.data.map(async (location : Locations) =>{
        const materialsRes = await axios.get(`http://localhost:8080/location/materials/${location.location}`);
        return {location: location, materials: materialsRes.data.filter((material: Material) => material.status === "received")};
       });
       Promise.all(locationsWithMaterial).then((completed) => setLocations(completed))
    })
  },[])
if(!locations){
  return <div>Loading...</div>
}


const onDragEnd = ( result: DropResult) =>{
  const {destination,source,draggableId} = result
      if(!destination) return;
   console.log(result)
      const updatedLocation: LocationContainer[] = [...locations];
      const sourceLocation = updatedLocation.find(loc => loc.location.location === source.droppableId);
      const destinationLocation = updatedLocation.find(loc => loc.location.location === destination.droppableId);
      if (!sourceLocation || !destinationLocation) return locations;
      const [removed] = sourceLocation.materials.splice(source.index, 1);
      destinationLocation.materials.splice(destination.index, 0, removed);
      setLocations(updatedLocation);
      axios.patch(`http://localhost:8080/materials/${draggableId}`,{location : Number(destinationLocation.location.location_id)})
      .then((res) => console.log(res))
      .catch((err) =>{
        console.log(err)
      })

}


  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <section className="location-table">

      {
        locations.map((eachLocation) =>{
          return <LocationComponent location={eachLocation.location.location}
                                    materials={eachLocation.materials}
                                    key={eachLocation.location.location_id}/>
        })
      }
    </section>
    </DragDropContext>
  )
}

export default LocationPage
