import { User } from '../../types/auth';
import '../../css/UserList.css';

interface UserListProps {
    users: User[];
    onUserSelect: (user: User) => void;
}

export default function UserList({ users, onUserSelect }: UserListProps) {
    return (
        <div className="user-list-grid">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="user-card"
                >
                    <div className="user-card-content">
                        <div className="user-info-container">
                            <img
                                className="user-avatar"
                                src={user.avatar}
                                alt={user.name}
                            />
                            <div className="user-details">
                                <h3 className="user-name">{user.name}</h3>
                                <p className="user-email">{user.email}</p>
                            </div>
                        </div>
                        <div className="button-container">
                            <button
                                onClick={() => onUserSelect(user)}
                                className="view-profile-button"
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