// frontend/src/pages/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api, { getCsrfToken } from "../lib/axios";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const registerMutation = useMutation({
        mutationFn: async (credentials) => {
            await getCsrfToken();
            const response = await api.post("/register", credentials);
            return response.data;
        },
        onSuccess: (data) => {
            setUser(data.user);
            navigate("/dashboard");
            console.log("Registration successful:", data);
        },
        onError: (error) => {
            console.error("Registration failed:", error);
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
        registerMutation.mutate(form);
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <input
                                name="password_confirmation"
                                type="password"
                                placeholder="Confirm your password"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {registerMutation.isPending ? "Loading..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
