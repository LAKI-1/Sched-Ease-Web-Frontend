import React, { useEffect, useState } from 'react';
import { Users, Mail, GraduationCap, CheckCircle, XCircle, Crown } from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    email: string;
    course: string;
    tutorialGroup: string;
    isLeader?: boolean;
}

interface Team {
    id: string;
    teamId: string;
    registrationDate: string;
    status: 'pending' | 'approved' | 'rejected';
    members: TeamMember[];
    course?: string;
    groupNo?: number;
}

interface ApiError {
    message: string;
}

export default function TeamListPage() {
    const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);
    const [actionMessage, setActionMessage] = React.useState<string | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLeader, setSelectedLeader] = useState<number | null>(null);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/teams');
            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message || 'Failed to fetch teams');
            }
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            setError('Failed to load teams: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (teamId: string) => {
        if (!selectedLeader) {
            setActionMessage('Please select a team leader before approving the team');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/teams/${teamId}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    leaderId: selectedLeader
                })
            });

            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message);
            }

            setActionMessage(`Team ${teamId} has been approved and team leader has been appointed.`);
            setSelectedLeader(null);
            fetchTeams();
        } catch (error) {
            setActionMessage(`Failed to approve team: ${(error as Error).message}`);
        }
    };

    const handleSelectLeader = (memberId: number) => {
        setSelectedLeader(memberId);
        setActionMessage(null);
    };

    const handleReject = async (teamId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/teams/${teamId}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message);
            }

            setActionMessage(`Team ${teamId} has been rejected.`);
            fetchTeams();
        } catch (error) {
            setActionMessage(`Failed to reject team: ${(error as Error).message}`);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading teams...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-4">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={fetchTeams}
                        className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (selectedTeam) {
        const team = teams.find(t => t.id === selectedTeam);
        if (!team) return null;

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => {
                        setSelectedTeam(null);
                        setSelectedLeader(null);
                        setActionMessage(null);
                    }}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6"
                >
                    ← Back to Teams
                </button>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-blue-600">
                                Team {team.teamId}
                            </h2>
                            <p className="text-lg text-gray-600 mt-2">
                                Group: {team.course}-{String(team.groupNo).padStart(2, '0')}
                            </p>
                            <p className="text-gray-600">Registration Date: {team.registrationDate}</p>
                        </div>
                        <div className="flex items-center">
                            {team.status === 'pending' ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse mr-2" />
                                    <span className="text-yellow-600">Pending Approval</span>
                                </div>
                            ) : team.status === 'approved' ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-green-400 mr-2" />
                                    <span className="text-green-600">Approved</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-red-400 mr-2" />
                                    <span className="text-red-600">Rejected</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {actionMessage && (
                        <div className={`mb-6 p-4 ${actionMessage.includes('Failed') ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'} rounded-lg text-center`}>
                            <p className={actionMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}>{actionMessage}</p>
                        </div>
                    )}

                    {team.status === 'pending' && (
                        <div className="mb-6">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <p className="text-yellow-800 flex items-center gap-2">
                                    <Crown className="w-5 h-5" />
                                    Please select a team leader before approving the team
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleApprove(team.id)}
                                    disabled={!selectedLeader}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                        selectedLeader
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <CheckCircle size={20} />
                                    Approve with Selected Leader
                                </button>
                                <button
                                    onClick={() => handleReject(team.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    <XCircle size={20} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {team.members.map((member, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-3 rounded-md ${
                                    team.status === 'pending'
                                        ? selectedLeader === member.id
                                            ? 'bg-blue-50 border-2 border-blue-200'
                                            : 'bg-yellow-50 hover:bg-yellow-100 cursor-pointer'
                                        : team.status === 'approved'
                                            ? 'bg-green-50'
                                            : 'bg-red-50'
                                }`}
                                onClick={() => team.status === 'pending' && handleSelectLeader(member.id)}
                            >
                                <div>
                                    <p className="font-semibold flex items-center gap-2">
                                        {member.name}
                                        {member.isLeader && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                                                <Crown size={14} />
                                                Team Leader
                                            </span>
                                        )}
                                        {team.status === 'pending' && selectedLeader === member.id && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                                                <Crown size={14} />
                                                Selected as Leader
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <GraduationCap size={16} />
                                        ID: {member.id}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <Mail size={16} />
                                        {member.email}
                                    </p>
                                    <p className="text-sm text-gray-500">{member.course}</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                        {member.tutorialGroup}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Registered Teams</h2>

                {teams.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No teams registered yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {teams.map((team) => (
                            <div key={team.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                                <div className="flex items-start gap-4">
                                    <Users className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {team.course}-{String(team.groupNo).padStart(2, '0')}
                                        </h3>
                                        <div className="space-y-1 mt-1">
                                            <p className="text-gray-600">{team.members.length} members</p>
                                            <p className="text-gray-600">Registered: {team.registrationDate}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                                        team.status === 'approved'
                                            ? 'bg-green-100 text-green-800'
                                            : team.status === 'rejected'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        <div className={`w-2 h-2 rounded-full ${
                                            team.status === 'approved'
                                                ? 'bg-green-400'
                                                : team.status === 'rejected'
                                                    ? 'bg-red-400'
                                                    : 'bg-yellow-400 animate-pulse'
                                        }`} />
                                        {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                                    </div>
                                    <button
                                        onClick={() => setSelectedTeam(team.id)}
                                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
