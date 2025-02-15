import React from 'react';
import { MessageSquare, Users, Plus, ChevronRight } from 'lucide-react';
import type { Role } from '../../types';

interface FeedbackProps {
    role: Role;
}

interface TeamMember {
    name: string;
    studentId: string;
    tutorialGroup: string;
    isLeader?: boolean;
}

interface Team {
    id: string;
    teamId: string;
    members: TeamMember[];
}

interface FeedbackItem {
    id: string;
    teamId: string;
    date: string;
    lecturer: string;
    content: string;
    status: 'completed' | 'pending';
}

export function Feedback({ role }: FeedbackProps) {
    const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);
    const [showAddFeedback, setShowAddFeedback] = React.useState(false);
    const [feedbackContent, setFeedbackContent] = React.useState('');

    // Mock data - in a real app, this would come from your database
    const teams: Team[] = [
        {
            id: '1',
            teamId: 'CS-20',
            members: [
                { name: 'Lakindu Samarasighe', studentId: 'ST1190', tutorialGroup: 'CS-G1', isLeader: true },
                { name: 'Faaeq Fazal', studentId: 'ST1190', tutorialGroup: 'CS-G2' },
                { name: 'Cheran Li', studentId: 'ST1111', tutorialGroup: 'CS-G1' }
            ]
        },
        {
            id: '2',
            teamId: 'SE-10',
            members: [
                { name: 'James Chen', studentId: 'ST12350', tutorialGroup: 'SE-G1', isLeader: true },
                { name: 'Emma Davis', studentId: 'ST12351', tutorialGroup: 'SE-G2' },
                { name: 'William Taylor', studentId: 'ST12352', tutorialGroup: 'SE-G3' },
                { name: 'Sophia Martinez', studentId: 'ST12353', tutorialGroup: 'SE-G1' },
                { name: 'Oliver Anderson', studentId: 'ST12354', tutorialGroup: 'SE-G2' }
            ]
        }
    ];

    const feedbacks: FeedbackItem[] = [
        {
            id: '1',
            teamId: 'CS-20',
            date: '2024-03-10',
            lecturer: 'Ms. Sarah Wilson',
            content: 'Good progress on the backend implementation. Need to improve API documentation.',
            status: 'completed'
        },
        {
            id: '2',
            teamId: 'CS-20',
            date: '2024-03-15',
            lecturer: 'Mr. James Chen',
            content: 'Frontend needs work. Consider implementing better error handling.',
            status: 'completed'
        }
    ];

    const canViewAllTeams = role === 'sdgp_administrator' || role === 'lecturer';
    const userTeam = 'CS-20'; // In a real app, this would come from user context

    const visibleTeams = canViewAllTeams ? teams : teams.filter(t => t.teamId === userTeam);
    const selectedTeamFeedbacks = selectedTeam
        ? feedbacks.filter(f => f.teamId === selectedTeam)
        : [];

    const handleSubmitFeedback = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle feedback submission
        setShowAddFeedback(false);
        setFeedbackContent('');
    };

    if (selectedTeam) {
        const team = teams.find(t => t.teamId === selectedTeam);
        if (!team) return null;

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <button
                        onClick={() => setSelectedTeam(null)}
                        className="flex items-center text-[#3E8498] hover:text-[#3E8498]"
                    >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                        <span>Back to Teams</span>
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">Team {team.teamId}</h2>
                                <p className="text-gray-600 mt-1">Team Details</p>
                            </div>
                            {canViewAllTeams && (
                                <button
                                    onClick={() => setShowAddFeedback(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    <Plus size={20} />
                                    Add Feedback
                                </button>
                            )}
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                            <div className="grid gap-4">
                                {team.members.map((member, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium flex items-center gap-2">
                                                    {member.name}
                                                    {member.isLeader && (
                                                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                              Team Leader
                            </span>
                                                    )}
                                                </p>
                                                <p className="text-gray-600 text-sm">ID: {member.studentId}</p>
                                            </div>
                                            <span className="text-gray-600">{member.tutorialGroup}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {showAddFeedback && (
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-4">Add New Feedback</h3>
                        <form onSubmit={handleSubmitFeedback} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Feedback
                                </label>
                                <textarea
                                    value={feedbackContent}
                                    onChange={(e) => setFeedbackContent(e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddFeedback(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white shadow rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Feedback History</h3>
                        <div className="space-y-6">
                            {selectedTeamFeedbacks.map((feedback) => (
                                <div key={feedback.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-gray-600">By {feedback.lecturer}</p>
                                            <p className="text-sm text-gray-500">{feedback.date}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-sm ${
                                            feedback.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                      {feedback.status}
                    </span>
                                    </div>
                                    <p className="text-gray-800">{feedback.content}</p>
                                </div>
                            ))}
                            {selectedTeamFeedbacks.length === 0 && (
                                <p className="text-gray-600 text-center py-4">No feedback available yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <MessageSquare size={32} className="text-[#3E8498]" />
                <h2 className="text-2xl font-semibold text-gray-900">Teams & Feedback</h2>
            </div>

            <div className="grid gap-6">
                {visibleTeams.map((team) => (
                    <div key={team.id} className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-4">
                                <Users className="w-12 h-12 text-[#3E8498]" />
                                <div>
                                    <h3 className="text-lg font-semibold">Team {team.teamId}</h3>
                                    <p className="text-gray-600">{team.members.length} members</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedTeam(team.teamId)}
                                className="flex items-center gap-2 text-[#3E8498] hover:text-[#3E8498]"
                            >
                                View Details
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}