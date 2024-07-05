import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import { useEffect } from "react";

interface AuthUserMiddlewareProps {
    children: React.ReactNode
}

const AuthUserMiddleware = ({ children }: AuthUserMiddlewareProps) => {
    const { isAuthenticated } = useIsAuthenticated();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, []);
  
    return isAuthenticated ? children : null;
  };
  
  export default AuthUserMiddleware;