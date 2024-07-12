import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface RequiredAuthProps {
    children: React.ReactNode,
}

const RequiredAuth = ({children}: RequiredAuthProps) => {
    const [isAllowed, setIsAllowed] = useState(localStorage.getItem('decoded_jwt_token'));
    // const {isAuthenticated} = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAllowed) {
            navigate('/login');
        };
    }, []);

    return children;
};

export default RequiredAuth;