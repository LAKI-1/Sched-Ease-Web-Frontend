import { useState, useEffect } from 'react';
import { Search, UserPlus, Check, X } from 'lucide-react';

interface Student {
    id: number;
    name: string;
    email: string;
    course: string;
}

interface Team {
    members: Student[];
    confirmed: boolean;
    pendingApproval?: boolean;
    groupNo?: number;
    course?: string;
}

interface ApiError {
    message: string;
}

export function TeamRegistration() {
    const [searchTerm, setSearchTerm] = useState('');
    const [team, setTeam] = useState<Team>({ members: [], confirmed: false });
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setIsLoadingStudents(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/students');
            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message || 'Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            setError('Failed to load students: ' + (error as Error).message);
        } finally {
            setIsLoadingStudents(false);
        }
    };

    const filteredStudents = students.filter(student =>
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

    const removeFromTeam = (studentId: number) => {
        setTeam(prev => ({
            ...prev,
            members: prev.members.filter(member => member.id !== studentId)
        }));
        setError('');
    };

    const confirmTeam = async () => {
        if (team.members.length !== 6) {
            setError('Team must have exactly 6 members');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/teams/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentIds: team.members.map(member => member.id)
                })
            });

            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message || 'Failed to register team');
            }

            const registeredGroup = await response.json();
            setTeam(prev => ({
                ...prev,
                confirmed: true,
                pendingApproval: true,
                groupNo: registeredGroup.groupNo,
                course: registeredGroup.course
            }));
        } catch (error) {
            setError('Failed to register team: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    if (team.confirmed) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-600">
                            {team.pendingApproval ? 'Team Confirmed - Waiting for Lecturer Approval' : 'Team Confirmed!'}
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Group: {team.course}-{String(team.groupNo).padStart(2, '0')}
                        </p>
                    </div>
                    {team.pendingApproval ? (
                        <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse mr-2" />
                            <span className="text-yellow-600">Pending Approval</span>
                        </div>
                    ) : (
                        <Check className="w-8 h-8 text-green-600" />
                    )}
                </div>
                <div className="space-y-4">
                    {team.members.map(member => (
                        <div
                            key={member.id}
                            className={`flex items-center justify-between p-3 rounded-md ${
                                team.pendingApproval ? 'bg-yellow-50' : 'bg-green-50'
                            }`}
                        >
                            <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                                <p className="text-sm text-gray-500">{member.course}</p>
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
                    {isLoadingStudents ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Loading students...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-4">
                            <p className="text-red-500">{error}</p>
                            <button
                                onClick={fetchStudents}
                                className="mt-2 text-blue-600 hover:text-blue-800"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                                <div>
                                    <p className="font-semibold">{student.name}</p>
                                    <p className="text-sm text-gray-600">{student.email}</p>
                                    <p className="text-sm text-gray-500">{student.course}</p>
                                </div>
                                <button
                                    onClick={() => addToTeam(student)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                >
                                    <UserPlus className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            {searchTerm ? 'No students found matching your search' : 'No students available'}
                        </p>
                    )}
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
                                <p className="text-sm text-gray-500">{member.course}</p>
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
                    disabled={team.members.length !== 6 || isLoading}
                    className={`w-full py-2 px-4 rounded-lg font-semibold ${
                        team.members.length === 6 && !isLoading
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {isLoading ? 'Registering Team...' : 'Confirm Team'}
                </button>
            </div>
        </div>
    );
}