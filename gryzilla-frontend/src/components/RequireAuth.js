import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export const RequireAuth = ({children}) => {
    const auth = useAuth();
    
    if(!auth.isLogged) {
        return <Navigate to="/"/>
    }

    return children;
}