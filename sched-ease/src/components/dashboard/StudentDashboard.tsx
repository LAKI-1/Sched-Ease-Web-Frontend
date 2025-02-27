import { Calendar, Clock } from 'lucide-react';
import DashboardCard from './DashboardCard';
import DashboardStats from './DashboardStats';
import { useAuthStore } from '../../lib/store/authStore';

export default function StudentDashboard() {
    const user = useAuthStore((state) => state.user);

    const stats = [
        { label: 'Upcoming Meetings', value: '3', icon: Clock },
        { label: 'Total Number of Meetings Taken Place', value: '24', icon: Calendar },
    ];

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Track your sdgp group projects progress with your team and get feedbacks from mentors.
                </p>
            </div>

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    title="Next Upcoming Session"
                    description="Meeting with the Supervisor to discuss the project progress and get feedback."
                    footer="Tomorrow at 2:00 PM"
                    icon={Calendar}
                />
                <DashboardCard
                    title="Recent Activity"
                    description="Presented the a demo of the project , received their feedback, and made the necessary improvements."
                    footer="2 hours ago"
                    icon={Clock}
                />
            </div>
        </div>
    );
}