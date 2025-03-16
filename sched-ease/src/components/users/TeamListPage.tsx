import React from 'react';
import { Users, Mail, GraduationCap, CheckCircle, XCircle } from 'lucide-react';
import '../../css/TeamListPage.css';

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
            <div className="team-container">
                <div>
                    <button
                        onClick={() => setSelectedTeam(null)}
                        className="back-button"
                    >
                        ← Back to Teams
                    </button>
                </div>

                <div className="team-detail-card">
                    <div className="team-detail-content">
                        <div className="team-header">
                            <div>
                                <h2 className="team-id">{team.teamId}</h2>
                                <div className="team-info">
                                    <p className="team-date">Registration Date: {team.registrationDate}</p>
                                    <p className="team-status">
                                        Status:
                                        <span className={`status-badge ${team.status}`}>
                                            {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {team.status === 'pending' && (
                                <div className="action-buttons">
                                    <button
                                        onClick={() => handleApprove(team.id)}
                                        className="approve-button"
                                    >
                                        <CheckCircle size={20} />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(team.id)}
                                        className="reject-button"
                                    >
                                        <XCircle size={20} />
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>

                        {actionMessage && (
                            <div className="action-message">
                                {actionMessage}
                            </div>
                        )}

                        <div className="members-section">
                            <h3 className="members-title">Team Members</h3>
                            <div className="members-grid">
                                {team.members.map((member, index) => (
                                    <div key={index} className="member-card">
                                        <div className="member-content">
                                            <div className="member-info">
                                                <p className="member-name">
                                                    {member.name}
                                                    {member.isLeader && (
                                                        <span className="leader-badge">
                                                            Team Leader
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="member-detail">
                                                    <GraduationCap size={16} />
                                                    ID: {member.studentId}
                                                </p>
                                                <p className="member-detail">
                                                    <Mail size={16} />
                                                    {member.email}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="tutorial-group">
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
        <div className="team-container">
            <div className="header-container">
                <h2 className="header-title">Registered Teams</h2>
            </div>

            <div className="teams-grid">
                {teams.map((team) => (
                    <div key={team.id} className="team-card">
                        <div className="team-card-content">
                            <div className="team-card-info">
                                <Users className="team-icon" />
                                <div className="team-details">
                                    <h3 className="team-name">{team.teamId}</h3>
                                    <div className="team-meta">
                                        <p>{team.members.length} members</p>
                                        <p>Registered: {team.registrationDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="team-actions">
                                <span className={`status-badge ${team.status}`}>
                                    {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                                </span>
                                <button
                                    onClick={() => setSelectedTeam(team.id)}
                                    className="view-details-button"
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
