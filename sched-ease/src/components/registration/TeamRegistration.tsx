import React from 'react';

const existingTeams = {
    CS: ['01', '02'],
    SE: ['01']
};

const tutorialGroups = [
    ...Array(10).fill(null).map((_, i) => ({ id: `CS-G${i + 1}`, name: `CS-G${i + 1}` })),
    ...Array(10).fill(null).map((_, i) => ({ id: `SE-G${i + 1}`, name: `SE-G${i + 1}` }))
];

export function TeamRegistration() {
    const [registrationData, setRegistrationData] = React.useState({
        teamType: 'CS',
        members: Array(6).fill({ name: '', studentId: '', email: '', tutorialGroup: '' })
    });

    const getNextTeamId = (type: 'CS' | 'SE') => {
        const existingIds = existingTeams[type];
        const lastId = existingIds[existingIds.length - 1];
        const nextNumber = (parseInt(lastId) + 1).toString().padStart(2, '0');
        return `${type}-${nextNumber}`;
    };

    const handleRegistration = (e: React.FormEvent) => {
        e.preventDefault();
        const nextTeamId = getNextTeamId(registrationData.teamType as 'CS' | 'SE');
        console.log('Registering team:', nextTeamId);
    };

    const filteredTutorialGroups = tutorialGroups.filter(group =>
        group.id.startsWith(registrationData.teamType)
    );

    return (
        <div className="min-h-screen flex items-center justify-center py-1 px-4 sm:px-6 lg:px-12">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center mb-8">
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
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="CS">CS</option>
                                <option value="SE">SE</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                        {registrationData.members.map((member, index) => (
                            <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-4 border-b pb-6">
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Student Email</label>
                                    <input
                                        type="email"
                                        value={member.email}
                                        onChange={(e) => {
                                            const newMembers = [...registrationData.members];
                                            newMembers[index] = { ...member, email: e.target.value };
                                            setRegistrationData({ ...registrationData, members: newMembers });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            Register Team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}