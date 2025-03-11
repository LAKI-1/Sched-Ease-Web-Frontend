import { Calendar, Clock, Users } from 'lucide-react';

export default function SchedulePage() {
    const sessions = [
        {
            group: 'CS-66',
            date: '2024-03-15',
            time: '10:00 AM',
            type: 'Feedback Session',
            status: 'Upcoming'
        },
        {
            group: 'SE-22',
            date: '2024-03-16',
            time: '2:30 PM',
            type: 'Feedback Session',
            status: 'Upcoming'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Sessions</h2>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <div className="space-y-6">
                    {sessions.map((session, index) => (
                        <div key={index} className="border-b last:border-b-0 pb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Users size={20} className="text-indigo-600" />
                                        {session.group}
                                    </h3>
                                    <p className="text-gray-600">{session.type}</p>
                                </div>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                  {session.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{session.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{session.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}