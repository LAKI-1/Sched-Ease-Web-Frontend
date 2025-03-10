import { useState } from 'react';
import { Search, UserPlus, Check, X } from 'lucide-react';

interface Student {
    id: string;
    name: string;
    email: string;
}

interface Team {
    members: Student[];
    confirmed: boolean;
}

const mockStudents: Student[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Alice Johnson", email: "alice@example.com" },
    { id: "4", name: "Bob Wilson", email: "bob@example.com" },
    { id: "5", name: "Carol Brown", email: "carol@example.com" },
    { id: "6", name: "David Lee", email: "david@example.com" },
    { id: "7", name: "Eva Garcia", email: "eva@example.com" },
    { id: "8", name: "Frank Miller", email: "frank@example.com" },
];

export function TeamRegistration() {
    const [searchTerm, setSearchTerm] = useState('');
    const [team, setTeam] = useState<Team>({ members: [], confirmed: false });
    const [error, setError] = useState<string>('');

    const filteredStudents = mockStudents.filter(student =>
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !team.members.find(member => member.id === student.id)
    );

    const addToTeam = (student: Student) => {
        if (team.members.length >= 6) {
            setError('Maximum team size is 6 members');
            return;
        }
        setTeam(prev => ({
            ...prev,
            members: [...prev.members, student]
        }));
        setError('');
    };

    const removeFromTeam = (studentId: string) => {
        setTeam(prev => ({
            ...prev,
            members: prev.members.filter(member => member.id !== studentId)
        }));
    };

    const confirmTeam = () => {
        if (team.members.length !== 6) {
            setError('Team must have exactly 6 members');
            return;
        }
        setTeam(prev => ({ ...prev, confirmed: true }));
        setError('');
        // Here you would typically make an API call to save the team
    };

    if (team.confirmed) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-green-600">Team Confirmed!</h2>
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-4">
                    {team.members.map(member => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                            <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Team Registration</h2>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students by name or email..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Student List */}
                <div className="space-y-2 mb-6">
                    {filteredStudents.map(student => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                            <div>
                                <p className="font-semibold">{student.name}</p>
                                <p className="text-sm text-gray-600">{student.email}</p>
                            </div>
                            <button
                                onClick={() => addToTeam(student)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
                                <UserPlus className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Team Members */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Selected Team Members ({team.members.length}/6)</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="space-y-3 mb-6">
                    {team.members.map(member => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                            <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                            </div>
                            <button
                                onClick={() => removeFromTeam(member.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={confirmTeam}
                    disabled={team.members.length !== 6}
                    className={`w-full py-2 px-4 rounded-lg font-semibold ${
                        team.members.length === 6
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Confirm Team
                </button>
            </div>
        </div>
    );
}