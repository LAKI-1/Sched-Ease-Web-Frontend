import { Calendar, Users, Clock, BookOpen, Settings, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import DashboardStats from './DashboardStats';
import { useAuthStore } from '../../lib/store/authStore';

export default function AdminDashboard() {
    const user = useAuthStore((state) => state.user);
    const [greeting, setGreeting] = useState('');

    // Clean and capitalize the first name
    const getCleanName = () => {
        if (!user?.name) return '';
        const firstName = user.name.split(' ')[0];
        const cleanName = firstName.replace(/[0-9.]/g, '');
        return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    };

    // Dynamic greeting based on time of day
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 17) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    const stats = [
        { label: "Total Students", value: '320', icon: Users, color: 'bg-blue-100 text-blue-700' },
        { label: 'Scheduled Lectures', value: '28', icon: Calendar, color: 'bg-blue-200 text-blue-800' },
        { label: 'Pending Approvals', value: '5', icon: ClipboardList, color: 'bg-blue-300 text-blue-900' },
        { label: 'System Updates', value: '3', icon: Settings, color: 'bg-indigo-100 text-indigo-700' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="rounded-lg bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 p-6 text-white shadow-lg">
                <h2 className="text-3xl font-bold">
                    {greeting}, {getCleanName()}!
                </h2>
                <p className="mt-2 italic opacity-90">Managing the academic schedules seamlessly</p>
            </div>

            <DashboardStats stats={stats} />

            {/* Admin Tasks */}
            <div className="border-b border-gray-200 pb-2">
                <h3 className="text-xl font-semibold text-gray-800">Admin Control Center</h3>
                <p className="text-sm text-gray-600">
                    Manage timetables, approvals, and department-wide schedules.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Add New Timetable"
                    description="Create schedules for CS & SE students"
                    footer="Manage timetables efficiently"
                    icon={Calendar}
                    bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
                    iconColor="text-blue-600"
                />
                <DashboardCard
                    title="Pending Approvals"
                    description="Review lecturer-submitted schedules"
                    footer="Approve or edit"
                    icon={ClipboardList}
                    bgColor="bg-gradient-to-br from-sky-50 to-sky-100"
                    iconColor="text-sky-600"
                />
                <DashboardCard
                    title="System Settings"
                    description="Manage user roles and permissions"
                    footer="Access controls"
                    icon={Settings}
                    bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
                    iconColor="text-indigo-600"
                />
            </div>

            {/* Academic Resources */}
            <div className="border-b border-gray-200 pb-2 pt-4">
                <h3 className="text-xl font-semibold text-gray-800">Academic Resources</h3>
                <p className="text-sm text-gray-600">Recently updated department documents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    title="Semester 2 Timetable"
                    description="Updated schedules for all CS & SE students"
                    footer="Last edited 3 days ago"
                    icon={BookOpen}
                    bgColor="bg-gradient-to-br from-blue-100 to-blue-200"
                    iconColor="text-blue-700"
                />
                <DashboardCard
                    title="Lecture Hall Availability"
                    description="Check and reserve venues"
                    footer="Real-time updates"
                    icon={Clock}
                    bgColor="bg-gradient-to-br from-sky-100 to-sky-200"
                    iconColor="text-sky-700"
                />
            </div>
        </div>
    );
}
