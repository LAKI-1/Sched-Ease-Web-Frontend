import { Calendar, MessageSquare } from 'lucide-react';

interface DashboardProps {
    role: string;
}

export function Dashboard({ role }: DashboardProps) {
    console.log("Dashboard role:", role); // Debugging role

    // Mock data for student view - in a real app, this would come from your database
    const studentData = {
        tutorialGroups: [
            { type: 'Tutorial', group: 'CS-G5', classroom: '1LA', lecturer: 'Ms. Sarah Wilson', time: 'Monday 10:00 AM' },
            { type: 'Lecture', group: 'CS-G5', classroom: '4LD', lecturer: 'Mr. James Chen', time: 'Wednesday 2:00 PM' }
        ],
        sdgpGroup: 'CS-20',
        feedbackSessions: [
            { date: '2024-03-15', time: '10:00 AM', classroom: '2LB', lecturer: 'Mr. Michael Brown', type: 'Progress Review', status: 'upcoming' },
            { date: '2024-03-10', time: '2:30 PM', classroom: '3LC', lecturer: 'Ms. Sarah Wilson', type: 'Code Review', status: 'completed' }
        ],
        sessionStats: { booked: 3, attended: 2 }
    };

    const getStats = () => {
        switch (role) {
            case 'administrator':
                return [{ icon: <Calendar size={28} className="text-[#3E8498]" />, label: 'Active Timetables', value: '12' }];
            case 'student':
                return [
                    { icon: <Calendar size={28} className="text-[#3E8498]" />, label: 'Booked Sessions', value: studentData.sessionStats.booked.toString() },
                    { icon: <MessageSquare size={28} className="text-[#3E8498]" />, label: 'Completed Sessions', value: studentData.sessionStats.attended.toString() }
                ];
            default:
                return [];
        }
    };

    const stats = getStats();
    console.log("Dashboard stats:", stats); // Debugging stats

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.length > 0 ? (
                    stats.map((stat, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg">
                            <div className="flex items-center">
                                <div className="p-3 bg-gray-100 rounded-md">
                                    {stat.icon}
                                </div>
                                <div className="ml-5">
                                    <p className="text-lg font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-4xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No data available.</p>
                )}
            </div>

            {/* Student-Specific Dashboard */}
            {role === 'student' && (
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Schedule</h3>

                    {/* Tutorial Groups */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-medium text-gray-700 mb-3">Tutorial Group </h4>
                        {studentData.tutorialGroups.map((group, index) => (
                            <div key={index} className="border-b last:border-b-0 py-3">
                                <p className="text-gray-700">
                                    <strong>Group: </strong>{group.group} <br />
                                    <strong>Classroom: </strong>{group.classroom} <br />
                                    <strong>Lecturer: </strong>{group.lecturer} <br />
                                    <strong>Time: </strong>{group.time}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* SDGP Group */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-medium text-gray-700 mb-3">SDGP Group</h4>
                        <p className="text-gray-700">{studentData.sdgpGroup}</p>
                    </div>

                    {/* Feedback Sessions */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h4 className="text-lg font-medium text-gray-700 mb-3">Feedback Sessions</h4>
                        {studentData.feedbackSessions.map((session, index) => (
                            <div key={index} className={`border-b last:border-b-0 py-3 ${session.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`}>
                                <p>
                                    <strong>Date:</strong> {session.date} <br />
                                    <strong>Time:</strong> {session.time} <br />
                                    <strong>Classroom:</strong> {session.classroom} <br />
                                    <strong>Lecturer:</strong> {session.lecturer} <br />
                                    <strong>Type:</strong> {session.type} <br />
                                    <strong>Status:</strong> {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
