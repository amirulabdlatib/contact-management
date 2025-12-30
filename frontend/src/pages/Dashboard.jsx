import { useQuery } from "@tanstack/react-query";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/axios";

export default function Dashboard() {
    const {
        data: contacts,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const response = await api.get("/api/contacts");
            return response.data.contacts;
        },
    });

    const handleDelete = (id) => {
        console.log("Delete contact:", id);
        // Show confirmation and delete
    };
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading contacts...</p>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error loading contacts: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Contacts</h1>
                <Link to="/contacts/create" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Plus size={20} />
                    Add Contact
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {contacts && contacts.length > 0 ? (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {contacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">{contact.address}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link to={`/contacts/${contact.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                                <Eye size={18} />
                                            </Link>
                                            <Link to={`/contacts/${contact.id}/edit`} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                                <Edit size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(contact.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    /* Empty State */
                    <div className="text-center py-12">
                        <p className="text-gray-500">No contacts yet. Add your first contact!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
