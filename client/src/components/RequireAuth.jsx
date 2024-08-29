import { useAuth } from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

// This component is a wrapper for protected routes that require authentication
function RequireAuth() {
    const { user, auth_loading } = useAuth();

    if(!auth_loading) {
        return user ? <Outlet /> : <Navigate to="/login" />;
    }
    else {
        return (
            <div className="p-5 h-screen flex flex-col items-start">
                <h1 className="font-bold text-xl">Loading...</h1>
            </div>
        )
    }
}   

export default RequireAuth;