import React, { useState, useEffect, ChangeEvent } from 'react';
import { Users, MessageSquare, MapPin, Trash2, Save, Upload } from 'lucide-react';
import axios from 'axios';
import '../../css/Timetable.css';

const API_BASE_URL = 'http://localhost:8080/api';

interface SessionDTO {
    lecturerIds: Set<number>;
    hallId: number;
    level: string;
    course: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    lectureOrTutorial: string;
    timeTableId: number;
}

interface GroupSession {
    id: string;
    group: string;
    lecturer: string;
    module: string;
    date: string;
    startTime: string;
    endTime: string;
    type: 'Lecture' | 'Tutorial';
    building: string;
    classroom: string;
    lecturerId?: number;
    hallId?: number;
    timeTableId?: number;
}

export function Timetable() {
    // API functions
    const api = {
        async saveSessions(groupId: number, sessions: SessionDTO[]): Promise<string> {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/sessions/add-to-group/${groupId}`,
                    sessions
                );
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data);
                }
                throw new Error('Failed to save sessions');
            }
        },

        async getHalls(): Promise<any[]> {
            try {
                const response = await axios.get(`${API_BASE_URL}/sessions/halls`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch halls');
            }
        },

        async getLecturers(): Promise<any[]> {
            try {
                const response = await axios.get(`${API_BASE_URL}/sessions/lecturers`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch lecturers');
            }
        }
    };

    const [selectedGroup, setSelectedGroup] = useState<string>('CS-G1');
    const [sessions, setSessions] = useState<GroupSession[]>([]);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [halls, setHalls] = useState<any[]>([]);
    const [lecturers, setLecturers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState({
        halls: true,
        lecturers: true
    });
    const [loadError, setLoadError] = useState({
        halls: '',
        lecturers: ''
    });
    const [newSession, setNewSession] = useState<GroupSession>({
        id: '',
        group: selectedGroup,
        lecturer: '',
        module: '',
        date: 'Monday',
        startTime: '09:00',
        endTime: '10:30',
        type: 'Lecture',
        building: '',
        classroom: '',
        lecturerId: undefined,
        hallId: undefined,
        timeTableId: 1 // You might want to make this dynamic based on your needs
    });

    // Updated fetch halls and lecturers with loading states
    useEffect(() => {
        const fetchData = async () => {
            // Reset errors
            setLoadError({ halls: '', lecturers: '' });

            // Fetch halls
            try {
                const hallsData = await api.getHalls();
                setHalls(hallsData);
            } catch (error) {
                setLoadError(prev => ({
                    ...prev,
                    halls: 'Failed to load buildings. Please try again.'
                }));
            } finally {
                setIsLoading(prev => ({ ...prev, halls: false }));
            }

            // Fetch lecturers
            try {
                const lecturersData = await api.getLecturers();
                setLecturers(lecturersData);
            } catch (error) {
                setLoadError(prev => ({
                    ...prev,
                    lecturers: 'Failed to load lecturers. Please try again.'
                }));
            } finally {
                setIsLoading(prev => ({ ...prev, lecturers: false }));
            }
        };

        fetchData();
    }, []);

    // Load saved sessions when component mounts or group changes
    useEffect(() => {
        const savedSessions = localStorage.getItem(`sessions_${selectedGroup}`);
        if (savedSessions) {
            setSessions(JSON.parse(savedSessions));
        } else {
            setSessions([]); // Start with empty array if no saved sessions
        }
    }, [selectedGroup]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = Array.from({ length: 9 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00`);
    const endTimes = Array.from({ length: 18 }, (_, i) => {
        const hour = Math.floor(i / 2) + 9;
        const minute = i % 2 === 0 ? '00' : '30';
        return `${String(hour).padStart(2, '0')}:${minute}`;
    });

    const filteredSessions = sessions.filter(session => session.group === selectedGroup);

    const handleCSVUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const rows = text.split('\n').map(row => row.trim());
            
            // Skip header row and empty rows
            const validRows = rows.slice(1).filter(row => row.length > 0);
            
            const newSessions: GroupSession[] = validRows.map((row, index) => {
                const [lecturer, module, date, startTime, endTime, type, building, classroom] = row.split(',').map(cell => cell.trim());
                
                // Find the corresponding hall and lecturer IDs
                const hall = halls.find(h => h.name === classroom && h.building === building);
                const lecturerObj = lecturers.find(l => l.name === lecturer);

                if (!hall || !lecturerObj) {
                    throw new Error(`Invalid hall or lecturer in row ${index + 2}`);
                }

                return {
                    id: `${Date.now()}-${index}`, // More unique ID generation
                    group: selectedGroup, // Always use the selected group
                    lecturer,
                    module,
                    date,
                    startTime,
                    endTime,
                    type: type as 'Lecture' | 'Tutorial',
                    building,
                    classroom,
                    lecturerId: lecturerObj.id,
                    hallId: hall.id,
                    timeTableId: 1
                };
            });

            // Add new sessions while preserving existing ones for other groups
            const otherGroupSessions = sessions.filter(session => session.group !== selectedGroup);
            setSessions([...otherGroupSessions, ...newSessions]);
            
            event.target.value = ''; // Reset file input
            alert(`Successfully imported ${newSessions.length} sessions for group ${selectedGroup}!`);
        } catch (error) {
            alert(`Error importing sessions for group ${selectedGroup}. Please ensure the file format is correct:\nLecturer,Module,Day,StartTime,EndTime,Type,Building,Classroom`);
            console.error('CSV parsing error:', error);
        }
    };

    const removeSession = (id: string) => {
        setSessions(sessions.filter(session => session.id !== id));
    };

    const handleSaveSessions = async () => {
        try {
            setSaveStatus('saving');

            // Convert sessions to backend DTO format
            const sessionsToSave: SessionDTO[] = sessions.map(session => ({
                lecturerIds: new Set([session.lecturerId!]),
                hallId: session.hallId!,
                level: '1', // You might want to make this dynamic
                course: session.module,
                dayOfWeek: session.date,
                startTime: session.startTime,
                endTime: session.endTime,
                lectureOrTutorial: session.type,
                timeTableId: session.timeTableId!
            }));

            // Extract group number from group string (e.g., "CS-G1" -> 1)
            const groupNumber = parseInt(selectedGroup.split('-G')[1]);

            await api.saveSessions(groupNumber, sessionsToSave);

            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
            console.error('Error saving sessions:', error);
        }
    };

    return (
        <div className="timetable-container">
            <div className="header-container">
                <h2 className="header-title">Group Timetable</h2>
                <button
                    onClick={handleSaveSessions}
                    className={`save-button ${saveStatus !== 'idle' ? 'save-button-' + saveStatus : ''}`}
                    disabled={saveStatus === 'saving'}
                >
                    <Save size={16} className="save-button-icon" />
                    {saveStatus === 'idle' && 'Save Sessions'}
                    {saveStatus === 'saving' && 'Saving...'}
                    {saveStatus === 'saved' && 'Saved!'}
                    {saveStatus === 'error' && 'Error Saving'}
                </button>
            </div>

            {/* Group Selector */}
            <div className="group-selector">
                <label htmlFor="group-select" className="group-label">
                    Select Group
                </label>
                <select
                    id="group-select"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="group-select"
                >
                    {[
                        ...Array.from({ length: 40 }, (_, i) => `CS-G${i + 1}`),
                        ...Array.from({ length: 20 }, (_, i) => `SE-G${i + 1}`)
                    ].map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>
            </div>

            {/* CSV Upload Section */}
            <div className="csv-upload-section">
                <h3 className="section-title">Import Timetable for {selectedGroup}</h3>
                <div className="csv-upload-container">
                    <label htmlFor="csv-upload" className="csv-upload-label">
                        <Upload size={20} />
                        <span>Choose CSV file or drag & drop to add sessions for {selectedGroup}</span>
                        <small>CSV Format: Lecturer,Module,Day,StartTime,EndTime,Type,Building,Classroom</small>
                        <small>Note: This will add new sessions while preserving existing ones</small>
                    </label>
                    <input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        className="csv-upload-input"
                    />
                </div>
            </div>

            {/* Timetable */}
            <div className="timetable">
                <div className="timetable-inner">
                    <div className="timetable-grid">
                        <div className="grid-header">Time</div>
                        {days.map(day => (
                            <div key={day} className="grid-header-center">{day}</div>
                        ))}
                        {times.map(time => (
                            <React.Fragment key={time}>
                                <div className="time-slot">{time}</div>
                                {days.map(day => {
                                    const session = filteredSessions.find(s =>
                                        s.date === day &&
                                        s.startTime <= time &&
                                        time < s.endTime
                                    );
                                    return (
                                        <div
                                            key={`${time}-${day}`}
                                            className={`session-cell ${session ? 'has-session' : ''}`}
                                        >
                                            {session && time === session.startTime && (
                                                <div className="session-content">
                                                    <div className="session-header">
                                                        <span className="session-group">{session.group}</span>
                                                        <button
                                                            onClick={() => removeSession(session.id)}
                                                            className="delete-button"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="session-info">
                                                        <Users size={14} />
                                                        <span className="session-info-text">{session.lecturer}</span>
                                                    </div>
                                                    <div className="session-info">
                                                        <MessageSquare size={14} />
                                                        <span className="session-info-text">{session.type}</span>
                                                    </div>
                                                    <div className="session-info">
                                                        <MapPin size={14} />
                                                        <span className="session-info-text">{session.building}, {session.classroom}</span>
                                                    </div>
                                                    <div className="session-time">
                                                        {session.startTime} - {session.endTime}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}