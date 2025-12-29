import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api, { getCsrfToken } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            await getCsrfToken();
            const response = await api.post("/login", credentials);
            return response.data;
        },
        onSuccess: (data) => {
            navigate("/dashboard");
            console.log("Login successful:", data);
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    const handleSubmit = (e) => {
        ``;
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}
