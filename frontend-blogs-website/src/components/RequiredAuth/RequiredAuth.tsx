import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import CreateArticlePage from "../../pages/CreateArticlePage/CreateArticlePage";
import { useEffect } from "react";

const RequiredAuth = () => {
    const {isAuthenticated, authenticatedUser} = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate ('/login');
        }
    }, [])
    
    if (isAuthenticated) {
        return (
            <CreateArticlePage />
        )
    } else {
        return null;
    }
};

export default RequiredAuth;