import React, { useEffect, useState } from 'react';
import { Users, Mail, GraduationCap, CheckCircle, XCircle, Crown, IdCard } from 'lucide-react';
import '../../css/TeamListPage.css';

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
            <div className="team-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading teams...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="team-container">
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button onClick={fetchTeams} className="retry-button">
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
            <div className="team-container">
                <button
                    onClick={() => {
                        setSelectedTeam(null);
                        setSelectedLeader(null);
                        setActionMessage(null);
                    }}
                    className="back-button"
                >
                    ← Back to Teams
                </button>

                <div className="team-details">
                    <div className="team-header">
                        <div>
                            <h2 className="team-title">Team {team.teamId}</h2>
                            <p className="team-group">Group: {team.course}-{String(team.groupNo).padStart(2, '0')}</p>
                        </div>
                        <div className="status-indicator">
                            <div className={`status-dot ${team.status}`} />
                            <span className={`status-text ${team.status}`}>
                                {team.status === 'pending' ? 'Pending Approval' :
                                    team.status === 'approved' ? 'Approved' : 'Rejected'}
                            </span>
                        </div>
                    </div>

                    {actionMessage && (
                        <div className={`action-message ${actionMessage.includes('Failed') ? 'error' : 'success'}`}>
                            <p>{actionMessage}</p>
                        </div>
                    )}

                    {team.status === 'pending' && (
                        <div>
                            <div className="leader-selection-warning">
                                <p className="leader-selection-text">
                                    <Crown className="w-5 h-5" />
                                    Please select a team leader before approving the team
                                </p>
                            </div>
                            <div className="action-buttons">
                                <button
                                    onClick={() => handleApprove(team.id)}
                                    disabled={!selectedLeader}
                                    className={`approve-button ${selectedLeader ? 'enabled' : 'disabled'}`}
                                >
                                    <CheckCircle size={20} />
                                    Approve with Selected Leader
                                </button>
                                <button
                                    onClick={() => handleReject(team.id)}
                                    className="reject-button"
                                >
                                    <XCircle size={20} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="member-list">
                        {team.members.map((member, index) => (
                            <div
                                key={index}
                                className={`member-card ${team.status} ${team.status === 'pending' && selectedLeader === member.id ? 'selected' : ''}`}
                                onClick={() => team.status === 'pending' && handleSelectLeader(member.id)}
                            >
                                <div>
                                    <p className="member-info">
                                        {member.name}
                                        {member.isLeader && (
                                            <span className="leader-badge">
                                                <Crown size={14} /> Team Leader
                                            </span>
                                        )}
                                        {team.status === 'pending' && selectedLeader === member.id && (
                                            <span className="leader-badge">
                                                <Crown size={14} /> Selected as Leader
                                            </span>
                                        )}
                                    </p>
                                    <div className="member-details-container">
                                        <div className="member-detail-item">
                                            <IdCard size={16} />
                                            <span>Student ID: {member.id}</span>
                                        </div>
                                        <div className="member-detail-item">
                                            <Mail size={16} />
                                            <span>{member.email}</span>
                                        </div>
                                        <div className="member-detail-item">
                                            <GraduationCap size={16} />
                                            <span>{member.course}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className="tutorial-group">
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
        <div className="team-container">
            <div className="team-list-container">
                <h2 className="team-list-title">Registered Teams</h2>

                {teams.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-state-text">No teams registered yet.</p>
                    </div>
                ) : (
                    <div className="team-list">
                        {teams.map((team) => (
                            <div key={team.id} className="team-list-item">
                                <div className="team-list-info">
                                    <Users className="team-icon" />
                                    <div className="team-list-details">
                                        <h3>
                                            {team.course}-{String(team.groupNo).padStart(2, '0')}
                                        </h3>
                                        <div className="team-meta">
                                            <p>{team.members.length} members</p>
                                            <p>Registered: {team.registrationDate}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-actions">
                                    <div className={`status-badge ${team.status}`}>
                                        <div className={`status-indicator-dot ${team.status}`} />
                                        {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                                    </div>
                                    <button
                                        onClick={() => setSelectedTeam(team.id)}
                                        className="view-details-button"
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