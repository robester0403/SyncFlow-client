import axios from "axios";
import { useEffect, useState } from "react";
import "./LocationPage.scss";
import LocationComponent from "../../components/LocationComponent/LocationComponent";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Locations, Material } from "../../model";
import { updateMaterialLocation } from "../../utils/api";
import Loading from "../../components/Loading/Loading";
import { locationURL } from "../../utils/api";
interface LocationContainer {
  location: Locations;
  materials: Material[];
}

const LocationPage = () => {
  const [locations, setLocations] = useState<LocationContainer[]>();
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    // you can probrably put the api logic in your utils folder.
    // this file does not necessarily care about what's in the axios get.
    // refactor the axios.get into a const locationData = getLocations(locationURL) and then
    // locationData.map...
    axios.get(locationURL).then((res) => {
      const locationsWithMaterial = res.data.map(
        async (location: Locations) => {
          // weird nesting of another get call here. maybe it should all be handled in the backend,
          // and returned to you as an more organized object.
          const materialsRes = await axios.get(
            `${locationURL}/materials/${location.location}`
          );
          return {
            // this is definitely backend logic
            location: location,
            materials: materialsRes.data.filter(
              (material: Material) => material.status === "received"
            ),
          };
        }
      );

      // I would stick with async await instead of mixing promises
      Promise.all(locationsWithMaterial).then((completed) =>
        setLocations(completed)
      );
    });
  }, []);

  // weird loading logic explained before. you can just do if(!locations) return <Loading />
  if (!locations) {
    return <Loading />;
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const updatedLocation: LocationContainer[] = [...locations];
    const sourceLocation = updatedLocation.find(
      (loc) => loc.location.location === source.droppableId
    );
    const destinationLocation = updatedLocation.find(
      (loc) => loc.location.location === destination.droppableId
    );

    if (
      !sourceLocation ||
      !destinationLocation ||

      // should the destination location logic be a different condition than the drag not finding a source or destination?
      destinationLocation.materials.length >= 10
    ) {
      setIsLimitReached(true);
      setTimeout(() => setIsLimitReached(false), 5000);
      return;
    }

    const [removed] = sourceLocation.materials.splice(source.index, 1);
    destinationLocation.materials.splice(destination.index, 0, removed);
    setLocations(updatedLocation);

    // axios req to update material location
    updateMaterialLocation(draggableId, {
      location: Number(destinationLocation.location.location_id),
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="location-table">
        <h1 className="location-table__heading">
          Geographical Material Mapping
        </h1>
        {/* spelling error componnets*/}
        <div className="location-table__componnets">
          {locations.map((eachLocation) => {
            return (
              <LocationComponent
                location={eachLocation.location.location}
                materials={eachLocation.materials}
                key={eachLocation.location.location_id}
              />
            );
          })}
          {/* notification-hidden is not needed here as the component will always be rendered with isLimitReached being true */}
          {isLimitReached && (
            <div
              className={`notification ${
                isLimitReached ? "" : "notification-hidden"
              }`}
            >
              There is not enough space at this location
            </div>
          )}
        </div>
      </section>
    </DragDropContext>
  );
};

export default LocationPage;
