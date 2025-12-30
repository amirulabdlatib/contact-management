import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

export default function ShowContact() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        data: contact,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const response = await api.get(`/api/contacts/${id}`);
            return response.data.contact;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading contact...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error loading contact: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors">
                <ArrowLeft size={20} />
                Back to Contacts
            </button>

            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Contact Details</h1>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                        <p className="text-lg text-gray-800">{contact.name}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
                        <p className="text-lg text-gray-800">{contact.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
