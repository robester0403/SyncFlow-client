import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const PrivateRoutes = () => {
  const {auth}= useContext(AuthContext)
  return (
    auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes
