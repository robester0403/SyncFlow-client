import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react";
import { AuthorizationContext } from "../../context/AuthContext";

const PrivateRoutes = () => {
  const [authorized] = useContext(AuthorizationContext)
  return (
    authorized ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes
