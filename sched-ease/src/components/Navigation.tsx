import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut, Calendar, Users, MessageSquare, Clock } from 'lucide-react';

interface NavigationProps {
    role: string;
    onLogout: () => void;
}

export function Navigation({ role, onLogout }: NavigationProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const getNavItems = () => {
        switch (role) {
            case 'administrator':
                return [
                    { icon: <Calendar size={20} />, label: 'Timetables', href: '/timetables' }
                ];
            case 'sdgp_administrator':
                return [
                    { icon: <Calendar size={20} />, label: 'Master Calendar', href: '/master-calendar' },
                    { icon: <Users size={20} />, label: 'Lecturers', href: '/lecturers' },
                    { icon: <Users size={20} />, label: 'Teams', href: '/teams' },
                    { icon: <MessageSquare size={20} />, label: 'Feedback', href: '/feedback' },
                    { icon: <MessageSquare size={20} />, label: 'Chat', href: '/chat' }
                ];
            case 'lecturer':
                return [
                    { icon: <Clock size={20} />, label: 'Availability', href: '/availability' },
                    { icon: <Calendar size={20} />, label: 'Sessions', href: '/sessions' },
                    { icon: <Users size={20} />, label: 'Teams', href: '/teams' },
                    { icon: <MessageSquare size={20} />, label: 'Feedback', href: '/feedback' },
                    { icon: <MessageSquare size={20} />, label: 'Chat', href: '/chat' }
                ];
            case 'student':
                return [
                    { icon: <Users size={20} />, label: 'My Group', href: '/group' },
                    { icon: <Calendar size={20} />, label: 'Book Sessions', href: '/book' },
                    { icon: <MessageSquare size={20} />, label: 'Feedback', href: '/feedback' },
                    { icon: <MessageSquare size={20} />, label: 'Chat', href: '/chat' }
                ];
            default:
                return [];
        }
    };

    return (
        <nav className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-[#3E8498] font-bold text-xl">Sched-Ease</Link>
                        </div>
                        <div className="hidden md:block flex-grow">
                            <div className="ml-10 flex items-center space-x-4">
                                <Link
                                    to="/"
                                    className="text-[#3E8498] hover:text-[#346e7e] px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                {getNavItems().map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="text-[#3E8498] hover:text-[#346e7e] px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={onLogout}
                            className="flex items-center text-[#3E8498] hover:text-[#346e7e] px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <LogOut size={20} className="mr-2" />
                            Logout
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#3E8498] hover:text-[#346e7e] p-2 rounded-md"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="text-[#3E8498] hover:text-[#346e7e] block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Dashboard
                        </Link>
                        {getNavItems().map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="text-[#3E8498] hover:text-[#346e7e] block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={onLogout}
                            className="text-[#3E8498] hover:text-[#346e7e] w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
