import { LucideIcon } from 'lucide-react';

interface StatItem {
    label: string;
    value: string;
    icon: LucideIcon;
}

interface DashboardStatsProps {
    stats: StatItem[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className="bg-white overflow-hidden shadow rounded-lg p-5"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-5">
                                <div className="text-sm font-medium text-gray-500">
                                    {stat.label}
                                </div>
                                <div className="mt-1 text-xl font-semibold text-gray-900">
                                    {stat.value}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}