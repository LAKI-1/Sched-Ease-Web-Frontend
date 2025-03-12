import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, MessageSquare, MapPin, PlusCircle, Trash2 } from 'lucide-react';

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
}

export function Timetable() {
    const [selectedGroup, setSelectedGroup] = useState<string>('CS-G1');
    const [sessions, setSessions] = useState<GroupSession[]>([]);
    const [newSession, setNewSession] = useState<GroupSession>({
        id: '',
        group: selectedGroup,
        lecturer: '',
        module: '',
        date: 'Monday',
        startTime: '',
        endTime: '',
        type: 'Lecture',
        building: '',
        classroom: ''
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = Array.from({ length: 9 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00`);

    const filteredSessions = sessions.filter(session => session.group === selectedGroup);

    const handleAddSession = () => {
        if (newSession.lecturer && newSession.building && newSession.classroom) {
            setSessions([...sessions, { ...newSession, id: (sessions.length + 1).toString(), group: selectedGroup }]);
            setNewSession({
                id: '',
                group: selectedGroup,
                lecturer: '',
                module: '',
                date: 'Monday',
                startTime: '',
                endTime: '',
                type: 'Lecture',
                building: '',
                classroom: ''
            });
        } else {
            alert('Please fill out all fields to add a session.');
        }
    };

    const removeSession = (id: string) => {
        setSessions(sessions.filter(session => session.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <CalendarIcon size={32} className="text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Group Timetable</h2>
            </div>

            {/* Group Selector */}
            <div className="mb-6">
                <label htmlFor="group-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Group
                </label>
                <select
                    id="group-select"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            <div className="mb-6 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Add New Session</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lecturer</label>
                        <input
                            type="text"
                            value={newSession.lecturer}
                            onChange={(e) => setNewSession({ ...newSession, lecturer: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <select
                            value={newSession.date}
                            onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <select
                            value={newSession.startTime}
                            onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {times.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <select
                            value={newSession.endTime}
                            onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {times.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            value={newSession.type}
                            onChange={(e) => setNewSession({ ...newSession, type: e.target.value as 'Lecture' | 'Tutorial' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="Lecture">Lecture</option>
                            <option value="Tutorial">Tutorial</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Building</label>
                        <input
                            type="text"
                            value={newSession.building}
                            onChange={(e) => setNewSession({ ...newSession, building: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Classroom</label>
                        <input
                            type="text"
                            value={newSession.classroom}
                            onChange={(e) => setNewSession({ ...newSession, classroom: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <button
                    onClick={handleAddSession}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
                >
                    <PlusCircle size={16} className="inline-block mr-2" /> Add Session
                </button>
            </div>

            {/* Timetable */}
            <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
                <div className="min-w-[1000px]">
                    <div className="grid grid-cols-[120px_repeat(5,1fr)] gap-2">
                        <div className="font-semibold text-gray-500">Time</div>
                        {days.map(day => (
                            <div key={day} className="font-semibold text-center text-gray-500">{day}</div>
                        ))}
                        {times.map(time => (
                            <React.Fragment key={time}>
                                <div className="py-3 font-medium text-gray-600">{time}</div>
                                {days.map(day => {
                                    const session = filteredSessions.find(s => s.startTime === time && s.date === day);
                                    return (
                                        <div
                                            key={`${time}-${day}`}
                                            className={`p-2 border rounded-lg ${
                                                session ? 'bg-indigo-50 border-indigo-200' : 'border-gray-200'
                                            }`}
                                        >
                                            {session && (
                                                <div className="text-sm">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-medium text-indigo-600">{session.group}</span>
                                                        <button
                                                            onClick={() => removeSession(session.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Users size={14} />
                                                        <span className="truncate">{session.lecturer}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <MessageSquare size={14} />
                                                        <span className="truncate">{session.type}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <MapPin size={14} />
                                                        <span className="truncate">{session.building}, {session.classroom}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
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