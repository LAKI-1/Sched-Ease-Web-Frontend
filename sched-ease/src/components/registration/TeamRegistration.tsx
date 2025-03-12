import { useState, useEffect } from 'react';
import { Search, UserPlus, Check, X, Star, Users, Award, Rocket } from 'lucide-react';

interface Student {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface Team {
    members: Student[];
    confirmed: boolean;
    name: string;
}

// Expanded mock data with avatar placeholders
const mockStudents: Student[] = [
    { id: "1", name: "John Doe", email: "john@example.com", avatar: "/api/placeholder/40/40" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "/api/placeholder/40/40" },
    { id: "3", name: "Alice Johnson", email: "alice@example.com", avatar: "/api/placeholder/40/40" },
    { id: "4", name: "Bob Wilson", email: "bob@example.com", avatar: "/api/placeholder/40/40" },
    { id: "5", name: "Carol Brown", email: "carol@example.com", avatar: "/api/placeholder/40/40" },
    { id: "6", name: "David Lee", email: "david@example.com", avatar: "/api/placeholder/40/40" },
    { id: "7", name: "Eva Garcia", email: "eva@example.com", avatar: "/api/placeholder/40/40" },
    { id: "8", name: "Frank Miller", email: "frank@example.com", avatar: "/api/placeholder/40/40" },
];

// Team name suggestions with space theme
const teamNameSuggestions = [
    "Cosmic Explorers",
    "Stellar Navigators",
    "Galaxy Guardians",
    "Nebula Pioneers",
    "Orbit Innovators",
    "Quantum Voyagers"
];

// CSS animations and custom styles
const customStyles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(-10px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;

export function TeamRegistration() {
    const [searchTerm, setSearchTerm] = useState('');
    const [team, setTeam] = useState<Team>({
        members: [],
        confirmed: false,
        name: teamNameSuggestions[Math.floor(Math.random() * teamNameSuggestions.length)]
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        // Update completion percentage based on team size
        setCompletionPercentage((team.members.length / 6) * 100);
    }, [team.members.length]);

    const filteredStudents = mockStudents.filter(student =>
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !team.members.find(member => member.id === student.id)
    );

    const addToTeam = (student: Student) => {
        if (team.members.length >= 6) {
            setError('Maximum team size is 6 members');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setTeam(prev => ({
            ...prev,
            members: [...prev.members, student]
        }));
        setSuccess(`${student.name} has joined your cosmic crew!`);
        setTimeout(() => setSuccess(''), 2000);
    };

    const removeFromTeam = (studentId: string) => {
        const memberName = team.members.find(m => m.id === studentId)?.name;
        setTeam(prev => ({
            ...prev,
            members: prev.members.filter(member => member.id !== studentId)
        }));
        setSuccess(`${memberName} has left the spacecraft`);
        setTimeout(() => setSuccess(''), 2000);
    };

    const confirmTeam = () => {
        if (team.members.length !== 6) {
            setError('Your space mission requires exactly 6 crew members');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setTeam(prev => ({ ...prev, confirmed: true }));
        // Here you would typically make an API call to save the team
    };

    const setTeamName = (name: string) => {
        setTeam(prev => ({ ...prev, name }));
        setShowSuggestions(false);
    };

    if (team.confirmed) {
        return (
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg shadow-md text-gray-800">
                <style>{customStyles}</style>
                <div className="flex items-center justify-between mb-8 border-b border-blue-200 pb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-800 flex items-center">
                            <Rocket className="w-8 h-8 mr-2 text-blue-600" />
                            {team.name} Launch Confirmed!
                        </h2>
                        <p className="text-blue-600 mt-2">Your cosmic journey awaits</p>
                    </div>
                    <div className="bg-green-400 p-3 rounded-full" style={{ animation: 'pulse 2s infinite' }}>
                        <Check className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {team.members.map((member, index) => (
                        <div key={member.id}
                             className="flex items-center p-4 bg-white rounded-lg border border-blue-200 transition-all hover:bg-blue-50"
                             style={{ animation: 'fadeIn 0.3s ease-in-out', animationDelay: `${index * 0.1}s` }}>
                            <div className="mr-3 bg-blue-200 rounded-full p-2">
                                {member.avatar ? (
                                    <img src={member.avatar} alt="" className="w-10 h-10 rounded-full" />
                                ) : (
                                    <Users className="w-10 h-10 text-blue-600" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-gray-800">{member.name}</p>
                                <p className="text-blue-600">{member.email}</p>
                            </div>
                            <Star className="w-4 h-4 text-yellow-500 ml-auto" />
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 flex items-center mx-auto">
                        <Award className="w-5 h-5 mr-2" />
                        View Mission Details
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <style>{customStyles}</style>
            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>

            {/* Main container */}
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-blue-700">SDGP Team Assembly</h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={team.name}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Team Name"
                            className="bg-gray-50 text-gray-800 px-4 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => setShowSuggestions(!showSuggestions)}
                            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-r-lg text-white"
                        >
                            <Star className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {showSuggestions && (
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg grid grid-cols-2 gap-2" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        {teamNameSuggestions.map((name, index) => (
                            <button
                                key={index}
                                onClick={() => setTeamName(name)}
                                className="text-left px-3 py-2 rounded hover:bg-blue-100 transition-colors text-blue-700"
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Notification area */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-600" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <p className="flex items-center">
                            <X className="w-5 h-5 mr-2" />
                            {error}
                        </p>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-lg text-green-600" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <p className="flex items-center">
                            <Check className="w-5 h-5 mr-2" />
                            {success}
                        </p>
                    </div>
                )}

                {/* Search Bar */}
                <div className={`relative mb-6 transition-all ${isSearchFocused ? 'ring-2 ring-blue-500' : ''}`}>
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                    <input
                        type="text"
                        placeholder="Scan for crew members by name or email..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-gray-800 placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </div>

                {/* Student List */}
                <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <div
                                key={student.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 transition-all transform hover:translate-x-1"
                            >
                                <div className="flex items-center">
                                    {student.avatar ? (
                                        <img src={student.avatar} alt="" className="w-10 h-10 rounded-full mr-3" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                                            {student.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-800">{student.name}</p>
                                        <p className="text-sm text-gray-500">{student.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => addToTeam(student)}
                                    className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors transform hover:scale-110 text-white"
                                >
                                    <UserPlus className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <p>No matching crew members found in this sector</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Selected Team Members */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md text-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center text-blue-700">
                    <Users className="w-5 h-5 mr-2" />
                    Crew Manifest ({team.members.length}/6)
                </h3>

                <div className="space-y-3 mb-6">
                    {team.members.length > 0 ? (
                        team.members.map((member, index) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100 hover:bg-blue-50 transition-all"
                                style={{ animation: 'slideIn 0.3s ease-out forwards', animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-center">
                                    {member.avatar ? (
                                        <img src={member.avatar} alt="" className="w-10 h-10 rounded-full mr-3" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-800">{member.name}</p>
                                        <p className="text-sm text-blue-600">{member.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromTeam(member.id)}
                                    className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors transform hover:scale-110 text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed border-blue-200 rounded-lg">
                            <p className="text-blue-600">Your spacecraft needs crew members</p>
                            <p className="text-sm text-blue-500 mt-2">Add 6 members to launch your mission</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={confirmTeam}
                    disabled={team.members.length !== 6}
                    className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all ${
                        team.members.length === 6
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    <Rocket className={`w-5 h-5 mr-2 ${team.members.length === 6 ? 'animate-pulse' : ''}`} />
                    {team.members.length === 6 ? 'Launch Mission' : `Add ${6 - team.members.length} More Crew Members`}
                </button>
            </div>
        </div>
    );
}