import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuthStore();

    if (!user) return null;

    return (
        <div className="relative">
            <button
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                    />
                ) : (
                    <User className="h-5 w-5" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}