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
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        Contact App
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Dashboard
                                </Link>
                                <span className="text-gray-500 text-sm">Hi, {user.name}</span>
                                <button onClick={handleLogout} disabled={logoutMutation.isPending} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
