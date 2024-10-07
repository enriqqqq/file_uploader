import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authContext } from "./authContext"
import propTypes from "prop-types";

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
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

    // Check session on load
    useEffect(() => {
        (async () => {
            try {
                console.log('setting loading to true');
                setAuthLoading(true);
                console.log('getting user...');
                await getUser();
            } catch {
                setUser(null);
            } finally {
                console.log('setting loading to false');
                setAuthLoading(false);
            }
        })();

        return () => {
            console.log('cleanup authprovider');
            setAuthLoading(true);
            console.log('cleanup finished');
        }
    }, [location.pathname]);
    
    return (
        <authContext.Provider value={{ user, authLoading, setAuthLoading, loginGoogle, logout }}>
            {children}
        </authContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default AuthProvider;