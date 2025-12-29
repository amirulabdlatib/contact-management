import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GuestRoute from "./Routes/GuestRoute";
import AuthRoute from "./Routes/AuthRoute";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />

                        {/* Guest Routes for Unauthenticated Users */}
                        <Route
                            path="/login"
                            element={
                                <GuestRoute>
                                    <Login />
                                </GuestRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <GuestRoute>
                                    <Register />
                                </GuestRoute>
                            }
                        />

                        {/* Protected Route for Authenticated Users */}
                        <Route
                            path="/dashboard"
                            element={
                                <AuthRoute>
                                    <Dashboard />
                                </AuthRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
