import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, generateTimeSlots } from '../../lib/utils';
import '../../css/Calendar.css';

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
        <div className="calendar">
            <div className="calendar-header">
                <button
                    onClick={handlePrevDay}
                    className="nav-button"
                >
                    <ChevronLeft className="nav-icon" />
                </button>
                <h2 className="date-display">{formatDate(selectedDate)}</h2>
                <button
                    onClick={handleNextDay}
                    className="nav-button"
                >
                    <ChevronRight className="nav-icon" />
                </button>
            </div>

            <div className="time-slots">
                {timeSlots.map((time) => {
                    const currentEvents = events.filter(event => event.startTime === time);
                    return (
                        <div key={time} className="time-slot">
                            <div className="time-label">{time}</div>
                            <div className="events-container">
                                {currentEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className={`event ${event.type}`}
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