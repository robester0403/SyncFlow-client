import Lottie from 'lottie-react'
import notFoundAnimation from "../../assets/animations/Comp 1.json"
import "./NotFound.scss"
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
  const navigate = useNavigate()
  return (<div className='not-found'>
     <button onClick={() => navigate("/")} className='not-found__button'>Back To Dashbord</button>
    <Lottie  animationData={notFoundAnimation}/>
  </div>
  )
}

export default NotFound
