import React from 'react';
import { Calendar as CalendarIcon, Plus, Loader } from 'lucide-react';
import type { Role } from '../../types';

interface VivaSchedule {
    id: string;
    teamId: string;
    lecturer: string;
    date: string;
    time: string;
    classroom: string;
    status: 'scheduled' | 'completed' | 'cancelled';
}

interface LecturerAvailability {
    lecturerId: string;
    name: string;
    availableDates: {
        date: string;
        times: string[];
        classroom: string;
    }[];
    assignedGroups?: string[];
}

interface Props {
    role: Role;
}

export function MasterCalendar({ role }: Props) {
    const [isSchedulingVivas, setIsSchedulingVivas] = React.useState(false);
    const [schedulingStep, setSchedulingStep] = React.useState<'admin' | 'lecturers' | 'processing' | 'complete'>('admin');
    const [adminAvailability, setAdminAvailability] = React.useState<LecturerAvailability>({
        lecturerId: 'admin1',
        name: 'Dr. Administrator',
        availableDates: [],
        assignedGroups: []
    });
    const [lecturerAvailabilities, setLecturerAvailabilities] = React.useState<LecturerAvailability[]>([]);
    const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);
    const [setProcessing] = React.useState(false);

    // Mock data for available classrooms, times, and groups
    const availableClassrooms = ['1LA', '2LB', '3LC', '4LD'];
    const availableTimes = [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
    ];
    const allGroups = ['CS-20', 'CS-21', 'CS-22', 'SE-10', 'SE-11'];
    const lecturers = [
        { id: 'lec1', name: 'Dr. Sarah Wilson' },
        { id: 'lec2', name: 'Prof. James Chen' },
        { id: 'lec3', name: 'Dr. Michael Brown' }
    ];

    // Mock data for existing viva schedule
    const [] = React.useState<VivaSchedule[]>([
        {
            id: '1',
            teamId: 'CS-20',
            lecturer: 'Dr. Sarah Wilson',
            date: 'Monday',
            time: '09:00',
            classroom: '1LA',
            status: 'scheduled'
        }
    ]);

    const handleAdminAvailabilitySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSchedulingStep('lecturers');
    };

    const handleLecturerAvailabilitySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSchedulingStep('processing');
        // @ts-ignore
        setProcessing(true);
        // Simulate processing time
        setTimeout(() => {
            // Here you would implement the actual scheduling algorithm
            // @ts-ignore
            setProcessing(false);
            setSchedulingStep('complete');
        }, 2000);
    };

    const resetScheduling = () => {
        setIsSchedulingVivas(false);
        setSchedulingStep('admin');
        setAdminAvailability({
            lecturerId: 'admin1',
            name: 'Dr. Administrator',
            availableDates: [],
            assignedGroups: []
        });
        setLecturerAvailabilities([]);
        setSelectedGroups([]);
    };

    const renderSchedulingForm = () => {
        switch (schedulingStep) {
            case 'admin':
                return (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Step 1: Your Availability</h3>
                        <form onSubmit={handleAdminAvailabilitySubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Groups to Supervise
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {allGroups.map(group => (
                                        <label key={group} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedGroups.includes(group)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedGroups([...selectedGroups, group]);
                                                    } else {
                                                        setSelectedGroups(selectedGroups.filter(g => g !== group));
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span>{group}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Add Available Slots
                                </label>
                                <div className="space-y-4">
                                    {adminAvailability.availableDates.map((date, dateIndex) => (
                                        <div key={dateIndex} className="flex items-start space-x-4">
                                            <div className="flex-1">
                                                <input
                                                    type="date"
                                                    value={date.date}
                                                    onChange={(e) => {
                                                        const newDates = [...adminAvailability.availableDates];
                                                        newDates[dateIndex].date = e.target.value;
                                                        setAdminAvailability({
                                                            ...adminAvailability,
                                                            availableDates: newDates
                                                        });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <select
                                                    value={date.classroom}
                                                    onChange={(e) => {
                                                        const newDates = [...adminAvailability.availableDates];
                                                        newDates[dateIndex].classroom = e.target.value;
                                                        setAdminAvailability({
                                                            ...adminAvailability,
                                                            availableDates: newDates
                                                        });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">Select Classroom</option>
                                                    {availableClassrooms.map(room => (
                                                        <option key={room} value={room}>{room}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex-1">
                                                <select
                                                    multiple
                                                    value={date.times}
                                                    onChange={(e) => {
                                                        const newDates = [...adminAvailability.availableDates];
                                                        newDates[dateIndex].times = Array.from(e.target.selectedOptions, option => option.value);
                                                        setAdminAvailability({
                                                            ...adminAvailability,
                                                            availableDates: newDates
                                                        });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    {availableTimes.map(time => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newDates = adminAvailability.availableDates.filter((_, i) => i !== dateIndex);
                                                    setAdminAvailability({
                                                        ...adminAvailability,
                                                        availableDates: newDates
                                                    });
                                                }}
                                                className="mt-1 text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAdminAvailability({
                                                ...adminAvailability,
                                                availableDates: [
                                                    ...adminAvailability.availableDates,
                                                    { date: '', times: [], classroom: '' }
                                                ]
                                            });
                                        }}
                                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                                    >
                                        <Plus size={16} />
                                        Add Time Slot
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={resetScheduling}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    disabled={selectedGroups.length === 0 || adminAvailability.availableDates.length === 0}
                                >
                                    Next: Collect Lecturer Availability
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 'lecturers':
                return (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Step 2: Lecturer Availability</h3>
                        <form onSubmit={handleLecturerAvailabilitySubmit} className="space-y-6">
                            {lecturers.map((lecturer, index) => (
                                <div key={lecturer.id} className="border-b pb-6 last:border-b-0">
                                    <h4 className="font-medium mb-4">{lecturer.name}</h4>
                                    <div className="space-y-4">
                                        {lecturerAvailabilities[index]?.availableDates.map((date, dateIndex) => (
                                            <div key={dateIndex} className="flex items-start space-x-4">
                                                <div className="flex-1">
                                                    <input
                                                        type="date"
                                                        value={date.date}
                                                        onChange={(e) => {
                                                            const newAvailabilities = [...lecturerAvailabilities];
                                                            if (!newAvailabilities[index]) {
                                                                newAvailabilities[index] = {
                                                                    lecturerId: lecturer.id,
                                                                    name: lecturer.name,
                                                                    availableDates: []
                                                                };
                                                            }
                                                            newAvailabilities[index].availableDates[dateIndex] = {
                                                                ...date,
                                                                date: e.target.value
                                                            };
                                                            setLecturerAvailabilities(newAvailabilities);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <select
                                                        value={date.classroom}
                                                        onChange={(e) => {
                                                            const newAvailabilities = [...lecturerAvailabilities];
                                                            newAvailabilities[index].availableDates[dateIndex].classroom = e.target.value;
                                                            setLecturerAvailabilities(newAvailabilities);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    >
                                                        <option value="">Select Classroom</option>
                                                        {availableClassrooms.map(room => (
                                                            <option key={room} value={room}>{room}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex-1">
                                                    <select
                                                        multiple
                                                        value={date.times}
                                                        onChange={(e) => {
                                                            const newAvailabilities = [...lecturerAvailabilities];
                                                            newAvailabilities[index].availableDates[dateIndex].times =
                                                                Array.from(e.target.selectedOptions, option => option.value);
                                                            setLecturerAvailabilities(newAvailabilities);
                                                        }}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    >
                                                        {availableTimes.map(time => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newAvailabilities = [...lecturerAvailabilities];
                                                        newAvailabilities[index].availableDates =
                                                            newAvailabilities[index].availableDates.filter((_, i) => i !== dateIndex);
                                                        setLecturerAvailabilities(newAvailabilities);
                                                    }}
                                                    className="mt-1 text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newAvailabilities = [...lecturerAvailabilities];
                                                if (!newAvailabilities[index]) {
                                                    newAvailabilities[index] = {
                                                        lecturerId: lecturer.id,
                                                        name: lecturer.name,
                                                        availableDates: []
                                                    };
                                                }
                                                newAvailabilities[index].availableDates.push({
                                                    date: '',
                                                    times: [],
                                                    classroom: ''
                                                });
                                                setLecturerAvailabilities(newAvailabilities);
                                            }}
                                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <Plus size={16} />
                                            Add Time Slot
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSchedulingStep('admin')}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    disabled={lecturerAvailabilities.length === 0}
                                >
                                    Generate Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 'processing':
                return (
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader className="w-12 h-12 text-indigo-600 animate-spin" />
                            <h3 className="mt-4 text-lg font-semibold">Generating Viva Schedule</h3>
                            <p className="mt-2 text-gray-600">Please wait while we process the availabilities...</p>
                        </div>
                    </div>
                );

            case 'complete':
                return (
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="text-center py-6">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold">Schedule Generated Successfully</h3>
                            <p className="mt-2 text-gray-600">The viva schedule has been created and notifications have been sent.</p>
                            <button
                                onClick={resetScheduling}
                                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                View Schedule
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <CalendarIcon size={32} className="text-indigo-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">Master Calendar</h2>
                </div>
                {role === 'sdgp_administrator' && !isSchedulingVivas && (
                    <button
                        onClick={() => setIsSchedulingVivas(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        <Plus size={20} />
                        Schedule Vivas
                    </button>
                )}
            </div>

            {isSchedulingVivas ? (
                renderSchedulingForm()
            ) : (
                <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-[120px_repeat(5,1fr)] gap-2">
                            {/* Existing calendar view code */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}