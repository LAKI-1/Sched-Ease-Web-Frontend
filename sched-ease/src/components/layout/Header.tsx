import { GraduationCap, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import NotificationBadge from '../ui/NotificationBadge';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <GraduationCap className="h-8 w-8 text-blue-700" />
                            <span className="ml-2 text-xl font-semibold text-gray-900">
                                Sched-Ease
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Navigation />
                        <NotificationBadge count={2}>
                            <Bell className="h-5 w-5" />
                        </NotificationBadge>
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}