import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";

export default function EditContact() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const {
        data: contact,
        isLoading,
        isError,
        error: loadDataError,
    } = useQuery({
        queryKey: ["contact", id],
        queryFn: async () => {
            const response = await api.get(`/api/contacts/${id}`);
            return response.data.contact;
        },
    });

    const [form, setForm] = useState({
        name: "",
        address: "",
    });

    const [error, setError] = useState({});

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const response = await api.put(`/api/contacts/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            queryClient.invalidateQueries({ queryKey: ["contact", id] });
            navigate("/dashboard");
            setError({});
        },
        onError: (err) => {
            if (err.response?.status === 422) {
                setError(err.response.data.errors);
            }
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate(form);
    };

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
                <p className="text-red-500">Error loading contact: {loadDataError.message}</p>
            </div>
        );
    }

    if (form.name === "" && form.address === "") {
        setForm({
            name: contact.name,
            address: contact.address,
        });
    }

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors">
                <ArrowLeft size={20} />
                Back to Contacts
            </button>

            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Contact</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter contact name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {error.name && <p className="text-sm text-red-500 mt-1">{error.name[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Enter contact address"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        {error.address && <p className="text-sm text-red-500 mt-1">{error.address[0]}</p>}
                    </div>

                    <div className="flex justify-center ">
                        <button
                            type="submit"
                            disabled={updateMutation.isPending}
                            className=" w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {updateMutation.isPending ? "Updating..." : "Update "}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
