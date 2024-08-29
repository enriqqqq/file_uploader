import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
    const { user, logout } = useAuth();

    useEffect(() => {
        console.log('HomePage loaded');
    }, []);
    return (
        <div className="p-5 h-screen flex flex-col items-start">
            <h1 className="font-bold text-xl">Your Files</h1>
            <p className="text-xs">Welcome, {user.displayName}</p>
            <div className="flex gap-3">
                <Link to="/other" className="bg-green-500 rounded p-3 font-bold text-white hover:bg-green-600 mt-3">Navigate to Other</Link>
                <button onClick={logout} className="bg-red-500 rounded p-3 font-bold text-white hover:bg-red-600 mt-3">Logout</button>
            </div>
        </div>
    );
}

export default HomePage;