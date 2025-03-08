import { Mail, Phone } from 'lucide-react';

export default function GroupListPage() {
    const groupInfo = {
        name: 'Team Alpha',
        leader: {
            name: 'John Smith',
            email: 'john.smith@example.com',
            mobile: '+1234567890',
            studentId: 'ST12345'
        },
        members: [
            { name: 'Sarah Johnson', studentId: 'ST12346', role: 'Frontend Developer' },
            { name: 'Michael Lee', studentId: 'ST12347', role: 'Backend Developer' },
            { name: 'Emily Brown', studentId: 'ST12348', role: 'UI/UX Designer' }
        ],
        supervisor: 'Dr. Sarah Wilson'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">My Group</h2>
            </div>

            <div className="grid gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">{groupInfo.name}</h3>
                    <p className="text-gray-600 mb-6">Supervisor: {groupInfo.supervisor}</p>

                    <div className="border-t pt-6">
                        <h4 className="font-semibold mb-4">Group Leader</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">{groupInfo.leader.name}</p>
                                    <p className="text-gray-600">Student ID: {groupInfo.leader.studentId}</p>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} />
                                        <span>{groupInfo.leader.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} />
                                        <span>{groupInfo.leader.mobile}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t mt-6 pt-6">
                        <h4 className="font-semibold mb-4">Team Members</h4>
                        <div className="space-y-4">
                            {groupInfo.members.map((member, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{member.name}</p>
                                            <p className="text-gray-600">Student ID: {member.studentId}</p>
                                        </div>
                                        <span className="text-indigo-600">{member.role}</span>
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