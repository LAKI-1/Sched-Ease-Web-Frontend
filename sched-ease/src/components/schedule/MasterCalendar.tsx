import React, { useState } from 'react';
import { Users, MapPin } from 'lucide-react';

interface GroupSession {
    id: string;
    group: string;
    lecturer: string;
    module: string;
    date: string;
    time: string;
    building: string;
    classroom: string;
}

const initialSessions: GroupSession[] = [
    {
        id: '1',
        group: 'CS-23',
        lecturer: 'Ms. Sarah Wilson',
        module: '5COS01',
        date: 'Monday',
        time: '09:00',
        building: 'SP',
        classroom: '7LA'
    },
    {
        id: '2',
        group: 'CS-66',
        lecturer: 'Mr. James Chen',
        module: '5COS10',
        date: 'Tuesday',
        time: '11:00',
        building: 'SP',
        classroom: '2LA'
    },
    {
        id: '3',
        group: 'SE-13',
        lecturer: 'Ms. Sarah Wilson',
        module: '5COS01',
        date: 'Monday',
        time: '09:00',
        building: 'SP',
        classroom: '5LA'
    }
];

export function MasterCalendar() {
    const [sessions] = useState<GroupSession[]>(initialSessions);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = Array.from({ length: 9 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00`);

    const getSessionsForTimeAndDay = (time: string, day: string) => {
        return sessions.filter(s => s.time === time && s.date === day);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Master Calendar</h2>
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
                                    const sessionsAtTimeAndDay = getSessionsForTimeAndDay(time, day);

                                    return (
                                        <div
                                            key={`${time}-${day}`}
                                            className="flex flex-col gap-2 p-2 border rounded-lg border-gray-200"
                                        >
                                            {sessionsAtTimeAndDay.length > 0 ? (
                                                sessionsAtTimeAndDay.map((session) => (
                                                    <div
                                                        key={session.id}
                                                        className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg"
                                                    >
                                                        <div className="text-sm">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="font-medium text-indigo-600">{session.group}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-gray-600">
                                                                <Users size={14} />
                                                                <span className="truncate">{session.lecturer}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-gray-600">
                                                                <MapPin size={14} />
                                                                <span className="truncate">{session.building}, {session.classroom}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-gray-500 text-sm">No session</div>
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
