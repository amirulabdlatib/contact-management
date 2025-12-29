import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

export default function ShowContact() {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors">
                <ArrowLeft size={20} />
                Back to Contacts
            </button>

            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Contact Details</h1>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            <Edit size={18} />
                            Edit
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            <Trash2 size={18} />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                        <p className="text-lg text-gray-800">Ahmad Ibrahim</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
                        <p className="text-lg text-gray-800">Jalan Merdeka 15, Kuala Lumpur</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
