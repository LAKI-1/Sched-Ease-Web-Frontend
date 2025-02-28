import { useAuthStore } from '../../lib/store/authStore';

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-5">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage your account preferences and notifications
                </p>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                        <div className="mt-4 grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.name}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="email_notifications"
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="ml-3">
                                    <label htmlFor="email_notifications" className="text-sm font-medium text-gray-700">
                                        Email notifications
                                    </label>
                                    <p className="text-sm text-gray-500">
                                        Receive email notifications for new sessions and updates
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}