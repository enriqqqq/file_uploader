import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authContext } from "./authContext"
import propTypes from "prop-types";

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [auth_loading, setLoading] = useState(true);
    const location = useLocation();

    function loginGoogle() {
        // Google login logic
        window.location.href = '/test/auth/google';
    }

    async function getUser() {
        // Check session logic
        const res = await fetch('/test/isauth');
        const data = await res.json();
        setUser(data.user);
    }

    async function logout() {
        // Logout logic
        setUser(null);
        await fetch('/test/logout');
    }

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Check session on load
    useEffect(() => {
        (async () => {
            console.log('setting loading to true');
            setLoading(true);
            console.log('getting user...');
            await getUser();
            await delay(500);
            console.log('setting loading to false');
            setLoading(false);
        })();
    }, [location]);
    
    return (
        <authContext.Provider value={{ user, auth_loading, loginGoogle, logout }}>
            {children}
        </authContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default AuthProvider;