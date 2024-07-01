import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface User {
    user_id: number
    username: string,
    is_admin: boolean
}

interface TokenPayload extends User {
    exp: number;
}

const useIsAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token');

        if (jwtToken) {
            try {
                const decodedJwtToken: TokenPayload = jwtDecode(jwtToken);
                const isJwtTokenExpired = decodedJwtToken.exp * 1000 < Date.now();

                if (!isJwtTokenExpired) {
                    setIsAuthenticated(true);
                    setAuthenticatedUser({user_id: decodedJwtToken.user_id, username: decodedJwtToken.username, is_admin: decodedJwtToken.is_admin});
                } else {
                    setIsAuthenticated(false);
                } 
            } catch (error) {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return {
        isAuthenticated,
        authenticatedUser
    }
};

export default useIsAuthenticated;