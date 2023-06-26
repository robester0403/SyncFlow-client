
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/Loading 2.json";
import "./Loading.scss"
const Loading = () => {
  return (
    <Lottie className="loading" animationData={loadingAnimation} />
  )
}

export default Loading
