import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="flex items-center justify-between">
                <Link to="/">Contact app</Link>
                <div className="space-x-2 mr-2">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
