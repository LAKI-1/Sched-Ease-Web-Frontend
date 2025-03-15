import { useState, useEffect } from 'react';
import { Search, UserPlus, Check, X } from 'lucide-react';
import '../../css/TeamRegistration.css';

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
        try {
            const response = await fetch('http://localhost:8080/api/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
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
    };

    const confirmTeam = async () => {
        if (team.members.length !== 6) {
            setError('Team must have exactly 6 members');
            return;
        }

        setIsLoading(true);
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
                throw new Error('Failed to register team');
            }

            const registeredGroup = await response.json();
            setTeam(prev => ({
                ...prev,
                confirmed: true,
                pendingApproval: true,
                groupNo: registeredGroup.groupNo,
                course: registeredGroup.course
            }));
            setError('');
        } catch (error) {
            setError('Failed to register team: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    if (team.confirmed) {
        return (
            <div className="registration-card">
                <div className="team-header">
                    <div>
                        <h2 className="team-title">
                            {team.pendingApproval ? 'Team Confirmed - Waiting for Lecturer Approval' : 'Team Confirmed!'}
                        </h2>
                        <p className="team-group">
                            Group: {team.course}-{String(team.groupNo).padStart(2, '0')}
                        </p>
                    </div>
                    {team.pendingApproval ? (
                        <div className="team-status">
                            <div className="status-indicator pending" />
                            <span className="status-text">Pending Approval</span>
                        </div>
                    ) : (
                        <Check className="w-8 h-8 text-green-600" />
                    )}
                </div>
                <div className="team-section">
                    {team.members.map(member => (
                        <div
                            key={member.id}
                            className={`member-card ${team.pendingApproval ? 'pending' : 'confirmed'}`}
                        >
                            <div className="student-info">
                                <p className="student-name">{member.name}</p>
                                <p className="student-email">{member.email}</p>
                                <p className="student-course">{member.course}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="team-registration">
            <div className="registration-card">
                <h2 className="card-title">Team Registration</h2>

                {/* Search Bar */}
                <div className="search-container">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search students by name or email..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Student List */}
                <div className="student-list">
                    {isLoadingStudents ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p className="loading-text">Loading students...</p>
                        </div>
                    ) : filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <div key={student.id} className="student-item">
                                <div className="student-info">
                                    <p className="student-name">{student.name}</p>
                                    <p className="student-email">{student.email}</p>
                                    <p className="student-course">{student.course}</p>
                                </div>
                                <button
                                    onClick={() => addToTeam(student)}
                                    className="add-button"
                                >
                                    <UserPlus className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="loading-text">
                            {searchTerm ? 'No students found matching your search' : 'No students available'}
                        </p>
                    )}
                </div>
            </div>

            {/* Selected Team Members */}
            <div className="registration-card">
                <h3 className="card-title">Selected Team Members ({team.members.length}/6)</h3>
                {error && <p className="error-message">{error}</p>}
                <div className="student-list">
                    {team.members.map(member => (
                        <div key={member.id} className="student-item">
                            <div className="student-info">
                                <p className="student-name">{member.name}</p>
                                <p className="student-email">{member.email}</p>
                                <p className="student-course">{member.course}</p>
                            </div>
                            <button
                                onClick={() => removeFromTeam(member.id)}
                                className="remove-button"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={confirmTeam}
                    disabled={team.members.length !== 6 || isLoading}
                    className={`confirm-button ${
                        team.members.length === 6 && !isLoading ? 'active' : 'disabled'
                    }`}
                >
                    {isLoading ? 'Registering Team...' : 'Confirm Team'}
                </button>
            </div>
        </div>
    );
}