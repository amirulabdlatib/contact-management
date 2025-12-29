// frontend\src\pages\Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api, { getCsrfToken } from "../lib/axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: async (credentials) => {
            await getCsrfToken();
            const response = await api.post("/register", credentials);
            return response.data;
        },
        onSuccess: (data) => {
            navigate("/dashboard");
            console.log("Registration successful:", data);
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
    };

    return (
        <div>
            <h1>Register page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                <button type="submit" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "Loading..." : "Register"}
                </button>
            </form>
        </div>
    );
}
