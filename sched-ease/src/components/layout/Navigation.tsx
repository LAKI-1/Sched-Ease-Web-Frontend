import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Settings, Home, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../lib/store/authStore';

const studentLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Team Registration', href: '/team-registration', icon: Users },
    { name: 'Feedback Booking', href: '/feedback-session', icon: Users },
    { name: 'Group', href: '/groups', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings }
];

const lecturerLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Availability', href: '/availability', icon: Clock },
    { name: 'Schedule', href: '/schedule-page', icon: Calendar },
    { name: 'Teams', href: '/teams', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings }
];

const sdgpAdminLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Master Calendar', href: '/master-calendar', icon: Calendar },
    { name: 'Teams', href: '/teams', icon: Users },
    { name: 'Lecturers', href: '/lecturers', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings }
];

const adminLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Timetable', href: '/timetable', icon: Calendar },
    { name: 'Lecturers', href: '/lecturers', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings }
];

export default function Navigation() {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);

    const links = user?.role === 'student' ? studentLinks :
        user?.role === 'lecturer' ? lecturerLinks :
            user?.role === 'sdgp_admin' ? sdgpAdminLinks : adminLinks;

    return (
        <nav className="hidden md:flex items-center space-x-4 z-0 relative">
            {links.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                        key={link.name}
                        to={link.href}
                        className={cn(
                            'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium',
                            location.pathname === link.href
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span>{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}