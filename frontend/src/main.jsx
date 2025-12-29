import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = document.getElementById("root");

createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
