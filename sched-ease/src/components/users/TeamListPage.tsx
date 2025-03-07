import React from 'react';
import { Users, Mail, GraduationCap, CheckCircle, XCircle } from 'lucide-react';

interface TeamMember {
    name: string;
    studentId: string;
    email: string;
    tutorialGroup: string;
    isLeader?: boolean;
}

interface Team {
    id: string;
    teamId: string;
    registrationDate: string;
    status: 'pending' | 'approved' | 'rejected';
    members: TeamMember[];
}

export default function TeamListPage() {
    const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);
    const [actionMessage, setActionMessage] = React.useState<string | null>(null);

    // Mock data - in a real app, this would come from your database
    const teams: Team[] = [
        {
            id: '1',
            teamId: 'CS-01',
            registrationDate: '2024-03-01',
            status: 'approved',
            members: [
                {
                    name: 'John Smith',
                    studentId: 'ST12345',
                    email: 'john.smith@example.com',
                    tutorialGroup: 'CS-G1',
                    isLeader: true
                },
                {
                    name: 'Sarah Johnson',
                    studentId: 'ST12346',
                    email: 'sarah.j@example.com',
                    tutorialGroup: 'CS-G2'
                },
                {
                    name: 'Michael Lee',
                    studentId: 'ST12347',
                    email: 'michael.l@example.com',
                    tutorialGroup: 'CS-G1'
                },
                {
                    name: 'Emily Brown',
                    studentId: 'ST12348',
                    email: 'emily.b@example.com',
                    tutorialGroup: 'CS-G3'
                },
                {
                    name: 'David Wilson',
                    studentId: 'ST12349',
                    email: 'david.w@example.com',
                    tutorialGroup: 'CS-G2'
                }
            ]
        },
        {
            id: '2',
            teamId: 'SE-01',
            registrationDate: '2024-03-02',
            status: 'pending',
            members: [
                {
                    name: 'James Chen',
                    studentId: 'ST12350',
                    email: 'james.c@example.com',
                    tutorialGroup: 'SE-G1',
                    isLeader: true
                },
                {
                    name: 'Emma Davis',
                    studentId: 'ST12351',
                    email: 'emma.d@example.com',
                    tutorialGroup: 'SE-G2'
                },
                {
                    name: 'William Taylor',
                    studentId: 'ST12352',
                    email: 'william.t@example.com',
                    tutorialGroup: 'SE-G3'
                },
                {
                    name: 'Sophia Martinez',
                    studentId: 'ST12353',
                    email: 'sophia.m@example.com',
                    tutorialGroup: 'SE-G1'
                },
                {
                    name: 'Oliver Anderson',
                    studentId: 'ST12354',
                    email: 'oliver.a@example.com',
                    tutorialGroup: 'SE-G2'
                }
            ]
        }
    ];

    const handleApprove = (teamId: string) => {
        // Handle team approval
        setActionMessage(`Team ${teamId} has been approved.`);
        console.log('Approving team:', teamId);
    };

    const handleReject = (teamId: string) => {
        // Handle team rejection
        setActionMessage(`Team ${teamId} has been rejected.`);
        console.log('Rejecting team:', teamId);
    };

    if (selectedTeam) {
        const team = teams.find(t => t.id === selectedTeam);
        if (!team) return null;

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <button
                        onClick={() => setSelectedTeam(null)}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                    >
                        ← Back to Teams
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">{team.teamId}</h2>
                                <div className="mt-2 space-y-1">
                                    <p className="text-gray-600">Registration Date: {team.registrationDate}</p>
                                    <p className="flex items-center gap-2">
                                        Status:
                                        <span className={`px-2 py-1 rounded-full text-sm ${team.status === 'approved' ? 'bg-green-100 text-green-800' : team.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {team.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleApprove(team.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        <CheckCircle size={20} />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(team.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        <XCircle size={20} />
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Display action message */}
                        {actionMessage && (
                            <div className="mt-4 text-center text-lg font-semibold text-green-600">
                                {actionMessage}
                            </div>
                        )}

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                            <div className="grid gap-4">
                                {team.members.map((member, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <p className="font-medium flex items-center gap-2">
                                                    {member.name}
                                                    {member.isLeader && (
                                                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                                                            Team Leader
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-gray-600 text-sm flex items-center gap-2">
                                                    <GraduationCap size={16} />
                                                    ID: {member.studentId}
                                                </p>
                                                <p className="text-gray-600 text-sm flex items-center gap-2">
                                                    <Mail size={16} />
                                                    {member.email}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                                    {member.tutorialGroup}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Registered Teams</h2>
            </div>

            <div className="grid gap-6">
                {teams.map((team) => (
                    <div key={team.id} className="bg-white shadow rounded-lg p-6">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <Users className="w-8 h-8 text-indigo-600" />
                                <div>
                                    <h3 className="text-lg font-semibold">{team.teamId}</h3>
                                    <div className="space-y-1 mt-1">
                                        <p className="text-gray-600">{team.members.length} members</p>
                                        <p className="text-gray-600">Registered: {team.registrationDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm ${team.status === 'approved' ? 'bg-green-100 text-green-800' : team.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                                </span>
                                <button
                                    onClick={() => setSelectedTeam(team.id)}
                                    className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
