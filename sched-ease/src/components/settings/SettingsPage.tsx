import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { Bell, Save, Moon, Sun, User, Globe } from 'lucide-react';

type FormData = {
    name: string;
    email: string;
    language: string;
    timezone: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyDigest: boolean;
};

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user);
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: user?.name || '',
        email: user?.email || '',
        language: 'English',
        timezone: 'UTC-5 (Eastern Time)',
        emailNotifications: true,
        pushNotifications: false,
        weeklyDigest: true
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Submit logic here
        console.log('Saving settings:', formData);
        // Show success toast
        alert('Settings saved successfully!');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
        { id: 'preferences', label: 'Preferences', icon: <Globe size={20} /> }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-5xl mx-auto p-6 space-y-8">
                {/* Header with theme toggle */}
                <div className="flex justify-between items-center border-b pb-5">
                    <div>
                        <h1 className="text-3xl font-bold">Your Settings</h1>
                        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Customize your experience and make it uniquely yours
                        </p>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex overflow-x-auto space-x-2 pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                                activeTab === tab.id
                                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                                    : (darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100')
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <form onSubmit={handleSubmit}>
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="p-6 space-y-6">
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <div className={`h-24 w-24 rounded-full flex items-center justify-center text-2xl font-bold ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                                            {formData.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Your Profile</h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            How others will see you across the platform
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Display Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Preferred Language
                                        </label>
                                        <select
                                            name="language"
                                            value={formData.language}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                            }`}
                                        >
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>German</option>
                                            <option>Japanese</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Timezone
                                        </label>
                                        <select
                                            name="timezone"
                                            value={formData.timezone}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                            }`}
                                        >
                                            <option>UTC-8 (Pacific Time)</option>
                                            <option>UTC-7 (Mountain Time)</option>
                                            <option>UTC-6 (Central Time)</option>
                                            <option>UTC-5 (Eastern Time)</option>
                                            <option>UTC+0 (Greenwich Mean Time)</option>
                                            <option>UTC+1 (Central European Time)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold">Notification Preferences</h3>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Control how and when we reach out to you
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="email_notifications"
                                                    name="emailNotifications"
                                                    type="checkbox"
                                                    checked={formData.emailNotifications}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <label htmlFor="email_notifications" className="text-base font-medium">
                                                    Email Notifications
                                                </label>
                                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Receive timely updates about activity relevant to you
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="push_notifications"
                                                    name="pushNotifications"
                                                    type="checkbox"
                                                    checked={formData.pushNotifications}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <label htmlFor="push_notifications" className="text-base font-medium">
                                                    Push Notifications
                                                </label>
                                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Get real-time alerts directly to your device
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="weekly_digest"
                                                    name="weeklyDigest"
                                                    type="checkbox"
                                                    checked={formData.weeklyDigest}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <label htmlFor="weekly_digest" className="text-base font-medium">
                                                    Weekly Digest
                                                </label>
                                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Get a summary of important updates once a week
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold">Your Preferences</h3>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Customize how you experience our platform
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Color Theme
                                    </label>
                                    <div className="grid grid-cols-5 gap-4">
                                        {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                style={{ backgroundColor: color }}
                                                className="h-10 rounded-lg shadow-md hover:ring-2 hover:ring-offset-2 hover:ring-gray-400"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Default Page
                                    </label>
                                    <select
                                        className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                        }`}
                                    >
                                        <option>Dashboard</option>
                                        <option>Analytics</option>
                                        <option>Projects</option>
                                        <option>Calendar</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Footer with save button */}
                        <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex justify-between items-center`}>
                            <button
                                type="button"
                                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                Reset to defaults
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Save size={18} className="mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}