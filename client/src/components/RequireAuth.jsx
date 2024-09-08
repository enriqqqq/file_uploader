import { useAuth } from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

// This component is a wrapper for protected routes that require authentication
function RequireAuth() {
    const { user, authLoading } = useAuth();

    useEffect(() => {
        console.log('auth loading:', authLoading);
    }, [authLoading]);

    if (authLoading) return <h1 className="p-5">Loading...</h1>;

    return user ? <Outlet /> : <Navigate to="/login" />;
}   

export default RequireAuth;