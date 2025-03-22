import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, MapPin, PlusCircle, Trash2, Save, Loader } from 'lucide-react';
import axios from 'axios';
import '../../css/Timetable.css';

const API_BASE_URL = 'http://localhost:8080/api';

interface SessionRequestDTO {
    lecturerIds: number[]; // Changed from Set to array
    hallId: number;
    level: string;
    course: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    lectureOrTutorial: 'Lecture' | 'Tutorial';
    timeTableId: number;
}

interface SessionResponseDTO {
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
    lecturerId: number;
    hallId: number;
    timeTableId: number;
}

interface Hall {
    id: number;
    name: string;
    building: string;
    capacity: number;
}

interface Lecturer {
    id: number;
    name: string;
    email: string;
    nameShort: string;
}

interface TutorialGroup {
    id: number;
    groupNo: string;
    course: string;
    semester: string;
}

export function Timetable() {
    // API functions
    const api = {
        async saveSessions(groupId: number, sessions: SessionRequestDTO[]): Promise<string> {
            try {
                console.log('Saving sessions:', sessions);
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

        async getSessionsByGroup(groupId: number): Promise<SessionResponseDTO[]> {
            try {
                const response = await axios.get(`${API_BASE_URL}/sessions/group/${groupId}`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch sessions');
            }
        },

        async getHalls(): Promise<Hall[]> {
            try {
                const response = await axios.get(`${API_BASE_URL}/halls`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch halls');
            }
        },

        async getLecturers(): Promise<Lecturer[]> {
            try {
                const response = await axios.get(`${API_BASE_URL}/lecturers`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch lecturers');
            }
        },

        async getTutorialGroups(): Promise<TutorialGroup[]> {
            try {
                const response = await axios.get(`${API_BASE_URL}/tutorial-groups`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch tutorial groups');
            }
        }
    };

    const [selectedGroup, setSelectedGroup] = useState<string>('CS-G1');
    const [sessions, setSessions] = useState<SessionResponseDTO[]>([]);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [halls, setHalls] = useState<Hall[]>([]);
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [isLoading, setIsLoading] = useState({
        halls: true,
        lecturers: true
    });
    const [loadError, setLoadError] = useState({
        halls: '',
        lecturers: ''
    });

    const [tutorialGroups, setTutorialGroups] = useState<TutorialGroup[]>([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [loadErrorGroups, setLoadErrorGroups] = useState('');

    const defaultSession: SessionResponseDTO = {
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
        lecturerId: 0,
        hallId: 0,
        timeTableId: 1
    };

    const [newSession, setNewSession] = useState<SessionResponseDTO>(defaultSession);

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
        const fetchSessions = async () => {
            try {
                // Extract group number from group string (e.g., "CS-G1" -> 1)
                const groupNumber = parseInt(selectedGroup.split('-G')[1]);
                const fetchedSessions = await api.getSessionsByGroup(groupNumber);
                setSessions(fetchedSessions);
            } catch (error) {
                console.error('Error fetching sessions:', error);
                setSessions([]); // Start with empty array if error
            }
        };

        fetchSessions();
    }, [selectedGroup]);

    // Add this useEffect for fetching tutorial groups
    useEffect(() => {
        const fetchTutorialGroups = async () => {
            try {
                const groups = await api.getTutorialGroups();
                setTutorialGroups(groups);
                setIsLoadingGroups(false);
            } catch (error) {
                setLoadErrorGroups('Failed to load tutorial groups. Please try again.');
                setIsLoadingGroups(false);
            }
        };

        fetchTutorialGroups();
    }, []);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Define specific start and end times
    const startTimes = ['08:30', '10:30', '13:30', '15:30'];
    const endTimes = ['10:30', '12:30', '15:30', '17:30'];

    // For the timetable grid display
    const times = ['08:30', '10:30', '12:30', '13:30', '15:30'];

    const handleAddSession = () => {
        if (newSession.lecturer && newSession.building && newSession.classroom) {
            if (newSession.endTime <= newSession.startTime) {
                alert('End time must be after start time');
                return;
            }

            const foundHall: Hall | undefined = halls.find(h => h.name === newSession.classroom);
            const foundLecturer: Lecturer | undefined = lecturers.find(l => l.nameShort === newSession.lecturer);

            if (!foundHall || !foundLecturer) {
                alert('Invalid hall or lecturer selected');
                return;
            }

            // Now TypeScript knows these are definitely Hall and Lecturer objects
            const hall: Hall = foundHall;
            const lecturer: Lecturer = foundLecturer;

            const sessionToAdd: SessionResponseDTO = {
                ...newSession,
                id: (sessions.length + 1).toString(),
                group: selectedGroup,
                lecturer: lecturer.nameShort,
                hallId: hall.id,
                lecturerId: lecturer.id,
                type: newSession.type
            };

            setSessions([...sessions, sessionToAdd]);
            setNewSession(defaultSession);
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
            const groupNumber = parseInt(selectedGroup.split('-G')[1]);

            // Less strict validation
            const validSessions = sessions.filter(session => {
                return session.lecturerId !== 0 && session.hallId !== 0;
            });

            if (validSessions.length === 0) {
                alert('No valid sessions to save');
                setSaveStatus('error');
                setTimeout(() => setSaveStatus('idle'), 3000);
                return;
            }

            // Extract course from the group name
            const course = selectedGroup.split('-G')[0];

            const sessionsToSave: SessionRequestDTO[] = validSessions.map(session => ({
                // Convert Set to array
                lecturerIds: [session.lecturerId],
                hallId: session.hallId,
                level: '1',
                course: course,
                dayOfWeek: session.date,
                startTime: session.startTime,
                endTime: session.endTime,
                lectureOrTutorial: session.type,
                timeTableId: session.timeTableId
            }));

            console.log('Saving sessions to group:', groupNumber);
            console.log('Sessions data:', sessionsToSave);

            await api.saveSessions(groupNumber, sessionsToSave);
            setSaveStatus('saved');

            // Refresh the sessions list after saving
            const fetchedSessions = await api.getSessionsByGroup(groupNumber);
            setSessions(fetchedSessions);

            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            console.error('Error saving sessions:', error);
            alert(`Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
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
                    Tutorial Group
                </label>
                <div className="select-wrapper">
                    <select
                        id="group-select"
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className="group-select"
                        disabled={isLoadingGroups}
                    >
                        <option value="">Select Tutorial Group</option>
                        {tutorialGroups.map(group => (
                            <option key={group.id} value={`${group.course}-G${group.groupNo}`}>
                                {group.course}-G{group.groupNo} ({group.semester})
                            </option>
                        ))}
                    </select>
                    {isLoadingGroups && (
                        <div className="select-loading">
                            <Loader size={16} className="loading-spinner" />
                        </div>
                    )}
                </div>
                {loadErrorGroups && (
                    <div className="error-message">{loadErrorGroups}</div>
                )}
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
                                    const lecturer = lecturers.find(l => l.nameShort === e.target.value);
                                    setNewSession({
                                        ...newSession,
                                        lecturer: e.target.value,
                                        lecturerId: lecturer ? lecturer.id : 0
                                    });
                                }}
                                className="form-select"
                                disabled={isLoading.lecturers}
                            >
                                <option value="">Select Lecturer</option>
                                {lecturers.map(lecturer => (
                                    <option key={lecturer.id} value={lecturer.nameShort}>
                                        {lecturer.nameShort}
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
                            onChange={(e) => {
                                const selectedStartTime = e.target.value;
                                // Find the next valid end time based on the selected start time
                                const validEndTime = endTimes.find(time => time > selectedStartTime) || endTimes[0];
                                setNewSession({
                                    ...newSession,
                                    startTime: selectedStartTime,
                                    endTime: validEndTime
                                });
                            }}
                            className="form-select"
                        >
                            <option value="">Select Start Time</option>
                            {startTimes.map(time => (
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
                            disabled={!newSession.startTime}
                        >
                            <option value="">Select End Time</option>
                            {endTimes
                                .filter(time => time > newSession.startTime)
                                .map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))
                            }
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
                                    const hall = halls.find(h => h.building === e.target.value);
                                    setNewSession({
                                        ...newSession,
                                        building: e.target.value,
                                        classroom: hall?.name || '',
                                        hallId: hall ? hall.id : 0
                                    });
                                }}
                                className="form-select"
                                disabled={isLoading.halls}
                            >
                                <option value="">Select Building</option>
                                {[...new Set(halls.map(hall => hall.building))].map(building => (
                                    <option key={building} value={building}>
                                        {building}
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
                        <select
                            value={newSession.classroom}
                            onChange={(e) => {
                                const hall = halls.find(h => h.name === e.target.value);
                                setNewSession({
                                    ...newSession,
                                    classroom: e.target.value,
                                    hallId: hall ? hall.id : 0
                                });
                            }}
                            className="form-select"
                            disabled={!newSession.building}
                        >
                            <option value="">Select Classroom</option>
                            {halls
                                .filter(hall => hall.building === newSession.building)
                                .map(hall => (
                                    <option key={hall.id} value={hall.name}>
                                        {hall.name}
                                    </option>
                                ))
                            }
                        </select>
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
                                    const session = sessions.find(s =>
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