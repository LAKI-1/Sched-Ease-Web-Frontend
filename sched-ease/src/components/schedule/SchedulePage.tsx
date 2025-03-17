import { useState } from 'react';
import Calendar from './Calendar';
import '../../css/SchedulePage.css';

export default function SchedulePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock events - replace with actual API data
    const events = [
        {
            id: '1',
            title: 'Feedback Session with CS-66',
            startTime: '10:00',
            endTime: '11:00',
            type: 'session' as const,
        },
        {
            id: '2',
            title: 'Lecturer for CS-G8',
            startTime: '14:00',
            endTime: '16:00',
            type: 'availability' as const,
        },
    ];

    return (
        <div className="schedule-container">
            <div className="page-header">
                <h1 className="page-title">Schedule Page</h1>
            </div>

            <Calendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                events={events}
            />
        </div>
    );
}