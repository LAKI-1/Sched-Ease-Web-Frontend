import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, MessageSquare, MapPin, PlusCircle, Trash2 } from 'lucide-react';

interface GroupSession {
    id: string;
    group: string;
    lecturer: string;
    module: string;
    date: string;
    time: string;
    type: 'Lecture' | 'Tutorial';
    building: string;
    classroom: string;
}

const initialSessions: GroupSession[] = [
    {
        id: '1',
        group: 'CS-G1',
        lecturer: 'Ms. Sarah Wilson',
        module: '5COS01',
        date: 'Monday',
        time: '09:00',
        type: 'Lecture',
        building: 'Engineering Block A',
        classroom: 'Room 101'
    },
    {
        id: '2',
        group: 'CS-G2',
        lecturer: 'Mr. James Chen',
        module: '5COS10',
        date: 'Tuesday',
        time: '11:00',
        type: 'Tutorial',
        building: 'Computer Science Block',
        classroom: 'Room 202'
    }
];

export function Timetable() {
    const [selectedGroup, setSelectedGroup] = useState<string>('CS-G1');
    const [sessions, setSessions] = useState<GroupSession[]>(initialSessions);
    const [newSession, setNewSession] = useState<GroupSession>({
        id: '',
        group: selectedGroup,
        lecturer: '',
        module: '',
        date: 'Monday',
        time: '09:00',
        type: 'Lecture',
        building: '',
        classroom: ''
    });

    // Data for selection options
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const lecturers = ['SAM', 'TOM', 'SUV', 'ABHI', 'JAN'];
    const buildings = ['SP Building', 'GP Building', 'JB Building', 'DB Building'];
    const classRooms = ['1LA', '2LA', '1LB', '2LB', '2LC'];
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
                time: '09:00',
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
                <CalendarIcon size={32} className="text-[#3E8498]" />
                <h2 className="text-2xl font-semibold text-gray-900">Group Timetable</h2>
            </div>
            {/* Group Selector */}
            <div className="mb-6" style={{ marginLeft: '15px' }}>
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
                        <select
                            value={newSession.lecturer}
                            onChange={(e) => setNewSession({ ...newSession, lecturer: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {lecturers.map(lecturer => (
                                <option key={lecturer} value={lecturer}>{lecturer}</option>
                            ))}
                        </select>
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
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <select
                            value={newSession.time}
                            onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
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
                        <select
                            value={newSession.building}
                            onChange={(e) => setNewSession({ ...newSession, building: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {buildings.map(building => (
                                <option key={building} value={building}>{building}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Classroom</label>
                        <select
                            value={newSession.classroom}
                            onChange={(e) => setNewSession({ ...newSession, classroom: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {classRooms.map(room => (
                                <option key={room} value={room}>{room}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleAddSession}
                    className="mt-4 bg-[#3E8498] text-white px-4 py-2 rounded-lg shadow hover:bg-[#2C6F7A] flex items-center justify-center gap-2"
                >
                    <PlusCircle size={16} /> <span>Add Session</span>
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
                                    const session = filteredSessions.find(s => s.time === time && s.date === day);
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
                                                        <span className="font-medium text-[#3E8498]">{session.group}</span>
                                                        <button
                                                            onClick={() => removeSession(session.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Users size={14} className="text-[#3E8498]" />
                                                        <span className="truncate">{session.lecturer}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <MessageSquare size={14} className="text-[#3E8498]" />
                                                        <span className="truncate">{session.type}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <MapPin size={14} className="text-[#3E8498]" />
                                                        <span className="truncate">{session.building}, {session.classroom}</span>
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
