const Navbar = () => {
    return (
        <>
            <nav className="flex items-center justify-between">
                <h1 className="font-bold text-indigo-600">Contact app</h1>
                <div>
                    <a to="/" className="px-3 py-1 rounded-md hover:bg-indigo-600 hover:text-white">
                        Home
                    </a>
                    <a to="/create" className="px-3 py-1 rounded-md hover:bg-indigo-600 hover:text-white">
                        New Post
                    </a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
