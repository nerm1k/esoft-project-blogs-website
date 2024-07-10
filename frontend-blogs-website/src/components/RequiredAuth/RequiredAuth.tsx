import { Navigate, useNavigate } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import CreateArticlePage from "../../pages/CreateArticlePage/CreateArticlePage";
import { useEffect } from "react";

interface RequiredAuthProps {
    children: React.ReactNode,
    isAuthenticated: boolean
}

const RequiredAuth = ({children, isAuthenticated}: RequiredAuthProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        };
    }, [])

    return children;
};

export default RequiredAuth;