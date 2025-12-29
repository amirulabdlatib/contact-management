// frontend\src\components\Navbar.jsx

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <nav>Loading...</nav>;
    }

    return (
        <nav className="flex items-center justify-between">
            <Link to="/">Contact app</Link>
            <div className="space-x-2 mr-2">
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span>Hi, {user.name}</span>
                        <button>Logout</button>
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
