import { Calendar, Clock} from 'lucide-react';

export function Book() {
    const availableSlots = [
        { date: '2024-03-20', time: '10:00 AM', lecturer: 'Ms. Sarah Wilson', type: 'Feedback Session' },
        { date: '2024-03-21', time: '2:30 PM', lecturer: 'Mr. James Chen', type: 'Feedback Session' },
        { date: '2024-03-22', time: '11:00 AM', lecturer: 'Mr. Michael Brown', type: 'Feedback Session' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Calendar size={32} className="text-[#3E8498]" />
                <h2 className="text-2xl font-semibold text-gray-900">Available Session Slots</h2>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <div className="space-y-6">
                    {availableSlots.map((slot, index) => (
                        <div key={index} className="border-b last:border-b-0 pb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{slot.type}</h3>
                                    <p className="text-gray-600">with {slot.lecturer}</p>
                                </div>
                                <button className="px-4 py-2 bg-[#3E8498] text-white rounded-lg hover:bg-[#346b7a] transition-colors">
                                    Book Slot
                                </button>
                            </div>
                            <div className="flex items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{slot.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{slot.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}