import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { Bell, Save, Moon, Sun, User, Globe } from 'lucide-react';
import '../../css/SettingsPage.css';

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
        <div className={`settings-container ${darkMode ? 'dark' : 'light'}`}>
            <div className="settings-content">
                {/* Header with theme toggle */}
                <div className="settings-header">
                    <div className="header-text">
                        <h1>Your Settings</h1>
                        <p className={darkMode ? 'dark' : 'light'}>
                            Customize your experience and make it uniquely yours
                        </p>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="tab-navigation">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`tab-button ${activeTab === tab.id ? 'active' : 'inactive'} ${darkMode ? 'dark' : 'light'}`}
                        >
                            <span className="icon">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className={`content-area ${darkMode ? 'dark' : 'light'}`}>
                    <form onSubmit={handleSubmit}>
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="profile-section">
                                <div className="profile-header">
                                    <div className={`avatar ${darkMode ? 'dark' : 'light'}`}>
                                        {formData.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="profile-info">
                                        <h3>Your Profile</h3>
                                        <p className={darkMode ? 'dark' : 'light'}>
                                            How others will see you across the platform
                                        </p>
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="form-field">
                                        <label className={darkMode ? 'dark' : 'light'}>
                                            Display Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-input ${darkMode ? 'dark' : 'light'}`}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className={darkMode ? 'dark' : 'light'}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`form-input ${darkMode ? 'dark' : 'light'}`}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className={darkMode ? 'dark' : 'light'}>
                                            Preferred Language
                                        </label>
                                        <select
                                            name="language"
                                            value={formData.language}
                                            onChange={handleChange}
                                            className={`form-input ${darkMode ? 'dark' : 'light'}`}
                                        >
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>German</option>
                                            <option>Japanese</option>
                                        </select>
                                    </div>
                                    <div className="form-field">
                                        <label className={darkMode ? 'dark' : 'light'}>
                                            Timezone
                                        </label>
                                        <select
                                            name="timezone"
                                            value={formData.timezone}
                                            onChange={handleChange}
                                            className={`form-input ${darkMode ? 'dark' : 'light'}`}
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
                            <div className="notification-section">
                                <div className="notification-header">
                                    <h3>Notification Preferences</h3>
                                    <p className={darkMode ? 'dark' : 'light'}>
                                        Control how and when we reach out to you
                                    </p>
                                </div>

                                <div className="notification-options">
                                    <div className={`notification-option ${darkMode ? 'dark' : 'light'}`}>
                                        <div className="checkbox-wrapper">
                                            <input
                                                id="email_notifications"
                                                name="emailNotifications"
                                                type="checkbox"
                                                checked={formData.emailNotifications}
                                                onChange={handleChange}
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox-label">
                                                <h4>Email Notifications</h4>
                                                <p className={darkMode ? 'dark' : 'light'}>
                                                    Receive timely updates about activity relevant to you
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`notification-option ${darkMode ? 'dark' : 'light'}`}>
                                        <div className="checkbox-wrapper">
                                            <input
                                                id="push_notifications"
                                                name="pushNotifications"
                                                type="checkbox"
                                                checked={formData.pushNotifications}
                                                onChange={handleChange}
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox-label">
                                                <h4>Push Notifications</h4>
                                                <p className={darkMode ? 'dark' : 'light'}>
                                                    Get real-time alerts directly to your device
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`notification-option ${darkMode ? 'dark' : 'light'}`}>
                                        <div className="checkbox-wrapper">
                                            <input
                                                id="weekly_digest"
                                                name="weeklyDigest"
                                                type="checkbox"
                                                checked={formData.weeklyDigest}
                                                onChange={handleChange}
                                                className="checkbox-input"
                                            />
                                            <div className="checkbox-label">
                                                <h4>Weekly Digest</h4>
                                                <p className={darkMode ? 'dark' : 'light'}>
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
                            <div className="preferences-section">
                                <div>
                                    <h3>Your Preferences</h3>
                                    <p className={darkMode ? 'dark' : 'light'}>
                                        Customize how you experience our platform
                                    </p>
                                </div>

                                <div>
                                    <label className={`form-field ${darkMode ? 'dark' : 'light'}`}>
                                        Color Theme
                                    </label>
                                    <div className="color-options">
                                        {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                style={{ backgroundColor: color }}
                                                className="color-button"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className={`form-field ${darkMode ? 'dark' : 'light'}`}>
                                        Default Page
                                    </label>
                                    <select
                                        className={`form-input ${darkMode ? 'dark' : 'light'}`}
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
                        <div className={`settings-footer ${darkMode ? 'dark' : 'light'}`}>
                            <button
                                type="button"
                                className={`reset-button ${darkMode ? 'dark' : 'light'}`}
                            >
                                Reset to defaults
                            </button>
                            <button
                                type="submit"
                                className="save-button"
                            >
                                <Save size={18} className="icon" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}