import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

export const getCsrfToken = () => {
    return api.get("/sanctum/csrf-cookie");
};

export default api;
