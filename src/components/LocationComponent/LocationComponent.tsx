import { Material } from "../../model";
import "./LocationComponent.scss"
interface Props{
    location : string;
}

const LocationComponent:React.FC<Props> = ({location}) => {
  return (
    <div className="location-container">
      {location}
      <div className="location-container__materials">
      <div className="location-container__material">M001</div>
      <div className="location-container__material">M001</div>
      </div>
    </div>
  )
}

export default LocationComponent
