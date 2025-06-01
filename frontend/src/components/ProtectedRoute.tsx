import { Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute = () => {
   const {isAuthenticated} = useAuth();
   if(!isAuthenticated()){
    return <Navigate to="/login" replace={true} />
   }
 return (
  <Outlet />
 )
}

export default ProtectedRoute