import { Calendar, MessageSquare } from 'lucide-react';

interface DashboardProps {
    role: string;
}

export function Dashboard({ role }: DashboardProps) {
    // Mock data for student view - in a real app, this would come from your database
    const studentData = {
        tutorialGroups: [
            {
                type: 'Tutorial',
                group: 'CS-G5',
                classroom: '1LA',
                lecturer: 'Dr. Sarah Wilson',
                time: 'Monday 10:00 AM'
            },
            {
                type: 'Lecture',
                group: 'CS-G5',
                classroom: '4LD',
                lecturer: 'Prof. James Chen',
                time: 'Wednesday 2:00 PM'
            }
        ],
        sdgpGroup: 'CS-20',
        feedbackSessions: [
            {
                date: '2024-03-15',
                time: '10:00 AM',
                classroom: '2LB',
                lecturer: 'Dr. Michael Brown',
                type: 'Progress Review',
                status: 'upcoming'
            },
            {
                date: '2024-03-10',
                time: '2:30 PM',
                classroom: '3LC',
                lecturer: 'Dr. Sarah Wilson',
                type: 'Code Review',
                status: 'completed'
            }
        ],
        sessionStats: {
            booked: 3,
            attended: 2
        }
    };

    // Mock data for lecturer/admin view
    const lecturerData = {
        tutorialGroups: [
            {
                type: 'Tutorial',
                groups: ['CS-G1', 'CS-G4'],
                classroom: '1LA',
                time: 'Monday 10:00 AM'
            },
            {
                type: 'Lecture',
                groups: ['CS-G1', 'CS-G4', 'CS-G7'],
                classroom: '4LD',
                time: 'Wednesday 2:00 PM'
            }
        ],
        todaysFeedbackSessions: [
            {
                time: '10:00 AM',
                classroom: '2LB',
                group: 'CS-20',
                type: 'Progress Review'
            },
            {
                time: '2:30 PM',
                classroom: '3LC',
                group: 'SE-10',
                type: 'Code Review'
            }
        ],
        sessionStats: {
            todayBooked: 4,
            totalCompleted: 25
        }
    };

    const getStats = () => {
        switch (role) {
            case 'administrator':
                return [
                    { icon: <Calendar size={24} />, label: 'Active Timetables', value: '12' }
                ];
            case 'sdgp_administrator':
            case 'lecturer':
                return [
                    { icon: <Calendar size={24} />, label: "Today's Sessions", value: lecturerData.sessionStats.todayBooked.toString() },
                    { icon: <MessageSquare size={24} />, label: 'Total Sessions Completed', value: lecturerData.sessionStats.totalCompleted.toString() }
                ];
            case 'student':
                return [
                    { icon: <Calendar size={24} />, label: 'Booked Sessions', value: studentData.sessionStats.booked.toString() },
                    { icon: <MessageSquare size={24} />, label: 'Completed Sessions', value: studentData.sessionStats.attended.toString() }
                ];
            default:
                return [];
        }
    };

    if (role === 'lecturer' || role === 'sdgp_administrator') {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-8">
                    {getStats().map((stat, index) => (
                        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="p-3 bg-[#3E8498] text-white rounded-md">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                {stat.label}
                                            </dt>
                                            <dd className="text-3xl font-semibold text-gray-900">
                                                {stat.value}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
