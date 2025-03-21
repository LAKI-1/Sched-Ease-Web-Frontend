import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import NotificationBadge from '../ui/NotificationBadge';
import logo from '../../assets/SchedEase.png';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center pt-3">
                            <img src={logo} alt="Sched-Ease Logo" className="h-25 w-auto" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Navigation />
                        <NotificationBadge count={2}>
                            <Bell className="h-6 w-6" />
                        </NotificationBadge>
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}