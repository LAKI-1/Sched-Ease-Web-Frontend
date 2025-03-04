import { useState } from 'react';
import { Calendar, Plus, Trash } from 'lucide-react';

interface TimeSlot {
    day: string;
    slots: string[];
}

interface EditingState {
    dayIndex: number;
    slotIndex: number;
}

export default function Availability() {
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
        { day: 'Monday', slots: ['09:00-11:00', '14:00-16:00'] },
        { day: 'Tuesday', slots: ['10:00-12:00', '15:00-17:00'] },
        { day: 'Wednesday', slots: ['09:00-11:00', '13:00-15:00'] },
        { day: 'Thursday', slots: ['11:00-13:00', '16:00-18:00'] },
        { day: 'Friday', slots: ['10:00-12:00', '14:00-16:00'] }
    ]);

    const [editing, setEditing] = useState<EditingState | null>(null);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');

    const handleEdit = (dayIndex: number, slotIndex: number) => {
        setEditing({ dayIndex, slotIndex });
        const [start, end] = timeSlots[dayIndex].slots[slotIndex].split('-');
        setStartTime(start);
        setEndTime(end);
    };

    const handleSave = () => {
        if (editing !== null) {
            const updatedSlot = `${startTime}-${endTime}`;
            const updatedSlots = timeSlots.map((day, dayIndex) => {
                if (dayIndex === editing.dayIndex) {
                    return {
                        ...day,
                        slots: day.slots.map((slot, slotIndex) =>
                            slotIndex === editing.slotIndex ? updatedSlot : slot
                        )
                    };
                }
                return day;
            });
            setTimeSlots(updatedSlots);
            setEditing(null);
            setStartTime('');
            setEndTime('');
        }
    };

    const handleAddSlot = (dayIndex: number) => {
        const updatedSlots = timeSlots.map((day, index) => {
            if (index === dayIndex) {
                return { ...day, slots: [...day.slots, '00:00-00:00'] };
            }
            return day;
        });
        setTimeSlots(updatedSlots);
    };

    const handleRemoveSlot = (dayIndex: number, slotIndex: number) => {
        const updatedSlots = timeSlots.map((day, index) => {
            if (index === dayIndex) {
                return { ...day, slots: day.slots.filter((_, idx) => idx !== slotIndex) };
            }
            return day;
        });
        setTimeSlots(updatedSlots);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Availability Schedule</h2>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid gap-6">
                    {timeSlots.map((day, dayIndex) => (
                        <div key={dayIndex} className="border-b last:border-b-0 pb-4">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                <Calendar size={20} className="text-indigo-600" />
                                {day.day}
                                <button onClick={() => handleAddSlot(dayIndex)} className="ml-auto text-blue-600 hover:text-blue-800">
                                    <Plus size={16} />
                                </button>
                            </h3>
                            <div className="grid gap-2">
                                {day.slots.map((slot, slotIndex) => (
                                    <div key={slotIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                        {editing?.dayIndex === dayIndex && editing?.slotIndex === slotIndex ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="time"
                                                    value={startTime}
                                                    onChange={(e) => setStartTime(e.target.value)}
                                                    className="border rounded p-1 text-gray-900"
                                                />
                                                <span>-</span>
                                                <input
                                                    type="time"
                                                    value={endTime}
                                                    onChange={(e) => setEndTime(e.target.value)}
                                                    className="border rounded p-1 text-gray-900"
                                                />
                                            </div>
                                        ) : (
                                            <span>{slot.replace('-', ' - ')}</span>
                                        )}
                                        <div className="flex gap-2">
                                            {editing?.dayIndex === dayIndex && editing?.slotIndex === slotIndex ? (
                                                <button onClick={handleSave} className="text-green-600 hover:text-green-800">Save</button>
                                            ) : (
                                                <button onClick={() => handleEdit(dayIndex, slotIndex)} className="text-indigo-600 hover:text-indigo-800">Edit</button>
                                            )}
                                            <button onClick={() => handleRemoveSlot(dayIndex, slotIndex)} className="text-red-600 hover:text-red-800">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}