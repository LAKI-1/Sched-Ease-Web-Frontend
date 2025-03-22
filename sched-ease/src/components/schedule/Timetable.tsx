import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, MapPin, PlusCircle, Trash2, Save, Loader } from 'lucide-react';
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

    const handleAddSession = () => {
        if (newSession.lecturer && newSession.building && newSession.classroom) {
            // Validate that end time is after start time
            if (newSession.endTime <= newSession.startTime) {
                alert('End time must be after start time');
                return;
            }

            // Find the corresponding hall and lecturer IDs
            const hall = halls.find(h => h.name === newSession.building);
            const lecturer = lecturers.find(l => l.name === newSession.lecturer);

            if (!hall || !lecturer) {
                alert('Invalid hall or lecturer selected');
                return;
            }

            setSessions([...sessions, {
                ...newSession,
                id: (sessions.length + 1).toString(),
                group: selectedGroup,
                hallId: hall.id,
                lecturerId: lecturer.id
            }]);

            setNewSession({
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
                timeTableId: 1
            });
        } else {
            alert('Please fill out all fields to add a session.');
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

            {/* Add Session Form */}
            <div className="add-session-form">
                <h3 className="form-title">Add New Session</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Lecturer</label>
                        <div className="select-wrapper">
                            <select
                                value={newSession.lecturer}
                                onChange={(e) => {
                                    const lecturer = lecturers.find(l => l.name === e.target.value);
                                    setNewSession({
                                        ...newSession,
                                        lecturer: e.target.value,
                                        lecturerId: lecturer?.id
                                    });
                                }}
                                className="form-select"
                                disabled={isLoading.lecturers}
                            >
                                <option value="">Select Lecturer</option>
                                {lecturers.map(lecturer => (
                                    <option key={lecturer.id} value={lecturer.name}>
                                        {lecturer.name}
                                    </option>
                                ))}
                            </select>
                            {isLoading.lecturers && (
                                <div className="select-loading">
                                    <Loader size={16} className="loading-spinner" />
                                </div>
                            )}
                        </div>
                        {loadError.lecturers && (
                            <div className="error-message">{loadError.lecturers}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Module</label>
                        <input
                            type="text"
                            value={newSession.module}
                            onChange={(e) => setNewSession({ ...newSession, module: e.target.value })}
                            className="form-input"
                            placeholder="e.g., CS101"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <select
                            value={newSession.date}
                            onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                            className="form-select"
                        >
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Start Time</label>
                        <select
                            value={newSession.startTime}
                            onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                            className="form-select"
                        >
                            {endTimes.slice(0, -1).map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">End Time</label>
                        <select
                            value={newSession.endTime}
                            onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                            className="form-select"
                        >
                            {endTimes.slice(1).map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Type</label>
                        <select
                            value={newSession.type}
                            onChange={(e) => setNewSession({ ...newSession, type: e.target.value as 'Lecture' | 'Tutorial' })}
                            className="form-select"
                        >
                            <option value="Lecture">Lecture</option>
                            <option value="Tutorial">Tutorial</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Building</label>
                        <div className="select-wrapper">
                            <select
                                value={newSession.building}
                                onChange={(e) => {
                                    const hall = halls.find(h => h.name === e.target.value);
                                    setNewSession({
                                        ...newSession,
                                        building: hall?.building || '',
                                        classroom: hall?.name || '',
                                        hallId: hall?.id
                                    });
                                }}
                                className="form-select"
                                disabled={isLoading.halls}
                            >
                                <option value="">Select Building</option>
                                {halls.map(hall => (
                                    <option key={hall.id} value={hall.name}>
                                        {hall.building} - {hall.name}
                                    </option>
                                ))}
                            </select>
                            {isLoading.halls && (
                                <div className="select-loading">
                                    <Loader size={16} className="loading-spinner" />
                                </div>
                            )}
                        </div>
                        {loadError.halls && (
                            <div className="error-message">{loadError.halls}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Classroom</label>
                        <input
                            type="text"
                            value={newSession.classroom}
                            className="form-input"
                            disabled
                            placeholder="Automatically set from building selection"
                        />
                    </div>
                </div>
                <button
                    onClick={handleAddSession}
                    className="add-button"
                    disabled={isLoading.halls || isLoading.lecturers}
                >
                    <PlusCircle size={16} className="add-button-icon" /> Add Session
                </button>
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