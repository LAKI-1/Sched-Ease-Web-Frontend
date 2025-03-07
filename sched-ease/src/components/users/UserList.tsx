import { User } from '../../types/auth';

interface UserListProps {
    users: User[];
    onUserSelect: (user: User) => void;
}

export default function UserList({ users, onUserSelect }: UserListProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                    <div className="p-6">
                        <div className="flex items-center">
                            <img
                                className="h-12 w-12 rounded-full"
                                src={user.avatar}
                                alt={user.name}
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => onUserSelect(user)}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}