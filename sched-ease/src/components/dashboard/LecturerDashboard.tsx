import { Calendar, Users, Clock, BookOpen, MessageSquare, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import DashboardStats from './DashboardStats';
import { useAuthStore } from '../../lib/store/authStore';

export default function LecturerDashboard() {
    const user = useAuthStore((state) => state.user);
    const [greeting, setGreeting] = useState('');
    const [quote, setQuote] = useState('');

    // Clean and capitalize the first name
    const getCleanName = () => {
        if (!user?.name) return '';

        // Get first name
        const firstName = user.name.split(' ')[0];

        // Remove any numbers or dots
        const cleanName = firstName.replace(/[0-9.]/g, '');

        // Capitalize first letter
        return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    };

    // Dynamic greeting based on time of day
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 17) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        // Educational quotes for inspiration
        const quotes = [
            "Education is not the filling of a pail, but the lighting of a fire.",
            "The beautiful thing about learning is that no one can take it away from you.",
            "Teaching is the greatest act of optimism.",
            "Education is the passport to the future.",
            "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const stats = [
        { label: "Today's Sessions", value: '4', icon: Clock, color: 'bg-purple-100 text-purple-700' },
        { label: 'Active Students', value: '15', icon: Users, color: 'bg-purple-200 text-purple-800' },
        { label: 'Hours This Week', value: '12', icon: Calendar, color: 'bg-purple-300 text-purple-900' },
        { label: 'Pending Feedback', value: '7', icon: MessageSquare, color: 'bg-indigo-100 text-indigo-700' },
    ];

    return (
        <div className="space-y-6">
            {/* Header with purple gradient background */}
            <div className="rounded-lg bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 p-6 text-white shadow-lg">
                <h2 className="text-3xl font-bold">
                    {greeting}, {getCleanName()}!
                </h2>
                <p className="mt-2 italic opacity-90">"{quote}"</p>
            </div>

            <DashboardStats stats={stats} />

            {/* Activity overview */}
            <div className="border-b border-gray-200 pb-2">
                <h3 className="text-xl font-semibold text-gray-800">Your Academic Hub</h3>
                <p className="text-sm text-gray-600">
                    Manage your lectures, tutorials, and group feedback sessions all in one place.
                </p>
            </div>

            {/* Cards with more variation and visual interest */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Next Session"
                    description="Meeting with the module leader"
                    footer="Today at 3:00 PM"
                    icon={Calendar}
                    bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
                    iconColor="text-purple-600"
                />
                <DashboardCard
                    title="Office Hours"
                    description="Scheduled availability"
                    footer="Monday - Friday, 2-5 PM"
                    icon={Clock}
                    bgColor="bg-gradient-to-br from-violet-50 to-violet-100"
                    iconColor="text-violet-600"
                />
                <DashboardCard
                    title="Priority Tasks"
                    description="Grade SDGP interim reports"
                    footer="Due by Friday"
                    icon={Award}
                    bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
                    iconColor="text-indigo-600"
                />
            </div>

            {/* Teaching materials section */}
            <div className="border-b border-gray-200 pb-2 pt-4">
                <h3 className="text-xl font-semibold text-gray-800">Teaching Materials</h3>
                <p className="text-sm text-gray-600">
                    Your recently updated lecture notes and resources
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    title="Software Design Lecture"
                    description="Updated slides for week 8"
                    footer="Last edited 2 days ago"
                    icon={BookOpen}
                    bgColor="bg-gradient-to-br from-purple-100 to-purple-200"
                    iconColor="text-purple-700"
                />
                <DashboardCard
                    title="Upcoming Feedback"
                    description="7 SDGP groups waiting for review"
                    footer="Schedule time slots"
                    icon={MessageSquare}
                    bgColor="bg-gradient-to-br from-violet-100 to-violet-200"
                    iconColor="text-violet-700"
                />
            </div>
        </div>
    );
}