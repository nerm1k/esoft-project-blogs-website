import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/consts";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
            try {
                await fetch(`${BASE_URL}/logout`);
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('decoded_jwt_token');
                navigate('/articles');
            } catch (error) {
                console.log(error);
            }
        }
        
        logout();
    }, []);

    return null;
}

export default Logout;