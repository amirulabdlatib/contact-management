import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthRoute;
