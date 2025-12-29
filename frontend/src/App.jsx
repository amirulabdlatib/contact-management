import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GuestRoute from "./Routes/GuestRoute";
import AuthRoute from "./Routes/AuthRoute";
import { useAuth } from "./hooks/useAuth";
import CreateContact from "./pages/contacts/Create";
import EditContact from "./pages/contacts/Edit";
import ShowContact from "./pages/contacts/Show";

function App() {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

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

                        <Route
                            path="/contacts/create"
                            element={
                                <AuthRoute>
                                    <CreateContact />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/contacts/:id"
                            element={
                                <AuthRoute>
                                    <ShowContact />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/contacts/:id/edit"
                            element={
                                <AuthRoute>
                                    <EditContact />
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
