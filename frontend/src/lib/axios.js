import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const getCsrfToken = () => {
    return api.get("/sanctum/csrf-cookie");
};

export default api;
