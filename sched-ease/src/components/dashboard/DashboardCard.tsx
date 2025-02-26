import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    description: string;
    footer: string;
    icon: LucideIcon;
}

export default function DashboardCard({
                                          title,
                                          description,
                                          footer,
                                          icon: Icon,
                                      }: DashboardCardProps) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {title}
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                                {description}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm text-gray-500">
                    {footer}
                </div>
            </div>
        </div>
    );
}