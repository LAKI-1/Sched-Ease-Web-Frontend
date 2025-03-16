import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';
import '../../css/UserMenu.css';

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuthStore();

    if (!user) return null;

    return (
        <div className="user-menu">
            <button
                className="user-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="user-avatar"
                    />
                ) : (
                    <User className="user-icon" />
                )}
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-content">
                        <div className="user-info">
                            <p className="user-name">{user.name}</p>
                            <p className="user-email">{user.email}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="sign-out-button"
                        >
                            <LogOut className="sign-out-icon" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}