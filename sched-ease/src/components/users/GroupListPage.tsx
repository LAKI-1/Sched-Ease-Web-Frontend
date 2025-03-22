import { useState, useEffect } from 'react';
import { Mail, Users, ChevronDown, ChevronUp, Award, Code } from 'lucide-react';
import '../../css/GroupListPage.css';

interface TeamMember {
    id: number;
    name: string;
    email: string;
    course: string;
    tutorialGroup: string;
    isLeader: boolean;
}

interface Group {
    id: string;
    teamId: string;
    course: string;
    groupNo: number;
    status: 'pending' | 'approved' | 'rejected';
    registrationDate: string;
    members: TeamMember[];
}

interface ApiError {
    message: string;
}

export default function GroupListPage() {
    const [expandedMember, setExpandedMember] = useState<number | null>(null);
    const [group, setGroup] = useState<Group | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchGroup();
    }, []);

    const fetchGroup = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/teams');
            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message || 'Failed to fetch group');
            }
            const data = await response.json();
            // Get the first approved group for now
            // You might want to modify this to get a specific group based on some criteria
            const approvedGroup = data.find((g: Group) => g.status === 'approved');
            if (!approvedGroup) {
                throw new Error('No approved group found');
            }
            setGroup(approvedGroup);
        } catch (error) {
            setError('Failed to load group: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMember = (index: number) => {
        setExpandedMember(expandedMember === index ? null : index);
    };

    if (isLoading) {
        return (
            <div className="group-container">
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading group details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="group-container">
                <div className="text-center py-4">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={fetchGroup}
                        className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!group) {
        return (
            <div className="group-container">
                <div className="text-center py-4">
                    <p className="text-gray-500">No approved group found.</p>
                </div>
            </div>
        );
    }

    const leader = group.members.find(member => member.isLeader);

    return (
        <div className="group-container">
            <div className="header-container">
                <h2 className="header-title">
                    <span>Team {group.teamId}</span> Dashboard
                </h2>
            </div>

            {/* Project Overview Card */}
            <div className="project-card">
                <div className="project-header">
                    <div>
                        <h3 className="project-title">Group Overview</h3>
                        <p className="project-description">
                            Course: {group.course}
                            <br />
                            Group Number: {group.groupNo}
                        </p>
                        <div className="flex items-center mt-2">
                            <span className="mr-2">Status:</span>
                            <div className={`px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 ${
                                group.status === 'approved'
                                    ? 'bg-green-100 text-green-800'
                                    : group.status === 'rejected'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    group.status === 'approved'
                                        ? 'bg-green-400'
                                        : group.status === 'rejected'
                                            ? 'bg-red-400'
                                            : 'bg-yellow-400'
                                }`} />
                                {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                            </div>
                        </div>
                    </div>
                    <div className="project-icon-container">
                        <Users size={24} className="project-icon" />
                    </div>
                </div>
            </div>

            <div className="team-grid">
                {/* Team Lead Card */}
                {leader && (
                    <div className="team-lead-card">
                        <div className="team-lead-content">
                            <div className="team-lead-header">
                                <h4 className="team-lead-title">
                                    <Award size={20} className="team-lead-icon" />
                                    Group Leader
                                </h4>
                            </div>

                            <div className="team-lead-profile">
                                <div className="team-lead-avatar">
                                    {leader.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <p className="team-lead-name">{leader.name}</p>
                                <p className="team-lead-id">Student ID: {leader.id}</p>
                            </div>

                            <div className="team-lead-contact">
                                <div className="contact-item">
                                    <Mail size={16} className="contact-icon" />
                                    <span>{leader.email}</span>
                                </div>
                                <div className="contact-item">
                                    <Code size={16} className="contact-icon" />
                                    <span>{leader.course}</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-600">Tutorial Group: {leader.tutorialGroup}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Team Members Section */}
                <div className="team-members-card">
                    <div className="team-members-content">
                        <div className="team-members-header">
                            <h4 className="team-members-title">
                                <Users size={20} className="team-members-icon" />
                                Team Members
                            </h4>
                        </div>

                        <div>
                            {group.members
                                .filter(member => !member.isLeader)
                                .map((member, index) => (
                                    <div
                                        key={member.id}
                                        className="member-card"
                                    >
                                        <div
                                            className="member-header"
                                            onClick={() => toggleMember(index)}
                                        >
                                            <div className="member-info">
                                                <div className="member-details">
                                                    <p className="member-name">{member.name}</p>
                                                    <p className="member-id">Student ID: {member.id}</p>
                                                </div>
                                            </div>
                                            <div className="member-info">
                                                <span className="member-role">{member.course}</span>
                                                {expandedMember === index ?
                                                    <ChevronUp size={18} className="text-gray-500" /> :
                                                    <ChevronDown size={18} className="text-gray-500" />
                                                }
                                            </div>
                                        </div>

                                        {expandedMember === index && (
                                            <div className="member-content">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-600">
                                                        <Mail className="inline-block w-4 h-4 mr-2" />
                                                        {member.email}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <Code className="inline-block w-4 h-4 mr-2" />
                                                        {member.course}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Tutorial Group: {member.tutorialGroup}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}