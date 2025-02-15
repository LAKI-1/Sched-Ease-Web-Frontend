import { Users, Mail, Phone } from 'lucide-react';

export function Group() {
    const groupInfo = {
        name: 'CS-66',
        leader: {
            name: 'Lakindu Samarasignhe',
            email: 'lakindu.s@gmail.com',
            mobile: '+94751234567',
            studentId: 'ST1167'
        },
        members: [
            { name: 'Faaeq Fazal', studentId: 'ST1190'},
            { name: 'Cheran Li', studentId: 'ST1111'},
        ],
        supervisor: 'Mr. John Doe'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Users size={32} className="text-[#3E8498]" />
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