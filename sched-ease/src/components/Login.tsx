import React from 'react';
import { UserCircle, Users } from 'lucide-react';
import type { Role } from '../types';

interface LoginProps {
    onLogin: (role: Role) => void;
}

// Mock data for existing teams - in a real app, this would come from the database
const existingTeams = {
    CS: ['01', '02'], // CS-01 and CS-02 exist
    SE: ['01']        // SE-01 exists
};

// Generate tutorial groups (CS-G1 to CS-G10 and SE-G1 to SE-G10)
const tutorialGroups = [
    ...Array(10).fill(null).map((_, i) => ({ id: `CS-G${i + 1}`, name: `CS-G${i + 1}` })),
    ...Array(10).fill(null).map((_, i) => ({ id: `SE-G${i + 1}`, name: `SE-G${i + 1}` }))
];

export function Login({ onLogin }: LoginProps) {
    const [selectedRole, setSelectedRole] = React.useState<Role>('student');
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [registrationData, setRegistrationData] = React.useState({
        teamType: 'CS',
        leaderName: '',
        leaderEmail: '',
        leaderStudentId: '',
        leaderTutorialGroup: '',
        members: Array(6).fill({ name: '', studentId: '', tutorialGroup: '' })
    });

    const getNextTeamId = (type: 'CS' | 'SE') => {
        const existingIds = existingTeams[type];
        const lastId = existingIds[existingIds.length - 1];
        const nextNumber = (parseInt(lastId) + 1).toString().padStart(2, '0');
        return `${type}-${nextNumber}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(selectedRole);
    };

    const handleRegistration = (e: React.FormEvent) => {
        e.preventDefault();
        const nextTeamId = getNextTeamId(registrationData.teamType as 'CS' | 'SE');
        console.log('Registering team:', nextTeamId);
        // Handle team registration logic here
        setIsRegistering(false);
    };

    // Filter tutorial groups based on selected team type
    const filteredTutorialGroups = tutorialGroups.filter(group =>
        group.id.startsWith(registrationData.teamType)
    );

    if (isRegistering) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8">
                    <div className="flex flex-col items-center mb-8">
                        <Users className="w-20 h-20 text-[#3E8498]" />
                        <h2 className="mt-4 text-2xl font-bold text-gray-900">Team Registration</h2>
                        <p className="mt-2 text-gray-600">Register your SDGP team</p>
                    </div>

                    <form onSubmit={handleRegistration} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Team Type</label>
                                <select
                                    value={registrationData.teamType}
                                    onChange={(e) => setRegistrationData({ ...registrationData, teamType: e.target.value })}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                >
                                    <option value="CS">CS</option>
                                    <option value="SE">SE</option>
                                </select>
                            </div>
                            {/*<div>*/}
                            {/*    <label className="block text-sm font-medium text-gray-700">Next Team ID</label>*/}
                            {/*    <div className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-lg text-gray-500">*/}
                            {/*        {getNextTeamId(registrationData.teamType as 'CS' | 'SE')}*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Team Leader</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={registrationData.leaderName}
                                        onChange={(e) => setRegistrationData({ ...registrationData, leaderName: e.target.value })}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Student ID</label>
                                    <input
                                        type="text"
                                        value={registrationData.leaderStudentId}
                                        onChange={(e) => setRegistrationData({ ...registrationData, leaderStudentId: e.target.value })}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={registrationData.leaderEmail}
                                        onChange={(e) => setRegistrationData({ ...registrationData, leaderEmail: e.target.value })}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tutorial Group</label>
                                    <select
                                        value={registrationData.leaderTutorialGroup}
                                        onChange={(e) => setRegistrationData({ ...registrationData, leaderTutorialGroup: e.target.value })}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                        required
                                    >
                                        <option value="">Select Tutorial Group</option>
                                        {filteredTutorialGroups.map(group => (
                                            <option key={group.id} value={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                            {registrationData.members.map((member, index) => (
                                <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-b pb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => {
                                                const newMembers = [...registrationData.members];
                                                newMembers[index] = { ...member, name: e.target.value };
                                                setRegistrationData({ ...registrationData, members: newMembers });
                                            }}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Student ID</label>
                                        <input
                                            type="text"
                                            value={member.studentId}
                                            onChange={(e) => {
                                                const newMembers = [...registrationData.members];
                                                newMembers[index] = { ...member, studentId: e.target.value };
                                                setRegistrationData({ ...registrationData, members: newMembers });
                                            }}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tutorial Group</label>
                                        <select
                                            value={member.tutorialGroup}
                                            onChange={(e) => {
                                                const newMembers = [...registrationData.members];
                                                newMembers[index] = { ...member, tutorialGroup: e.target.value };
                                                setRegistrationData({ ...registrationData, members: newMembers });
                                            }}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                                            required
                                        >
                                            <option value="">Select Tutorial Group</option>
                                            {filteredTutorialGroups.map(group => (
                                                <option key={group.id} value={group.id}>
                                                    {group.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsRegistering(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#3E8498] text-white rounded-lg hover:bg-[#3E8498]"
                            >
                                Register Team
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
                <div className="flex flex-col items-center mb-8">
                    <UserCircle className="w-20 h-20 text-[#3E8498]" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Sched-Ease</h2>
                    <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Select Role
                        </label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value as Role)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3E8498] focus:ring-[#3E8498]"
                        >
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="sdgp_administrator">SDGP Administrator</option>
                            <option value="administrator">Administrator</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#3E8498] hover:bg-[#3E8498]"
                        >
                            Sign in
                        </button>
                        {selectedRole === 'student' && (
                            <button
                                type="button"
                                onClick={() => setIsRegistering(true)}
                                className="w-full flex justify-center py-2 px-4 border border-[#3E8498] rounded-lg shadow-sm text-sm font-medium text-[#3E8498] hover:bg-[#3E8498] hover:text-white"
                            >
                                Register Team
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
