// this is a custom component that will be used to navigate between the different pages of the application on click. Make sure it's used with Router and AuthProvider.
import { useAuth } from "../contexts/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import propTypes from "prop-types";

function NavigateCust({ to, className, children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthLoading } = useAuth();

    // this is to avoid premature rendering of the next page, this makes sure that the loading screen is shown before the next page is rendered.
    const navigateTo = () => {
        if(location.pathname === to) return;

        setAuthLoading(true);
        navigate(to);
    }

    return (
        <div onClick={navigateTo} className={className}>
            {children}
        </div>
    )
}

NavigateCust.propTypes = {
    to: propTypes.string.isRequired,
    className: propTypes.string,
    children: propTypes.node.isRequired
}

export default NavigateCust;