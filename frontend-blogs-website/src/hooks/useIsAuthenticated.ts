import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface User {
    username: string,
    is_admin: boolean
}

interface TokenPayload extends User {
    exp: number;
}

const useIsAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token');

        if (jwtToken) {
            try {
                const decodedJwtToken: TokenPayload = jwtDecode(jwtToken);
                const isJwtTokenExpired = decodedJwtToken.exp * 1000 < Date.now();

                if (!isJwtTokenExpired) {
                    setIsAuthenticated(true);
                    setUser(decodedJwtToken);
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
        user
    }
};

export default useIsAuthenticated;