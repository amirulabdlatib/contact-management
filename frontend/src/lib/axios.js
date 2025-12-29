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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isUserEndpoint = error.config?.url === "/api/user";

        // Only redirect on 401 if it's NOT the /api/user check
        if (error.response?.status === 401 && !isUserEndpoint) {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;
