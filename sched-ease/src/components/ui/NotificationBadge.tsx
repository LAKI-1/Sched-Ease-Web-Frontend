import React from 'react';

interface NotificationBadgeProps {
    count: number;
    children: React.ReactNode;
}

export default function NotificationBadge({ count, children }: NotificationBadgeProps) {
    return (
        <button className="text-gray-600 hover:text-blue-700 relative">
            {children}
            {count > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full text-xs text-white flex items-center justify-center">
          {count}
        </span>
            )}
        </button>
    );
}