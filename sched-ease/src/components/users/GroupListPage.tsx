import { useState } from 'react';
import { Mail, Phone, Users, ChevronDown, ChevronUp, Award, Code, Palette, Database, FileText } from 'lucide-react';

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
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
            {skill}
        </span>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    <span className="text-indigo-600">{groupInfo.name}</span> Dashboard
                </h2>
            </div>

            {/* Project Overview Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-l-4 border-indigo-500 transform transition-all">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Project Overview</h3>
                        <p className="text-gray-700 mb-4">{groupInfo.projectDescription}</p>
                        <div className="flex items-center gap-2 text-indigo-600">
                            <span className="font-medium">Deadline:</span> {groupInfo.deadline}
                        </div>
                    </div>
                    <div className="bg-indigo-100 rounded-full p-3">
                        <Users size={24} className="text-indigo-600" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Team Lead Card */}
                <div className="md:col-span-1">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full border-t-4 border-amber-500">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-semibold text-lg flex items-center">
                                    <Award size={20} className="text-amber-500 mr-2" />
                                    Group Leader
                                </h4>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                                        {groupInfo.leader.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <p className="font-bold text-lg">{groupInfo.leader.name}</p>
                                    <p className="text-gray-600 text-sm">Student ID: {groupInfo.leader.studentId}</p>
                                </div>

                                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Mail size={16} className="text-amber-500" />
                                        <span>{groupInfo.leader.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone size={16} className="text-amber-500" />
                                        <span>{groupInfo.leader.mobile}</span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-700 mb-2">{groupInfo.leader.bio}</p>
                                    <div className="mt-3">
                                        {groupInfo.leader.skills.map((skill, i) => (
                                            <SkillBadge key={i} skill={skill} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Members Section */}
                <div className="md:col-span-2">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full border-t-4 border-indigo-500">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-semibold text-lg flex items-center">
                                    <Users size={20} className="text-indigo-500 mr-2" />
                                    Team Members
                                </h4>
                                <div className="text-indigo-600 text-sm font-medium">
                                    Supervised by: {groupInfo.supervisor}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {groupInfo.members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:border-indigo-200"
                                    >
                                        <div
                                            className="p-4 cursor-pointer flex justify-between items-center"
                                            onClick={() => toggleMember(index)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-100 rounded-lg">
                                                    {member.icon}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                    <p className="text-gray-600 text-sm">Student ID: {member.studentId}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-indigo-600 font-medium">{member.role}</span>
                                                {expandedMember === index ?
                                                    <ChevronUp size={18} className="text-gray-500" /> :
                                                    <ChevronDown size={18} className="text-gray-500" />
                                                }
                                            </div>
                                        </div>

                                        {expandedMember === index && (
                                            <div className="p-4 pt-0 border-t border-gray-100 bg-white">
                                                <p className="text-sm text-gray-700 mb-3">{member.bio}</p>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Skills:</p>
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
        </div>
    );
}