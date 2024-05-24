import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "./hooks/useAuth";



const RequireAuth = ({RolesPermitidos}) => {

    const { auth } = useAuth();
    const location = useLocation()

        
  return (
    RolesPermitidos.includes(auth?.rol)
        ? <Outlet />
        : auth?.user 
        ? <Navigate to="/no-autorizado" state={{ from: location}} replace />
        : <Navigate to="/ingresa" state={{ from: location}} replace />
  );
}

export default RequireAuth