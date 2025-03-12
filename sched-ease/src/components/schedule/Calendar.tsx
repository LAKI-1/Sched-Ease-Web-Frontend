import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, generateTimeSlots } from '../../lib/utils';

interface CalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    events: CalendarEvent[];
}

interface CalendarEvent {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    type: 'session' | 'availability';
}

export default function Calendar({ selectedDate, onDateChange, events }: CalendarProps) {
    const timeSlots = generateTimeSlots();

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);
        onDateChange(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);
        onDateChange(newDate);
    };

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b">
                <button
                    onClick={handlePrevDay}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>
                <button
                    onClick={handleNextDay}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="divide-y">
                {timeSlots.map((time) => {
                    const currentEvents = events.filter(event => event.startTime === time);
                    return (
                        <div key={time} className="flex items-center p-4 hover:bg-gray-50">
                            <div className="w-20 text-sm text-gray-600">{time}</div>
                            <div className="flex-1 ml-4">
                                {currentEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className={`p-2 rounded ${
                                            event.type === 'session'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}