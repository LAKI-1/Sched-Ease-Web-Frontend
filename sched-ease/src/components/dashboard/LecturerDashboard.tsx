import { Calendar, Users, Clock } from 'lucide-react';
import DashboardCard from './DashboardCard';
import DashboardStats from './DashboardStats';
import { useAuthStore } from '../../lib/store/authStore';

export default function LecturerDashboard() {
    const user = useAuthStore((state) => state.user);

    const stats = [
        { label: 'Today\'s Sessions', value: '4', icon: Clock },
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
                    Manage your sessions (Lecturers/Tutorials) and Feedback Sessions with SDGP Groups.
                </p>
            </div>

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    title="Next Upcoming Session"
                    description="Meeting with the module leader"
                    footer="Today at 3:00 PM"
                    icon={Calendar}
                />
                <DashboardCard
                    title="Availability"
                    description="Office hours scheduled"
                    footer="Monday - Friday, 2-5 PM"
                    icon={Clock}
                />
            </div>
        </div>
    );
}