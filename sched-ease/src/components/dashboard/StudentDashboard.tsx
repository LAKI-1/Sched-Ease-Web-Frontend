import { Calendar, Clock, Award, TrendingUp, Bell, MessageSquare, Users, LucideIcon } from 'lucide-react';
import DashboardStats from './DashboardStats';
import { useAuthStore } from '../../lib/store/authStore';
import { useState, useEffect } from 'react';

// Internal DashboardCard component
interface ActionButton {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
}

interface DashboardCardProps {
    title: string;
    description: string;
    footer?: string;
    icon: LucideIcon;
    accentColor?: string;
    actions?: ActionButton[];
}

function DashboardCard({
                           title,
                           description,
                           footer,
                           icon: Icon,
                           accentColor = 'bg-blue-600',
                           actions = []
                       }: DashboardCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col">
            <div className={`${accentColor} h-2`} />
            <div className="p-5 flex-1">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <h3 className="font-medium text-gray-900">{title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 flex items-center justify-between">
                <p className="text-xs text-gray-500">{footer}</p>

                {actions.length > 0 && (
                    <div className="flex gap-2">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-white rounded border border-gray-200 hover:bg-gray-50"
                            >
                                <action.icon className="w-3 h-3" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Main StudentDashboard component
export default function StudentDashboard() {
    const user = useAuthStore((state) => state.user);
    const [greeting, setGreeting] = useState('');
    const [quote, setQuote] = useState('');

    // Get appropriate greeting based on time of day
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        // Inspirational quotes for students
        const quotes = [
            "The expert in anything was once a beginner.",
            "Success is the sum of small efforts repeated day in and day out.",
            "Your project today is your portfolio tomorrow.",
            "Learning is not a spectator sport.",
            "The best way to predict your future is to create it."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const totalLectures = 20; // Total number of lectures
    const attendedLectures = 12; // Number of attended lectures

    const stats = [
        { label: 'Upcoming Meetings', value: '3', icon: Calendar, color: 'bg-blue-100 text-blue-800' },
        { label: 'Total Meetings', value: '24', icon: Clock, color: 'bg-purple-100 text-purple-800' },
        { label: 'Team Members', value: '6', icon: Users, color: 'bg-green-100 text-green-800' },
        { label: 'Project Milestone', value: '65%', icon: TrendingUp, color: 'bg-amber-100 text-amber-800' },
        // Updated Lectures Attended stat
        {
            label: 'Lectures Attended',
            value: `${attendedLectures} / ${totalLectures}`,
            icon: Calendar,
            color: 'bg-indigo-100 text-indigo-800'
        },
        { label: 'Bonus Marks', value: '15', icon: Award, color: 'bg-pink-100 text-pink-800' }
    ];

    return (
        <div className="space-y-8 pb-8">
            {/* Hero section with greeting */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="text-white">
                        <h2 className="text-3xl font-bold">
                            {greeting}, {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1).split('.')[0] : ''}!
                        </h2>
                        <p className="mt-2 text-blue-100 max-w-xl">
                            Track your SDGP project progress, collaborate with your team, and receive valuable feedback from mentors.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                        <p className="text-white/90 italic">{quote}</p>
                    </div>
                </div>
            </div>

            {/* Stats with animation */}
            <div className="animate-fadeIn">
                <DashboardStats stats={stats} />
            </div>

            {/* Main dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <DashboardCard
                        title="Next Upcoming Session"
                        description="Meeting with the Supervisor to discuss the project progress and get feedback on the latest implementation."
                        footer="Tomorrow at 2:00 PM"
                        icon={Calendar}
                        accentColor="bg-gradient-to-r from-blue-500 to-blue-700"
                        actions={[
                            { label: 'Prepare Notes', icon: MessageSquare },
                            { label: 'Set Reminder', icon: Bell }
                        ]}
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Project Highlights"
                        description="Your team has completed 8 tasks this week, putting you ahead of schedule!"
                        footer="Updated today"
                        icon={Award}
                        accentColor="bg-gradient-to-r from-green-500 to-emerald-600"
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Recent Activity"
                        description="Presented the project demo, received constructive feedback, and implemented the necessary improvements."
                        footer="2 hours ago"
                        icon={Clock}
                        accentColor="bg-gradient-to-r from-purple-500 to-purple-700"
                    />
                </div>

                <div className="md:col-span-2">
                    <DashboardCard
                        title="Team Collaboration"
                        description="Upcoming brainstorming session to finalize the UI design and implement new features based on mentor feedback."
                        footer="Friday at 3:30 PM"
                        icon={Users}
                        accentColor="bg-gradient-to-r from-amber-500 to-amber-700"
                        actions={[
                            { label: 'Share Ideas', icon: MessageSquare }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
