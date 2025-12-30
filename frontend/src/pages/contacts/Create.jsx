import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";

export default function CreateContact() {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        name: "",
        address: "",
    });

    const [error, setErrors] = useState({});

    const formMutation = useMutation({
        mutationFn: async (data) => {
            const response = await api.post("/api/contacts", data);
            console.log(response.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            navigate("/dashboard");
            setErrors({});
        },
        onError: (err) => {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
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
        formMutation.mutate(form);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors">
                <ArrowLeft size={20} />
                Back to Contacts
            </button>

            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Contact</h1>

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
                            placeholder="Enter contact address"
                            rows="4"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        {error.address && <p className="text-sm text-red-500 mt-1">{error.address[0]}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={formMutation.isPending}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:cursor-not-allowed  disabled:bg-gray-400"
                        >
                            {formMutation.isPending ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
