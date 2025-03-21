import React from 'react';
import '../../css/NotificationBadge.css';

interface NotificationBadgeProps {
    count: number;
    children: React.ReactNode;
}

export default function NotificationBadge({ count, children }: NotificationBadgeProps) {
    return (
        <button className="notification-button">
            {children}
            {count > 0 && (
                <span className="notification-badge">
                    {count}
                </span>
            )}
        </button>
    );
}