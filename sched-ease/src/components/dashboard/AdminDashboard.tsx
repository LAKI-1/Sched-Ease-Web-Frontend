import { Calendar, Users, Clock } from 'lucide-react';
import DashboardCard from './DashboardCard';
import DashboardStats from './DashboardStats';
import { useAuthStore } from '../../lib/store/authStore';

export default function AdminDashboard() {
    const user = useAuthStore((state) => state.user);

    const stats = [
        { label: 'Timetables Added', value: '4', icon: Clock },
        { label: 'Active Students', value: '15', icon: Users },
        { label: 'Hours This Week', value: '12', icon: Calendar },
    ];

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Manage timetables and oversee student schedules.
                </p>
            </div>

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    title="Add New Timetable"
                    description="Create and assign new timetables."
                    footer="Click to start"
                    icon={Calendar}
                />
                <DashboardCard
                    title="Upcoming Timetable Updates"
                    description="Review and adjust existing timetables."
                    footer="Review now"
                    icon={Clock}
                />
            </div>
        </div>
    );
}
