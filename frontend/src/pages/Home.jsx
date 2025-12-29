import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Contact App</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">A simple contact management application built with React 19, TanStack Query, and Laravel 12.</p>
            <div className="flex gap-4">
                <Link href="/login" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Get Started
                </Link>
                <Link href="/register" className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}
