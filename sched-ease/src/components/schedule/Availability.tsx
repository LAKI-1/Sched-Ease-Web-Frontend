import { Calendar } from 'lucide-react';

export default function Availability() {
    const timeSlots = [
        { day: 'Monday', slots: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM'] },
        { day: 'Tuesday', slots: ['10:00 AM - 12:00 PM', '3:00 PM - 5:00 PM'] },
        { day: 'Wednesday', slots: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM'] },
        { day: 'Thursday', slots: ['11:00 AM - 1:00 PM', '4:00 PM - 6:00 PM'] },
        { day: 'Friday', slots: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'] }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Availability Schedule</h2>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid gap-6">
                    {timeSlots.map((day, index) => (
                        <div key={index} className="border-b last:border-b-0 pb-4">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                <Calendar size={20} className="text-indigo-600" />
                                {day.day}
                            </h3>
                            <div className="grid gap-2">
                                {day.slots.map((slot, slotIndex) => (
                                    <div key={slotIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                        <span>{slot}</span>
                                        <button className="text-indigo-600 hover:text-indigo-800">
                                            Edit
                                        </button>
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