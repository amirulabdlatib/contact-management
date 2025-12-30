import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api, { getCsrfToken } from "../lib/axios";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({});

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            await getCsrfToken();
            const response = await api.post("/login", credentials);
            return response.data;
        },
        onSuccess: (data) => {
            setUser(data.user);
            navigate("/dashboard");
            console.log("Login successful:", data);
        },
        onError: (err) => {
            if (err.response.status === 422) {
                setError(err.response.data.errors);
            }
            console.log("Login failed:", err);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(form);
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {error.email && <p className="text-sm text-red-500 mt-1">{error.email[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {error.password && <p className="text-sm text-red-500 mt-1">{error.password[0]}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {loginMutation.isPending ? "Loading..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
