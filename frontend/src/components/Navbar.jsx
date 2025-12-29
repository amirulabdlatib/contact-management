import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/axios";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await api.post("/logout");
            return response.data;
        },
        onSuccess: () => {
            setUser(null);
            navigate("/login");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <nav className="flex items-center justify-between">
            <Link to="/">Contact app</Link>
            <div className="space-x-2 mr-2">
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span>Hi, {user.name}</span>
                        <button onClick={handleLogout} disabled={logoutMutation.isPending}>
                            {logoutMutation.isPending ? "Logging out..." : "Logout"}
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
