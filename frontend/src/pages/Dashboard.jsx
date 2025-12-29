// frontend/src/pages/Dashboard.jsx

import { Eye, Edit, Trash2, Plus } from "lucide-react";

export default function Dashboard() {
    // Dummy data
    const contacts = [
        { id: 1, name: "Ahmad Ibrahim", address: "Jalan Merdeka 15, Kuala Lumpur" },
        { id: 2, name: "Siti Nurhaliza", address: "Taman Melati, Selangor" },
        { id: 3, name: "Wong Kai Jun", address: "Lebuh Chulia, Penang" },
        { id: 4, name: "Rajesh Kumar", address: "Brickfields, Kuala Lumpur" },
        { id: 5, name: "Nurul Aina", address: "Bandar Sunway, Petaling Jaya" },
    ];

    const handleView = (id) => {
        console.log("View contact:", id);
        // Navigate to view page
    };

    const handleEdit = (id) => {
        console.log("Edit contact:", id);
        // Navigate to edit page
    };

    const handleDelete = (id) => {
        console.log("Delete contact:", id);
        // Show confirmation and delete
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Contacts</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Plus size={20} />
                    Add Contact
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                                        <button onClick={() => handleView(contact.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                            <Eye size={18} />
                                        </button>
                                        <button onClick={() => handleEdit(contact.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(contact.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {contacts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No contacts yet. Add your first contact!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
