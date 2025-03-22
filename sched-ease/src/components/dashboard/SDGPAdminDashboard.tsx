import { Users, FileText, BarChart, ShieldCheck, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import DashboardStats from './DashboardStats';
import { useAuthStore } from '../../lib/store/authStore';

export default function SDGPAdminDashboard() {
    const user = useAuthStore((state) => state.user);
    const [greeting, setGreeting] = useState('');
    const [quote, setQuote] = useState('');

    const getCleanName = () => {
        if (!user?.name) return '';
        const firstName = user.name.split(' ')[0];
        const cleanName = firstName.replace(/[0-9.]/g, '');
        return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    };

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 17) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        const quotes = [
            "Leadership and learning are indispensable to each other.",
            "Education is the most powerful weapon you can use to change the world.",
            "Excellence is not a skill. It is an attitude.",
            "Assessing progress is the key to achieving goals.",
            "Students don’t need a perfect teacher, they need a happy one."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const stats = [
        { label: "Total Students", value: '120', icon: Users, color: 'bg-blue-100 text-blue-700' },
        { label: "Ongoing Projects", value: '25', icon: ClipboardList, color: 'bg-blue-200 text-blue-800' },
        { label: "Reports Submitted", value: '98', icon: FileText, color: 'bg-blue-300 text-blue-900' },
        { label: "Lecturers Monitored", value: '10', icon: ShieldCheck, color: 'bg-indigo-100 text-indigo-700' },
    ];

    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 text-white shadow-lg">
                <h2 className="text-3xl font-bold">
                    {greeting}, {getCleanName()}!
                </h2>
                <p className="mt-2 italic opacity-90">"{quote}"</p>
            </div>

            <DashboardStats stats={stats} />

            <div className="border-b border-gray-200 pb-2">
                <h3 className="text-xl font-semibold text-gray-800">Administrative Overview</h3>
                <p className="text-sm text-gray-600">
                    Monitor student progress, track lecturer engagement, and oversee project milestones.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Student Progress"
                    description="Overall performance analysis"
                    footer="Updated Weekly"
                    icon={BarChart}
                    bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
                    iconColor="text-blue-600"
                />
                <DashboardCard
                    title="Lecturer Monitoring"
                    description="Activity tracking & reports"
                    footer="Real-time insights"
                    icon={ShieldCheck}
                    bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
                    iconColor="text-indigo-600"
                />
                <DashboardCard
                    title="Project Evaluations"
                    description="Pending milestone reviews"
                    footer="Next batch due Friday"
                    icon={ClipboardList}
                    bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
                    iconColor="text-purple-600"
                />
            </div>

            <div className="border-b border-gray-200 pb-2 pt-4">
                <h3 className="text-xl font-semibold text-gray-800">Academic Reports</h3>
                <p className="text-sm text-gray-600">
                    Recent submissions and assessment summaries.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    title="Weekly Reports"
                    description="Review latest student updates"
                    footer="Last updated 1 day ago"
                    icon={FileText}
                    bgColor="bg-gradient-to-br from-blue-100 to-blue-200"
                    iconColor="text-blue-700"
                />
                <DashboardCard
                    title="Performance Analysis"
                    description="Identify key areas of improvement"
                    footer="New insights available"
                    icon={BarChart}
                    bgColor="bg-gradient-to-br from-indigo-100 to-indigo-200"
                    iconColor="text-indigo-700"
                />
            </div>
        </div>
    );
}