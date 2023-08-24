import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {
     allowedRoles: string[]
}

const RequiredAuth: React.FC<Props> = ({ allowedRoles }) => {
     const { auth } = useAuth();
     const location = useLocation();
     console.log(auth)
     return (
          (auth.authorized && (allowedRoles.find(roles => roles === auth.role))) ?
               <Outlet /> : auth.authorized ? <Navigate to="/dashboard" state={{ from: location }} replace />
                    : <Navigate to="/" state={{ from: location }} replace />
     );
}
export default RequiredAuth
