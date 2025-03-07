import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import type { UserRole } from '../../types/auth';

interface FeedbackProps {
    role: UserRole;
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
    const teams = ['CS-20', 'SE-10'];

    const feedbacks: FeedbackItem[] = [
        {
            id: '1',
            teamId: 'CS-20',
            date: '2024-03-10',
            lecturer: 'Dr. Sarah Wilson',
            content: 'Good progress on the backend implementation. Need to improve API documentation.',
            status: 'completed'
        },
        {
            id: '2',
            teamId: 'CS-20',
            date: '2024-03-15',
            lecturer: 'Prof. James Chen',
            content: 'Frontend needs work. Consider implementing better error handling.',
            status: 'completed'
        },
        {
            id: '3',
            teamId: 'SE-10',
            date: '2024-03-12',
            lecturer: 'Dr. Michael Brown',
            content: 'Excellent database design. Continue focusing on security implementations.',
            status: 'completed'
        }
    ];

    const canViewAllTeams = role === 'sdgp_admin' || role === 'lecturer';
    const userTeam = 'CS-20'; // In a real app, this would come from user context

    const visibleTeams = canViewAllTeams ? teams : [userTeam];
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
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <button
                        onClick={() => setSelectedTeam(null)}
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                        <span>Back to Teams</span>
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">Team {selectedTeam}</h2>
                                <p className="text-gray-600 mt-1">Feedback History</p>
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
                <h2 className="text-2xl font-semibold text-gray-900">Team Feedback</h2>
            </div>

            <div className="grid gap-6">
                {visibleTeams.map((teamId) => (
                    <div key={teamId} className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Team {teamId}</h3>
                                <p className="text-gray-600">
                                    {feedbacks.filter(f => f.teamId === teamId).length} feedback entries
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedTeam(teamId)}
                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                            >
                                View Feedback
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}