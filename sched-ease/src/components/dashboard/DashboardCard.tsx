import React from 'react';
import { LucideIcon } from 'lucide-react';

// Update the props interface to include bgColor and iconColor
export interface DashboardCardProps {
    title: string;
    description: string;
    footer: string;
    icon: LucideIcon;
    bgColor?: string;
    iconColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
                                                         title,
                                                         description,
                                                         footer,
                                                         icon: Icon,
                                                         bgColor = 'bg-gradient-to-br from-purple-50 to-purple-100',
                                                         iconColor = 'text-purple-600'
                                                     }) => {
    return (
        <div className={`rounded-lg p-5 shadow-sm transition-all hover:shadow-md ${bgColor}`}>
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">{title}</h3>
                <div className={`rounded-full p-2 ${iconColor.replace('text-', 'bg-').replace('-600', '-100').replace('-700', '-100')}`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                {footer}
            </div>
        </div>
    );
};

export default DashboardCard;