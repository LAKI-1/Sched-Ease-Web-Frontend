import { useState } from 'react';
import { Mail, Phone, Users, ChevronDown, ChevronUp, Award, Code, Palette, Database, FileText } from 'lucide-react';
import '../../css/GroupListPage.css';

type Skill = string;

interface TeamMember {
    name: string;
    studentId: string;
    role: string;
    bio: string;
    skills: Skill[];
    icon?: React.ReactNode;
}

interface TeamLeader extends TeamMember {
    email: string;
    mobile: string;
}

interface GroupInfo {
    name: string;
    leader: TeamLeader;
    members: TeamMember[];
    supervisor: string;
    projectDescription: string;
    deadline: string;
}

export default function GroupListPage() {
    const [expandedMember, setExpandedMember] = useState<number | null>(null);

    const groupInfo: GroupInfo = {
        name: 'Team Alpha',
        leader: {
            name: 'John Smith',
            email: 'john.smith@example.com',
            mobile: '+1234567890',
            studentId: 'ST12345',
            bio: 'Full-stack developer with 3 years of experience in React and Node.js.',
            skills: ['Project Management', 'React', 'Node.js', 'MongoDB'],
            role: 'Team Leader'
        },
        members: [
            {
                name: 'Sarah Johnson',
                studentId: 'ST12346',
                role: 'Frontend Developer',
                bio: 'Passionate about creating intuitive user interfaces with modern JavaScript frameworks.',
                skills: ['React', 'Vue.js', 'CSS/SASS', 'JavaScript'],
                icon: <Code className="text-blue-500" />
            },
            {
                name: 'Michael Lee',
                studentId: 'ST12347',
                role: 'Backend Developer',
                bio: 'Database expert specializing in API design and performance optimization.',
                skills: ['Python', 'Django', 'SQL', 'Docker'],
                icon: <Code className="text-green-500" />
            },
            {
                name: 'Emily Brown',
                studentId: 'ST12348',
                role: 'UI/UX Designer',
                bio: 'Creative designer with a focus on user-centered design principles.',
                skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
                icon: <Palette className="text-purple-500" />
            },
            {
                name: 'David Wilson',
                studentId: 'ST12349',
                role: 'Database Administrator',
                bio: 'Experienced in designing and optimizing database structures for high-performance applications.',
                skills: ['MongoDB', 'PostgreSQL', 'Database Optimization', 'Data Modeling'],
                icon: <Database className="text-red-500" />
            },
            {
                name: 'Jennifer Garcia',
                studentId: 'ST12350',
                role: 'Technical Writer',
                bio: 'Specializes in creating clear, concise documentation for complex technical systems.',
                skills: ['Documentation', 'Technical Writing', 'Markdown', 'UX Copy'],
                icon: <FileText className="text-amber-500" />
            }
        ],
        supervisor: 'Dr. Sarah Wilson',
        projectDescription: 'Developing an innovative campus navigation system with AR features to help new students find their way around campus facilities.',
        deadline: 'May 15, 2025'
    };

    const toggleMember = (index: number) => {
        if (expandedMember === index) {
            setExpandedMember(null);
        } else {
            setExpandedMember(index);
        }
    };

    const SkillBadge = ({ skill }: { skill: Skill }) => (
        <span className="skill-badge">
            {skill}
        </span>
    );

    return (
        <div className="group-container">
            <div className="header-container">
                <h2 className="header-title">
                    <span>{groupInfo.name}</span> Dashboard
                </h2>
            </div>

            {/* Project Overview Card */}
            <div className="project-card">
                <div className="project-header">
                    <div>
                        <h3 className="project-title">Project Overview</h3>
                        <p className="project-description">{groupInfo.projectDescription}</p>
                        <div className="project-deadline">
                            <span>Deadline:</span> {groupInfo.deadline}
                        </div>
                    </div>
                    <div className="project-icon-container">
                        <Users size={24} className="project-icon" />
                    </div>
                </div>
            </div>

            <div className="team-grid">
                {/* Team Lead Card */}
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
                                {groupInfo.leader.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <p className="team-lead-name">{groupInfo.leader.name}</p>
                            <p className="team-lead-id">Student ID: {groupInfo.leader.studentId}</p>
                        </div>

                        <div className="team-lead-contact">
                            <div className="contact-item">
                                <Mail size={16} className="contact-icon" />
                                <span>{groupInfo.leader.email}</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={16} className="contact-icon" />
                                <span>{groupInfo.leader.mobile}</span>
                            </div>
                        </div>

                        <div>
                            <p className="team-lead-bio">{groupInfo.leader.bio}</p>
                            <div>
                                {groupInfo.leader.skills.map((skill, i) => (
                                    <SkillBadge key={i} skill={skill} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Members Section */}
                <div className="team-members-card">
                    <div className="team-members-content">
                        <div className="team-members-header">
                            <h4 className="team-members-title">
                                <Users size={20} className="team-members-icon" />
                                Team Members
                            </h4>
                            <div className="supervisor-text">
                                Supervised by: {groupInfo.supervisor}
                            </div>
                        </div>

                        <div>
                            {groupInfo.members.map((member, index) => (
                                <div
                                    key={index}
                                    className="member-card"
                                >
                                    <div
                                        className="member-header"
                                        onClick={() => toggleMember(index)}
                                    >
                                        <div className="member-info">
                                            <div className="member-icon-container">
                                                {member.icon}
                                            </div>
                                            <div className="member-details">
                                                <p className="member-name">{member.name}</p>
                                                <p className="member-id">Student ID: {member.studentId}</p>
                                            </div>
                                        </div>
                                        <div className="member-info">
                                            <span className="member-role">{member.role}</span>
                                            {expandedMember === index ?
                                                <ChevronUp size={18} className="text-gray-500" /> :
                                                <ChevronDown size={18} className="text-gray-500" />
                                            }
                                        </div>
                                    </div>

                                    {expandedMember === index && (
                                        <div className="member-content">
                                            <p className="member-bio">{member.bio}</p>
                                            <div>
                                                <p className="skills-label">Skills:</p>
                                                {member.skills.map((skill, i) => (
                                                    <SkillBadge key={i} skill={skill} />
                                                ))}
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