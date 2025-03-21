import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, Calendar, Check, X } from 'lucide-react';

// Define the necessary types
type Mentor = {
    id: string;
    name: string;
    specialty: string;
    avatarColor?: string;
    avatarInitial?: string;
    availableDates?: string[]; // Array of available dates in YYYY-MM-DD format
};

type TimeSlot = {
    id: string;
    time: string;
    available: boolean;
};

// Helper to format date for display
const formatDateForDisplay = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

const EnhancedFeedbackSession: React.FC = () => {
    // Step tracking state
    const [currentStep, setCurrentStep] = useState<'selectDate' | 'selectMentor' | 'selectDetails' | 'confirmation'>('selectDate');

    // Calendar state
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [formattedSelectedDate, setFormattedSelectedDate] = useState<string>('');

    // Selection states
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
    const [groupNumber, setGroupNumber] = useState<string>('');
    const [sessionFocus, setSessionFocus] = useState<string>('');
    const [additionalNotes, setAdditionalNotes] = useState<string>('');

    // UI states
    const [showTimeSlotDropdown, setShowTimeSlotDropdown] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    // Mock data
    const mentors: Mentor[] = [
        {
            id: '1',
            name: 'Mr. Albert',
            specialty: 'Product Branding',
            avatarColor: '#c1e1c1',
            avatarInitial: 'A',
            availableDates: ['2025-03-21', '2025-03-22', '2025-03-24', '2025-03-25']
        },
        {
            id: '2',
            name: 'Mr. Leo',
            specialty: 'Back End Development',
            avatarColor: '#c1e1c1',
            avatarInitial: 'L',
            availableDates: ['2025-03-21', '2025-03-23', '2025-03-26', '2025-03-27']
        },
        {
            id: '3',
            name: 'Ms. Anne',
            specialty: 'UI/UX Design',
            avatarColor: '#c1e1c1',
            avatarInitial: 'A',
            availableDates: ['2025-03-22', '2025-03-23', '2025-03-25', '2025-03-28']
        },
        {
            id: '4',
            name: 'Ms. Priya',
            specialty: 'Project Management',
            avatarColor: '#c1e1c1',
            avatarInitial: 'P',
            availableDates: ['2025-03-21', '2025-03-24', '2025-03-26', '2025-03-29']
        }
    ];

    // Filter mentors based on selected date
    const availableMentors = selectedDate ? mentors.filter(mentor =>
        mentor.availableDates?.includes(selectedDate)
    ) : [];

    const timeSlots: TimeSlot[] = [
        { id: '1', time: '09:00 AM', available: true },
        { id: '2', time: '10:30 AM', available: true },
        { id: '3', time: '01:00 PM', available: true },
        { id: '4', time: '03:30 PM', available: true },
        { id: '5', time: '05:00 PM', available: true }
    ];

    // Calendar functions
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
        }

        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isAvailable = mentors.some(mentor => mentor.availableDates?.includes(dateStr));
            const isSelected = dateStr === selectedDate;

            days.push(
                <div
                    key={`day-${day}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer 
                              ${isAvailable ? 'hover:bg-blue-100' : 'text-gray-300 cursor-not-allowed'}
                              ${isSelected ? 'bg-blue-800 text-white' : ''}`}
                    onClick={() => isAvailable && handleDateSelect(dateStr)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const prevMonth = () => {
        setCurrentMonth(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() - 1);
            return date;
        });
    };

    const nextMonth = () => {
        setCurrentMonth(prev => {
            const date = new Date(prev);
            date.setMonth(date.getMonth() + 1);
            return date;
        });
    };

    // Handler functions
    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setFormattedSelectedDate(formatDateForDisplay(date));
    };

    const handleMentorSelect = (mentor: Mentor) => {
        setSelectedMentor(mentor);
        setCurrentStep('selectDetails');
    };

    const handleTimeSlotSelect = (timeSlot: string) => {
        setSelectedTimeSlot(timeSlot);
        setShowTimeSlotDropdown(false);
    };

    const handleSubmitForm = () => {
        if (selectedMentor && selectedTimeSlot) {
            setShowConfirmation(true);
        }
    };

    const handleConfirmBooking = () => {
        setSuccessMessage(`You have successfully booked a session with ${selectedMentor?.name} on ${formattedSelectedDate} at ${selectedTimeSlot}.`);
        setShowConfirmation(false);
        // Reset the form
        setCurrentStep('selectDate');
        setSelectedMentor(null);
        setSelectedDate('');
        setFormattedSelectedDate('');
        setSelectedTimeSlot('');
        setGroupNumber('');
        setSessionFocus('');
        setAdditionalNotes('');
    };

    const handleBackNavigation = () => {
        if (currentStep === 'selectMentor') {
            setCurrentStep('selectDate');
        } else if (currentStep === 'selectDetails') {
            setCurrentStep('selectMentor');
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleContinueToMentors = () => {
        setCurrentStep('selectMentor');
    };

    // Render calendar selection
    const renderCalendarSelection = () => (
        <div className="w-full px-6 py-6">
            <h2 className="text-2xl font-bold mb-6">Select a Date</h2>

            <div className="bg-white rounded-xl p-4 shadow mb-6">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={20} />
                    </button>
                    <h3 className="text-lg font-semibold">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full rotate-180">
                        <ArrowLeft size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-sm font-medium text-gray-500">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                    {generateCalendarDays()}
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-600">
                    <div className="w-3 h-3 bg-blue-800 rounded-full mr-2"></div>
                    <span>Available dates</span>
                </div>
            </div>

            {selectedDate && (
                <div className="bg-white rounded-xl p-4 shadow mb-6">
                    <p className="font-medium">Selected date: {formattedSelectedDate}</p>
                    <p className="text-sm text-gray-600 mt-2">
                        {availableMentors.length} mentors available on this date
                    </p>
                </div>
            )}

            <div className="fixed bottom-6 inset-x-0 flex justify-center">
                <button
                    className={`rounded-full px-8 py-4 w-32 font-medium ${selectedDate ? 'bg-blue-800 text-white' : 'bg-gray-200 text-white cursor-not-allowed'}`}
                    disabled={!selectedDate}
                    onClick={handleContinueToMentors}
                >
                    Next
                </button>
            </div>
        </div>
    );

    // Render mentor selection
    const renderSelectMentor = () => (
        <div className="w-full px-6 py-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold py-2">{formattedSelectedDate}</h2>
                <p className="text-gray-600">Select a mentor for your session:</p>
            </div>
            <div className="flex flex-col gap-4">
                {availableMentors.map((mentor) => (
                    <div
                        key={mentor.id}
                        className={`flex items-center bg-white rounded-xl p-4 shadow cursor-pointer`}
                        onClick={() => handleMentorSelect(mentor)}
                    >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 font-semibold text-lg mr-4" style={{ backgroundColor: mentor.avatarColor }}>
                            {mentor.avatarInitial}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-base font-semibold mb-1">{mentor.name}</h3>
                            <p className="text-gray-600 text-sm">{mentor.specialty}</p>
                        </div>
                        <div className="w-6 h-6">
                            <div className={`w-5 h-5 rounded-full border-2 ${selectedMentor?.id === mentor.id ? 'border-blue-800 flex items-center justify-center' : 'border-gray-300'}`}>
                                {selectedMentor?.id === mentor.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-800"></div>}
                            </div>
                        </div>
                    </div>
                ))}

                {availableMentors.length === 0 && (
                    <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">
                        No mentors available on this date. Please select a different date.
                    </div>
                )}
            </div>

            <div className="fixed bottom-6 inset-x-0 flex justify-center">
                <button
                    className={`rounded-full px-8 py-4 w-32 font-medium ${selectedMentor ? 'bg-blue-800 text-white' : 'bg-gray-200 text-white cursor-not-allowed'}`}
                    disabled={!selectedMentor}
                    onClick={() => setCurrentStep('selectDetails')}
                >
                    Next
                </button>
            </div>
        </div>
    );

    // Render booking details
    const renderBookDetails = () => (
        <div className="w-full px-6 py-6">
            {selectedMentor && (
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 font-semibold text-lg mr-4" style={{ backgroundColor: selectedMentor.avatarColor }}>
                        {selectedMentor.avatarInitial}
                    </div>
                    <div>
                        <h3 className="text-base font-semibold mb-1">{selectedMentor.name}</h3>
                        <p className="text-gray-600 text-sm">{selectedMentor.specialty}</p>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-2xl font-bold py-2">{formattedSelectedDate}</h2>
            </div>

            <div className="mb-5">
                <h3 className="text-base font-semibold mb-2">Select a Time Slot</h3>
                <div className="relative">
                    <div
                        className="flex justify-between items-center bg-white rounded-lg p-4 shadow cursor-pointer"
                        onClick={() => setShowTimeSlotDropdown(!showTimeSlotDropdown)}
                    >
                        <span>{selectedTimeSlot || 'Select a time slot'}</span>
                        <ChevronDown size={20} />
                    </div>

                    {showTimeSlotDropdown && (
                        <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-md z-10 mt-1 overflow-hidden">
                            {timeSlots.map(slot => (
                                <div
                                    key={slot.id}
                                    className="p-3 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleTimeSlotSelect(slot.time)}
                                >
                                    {slot.time}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-5">
                <h3 className="text-base font-semibold mb-2">Group Number</h3>
                <input
                    type="text"
                    className="w-full bg-white border-none rounded-lg p-4 text-base shadow"
                    placeholder="Enter your group number (eg: CS-66)"
                    value={groupNumber}
                    onChange={(e) => setGroupNumber(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <h3 className="text-base font-semibold mb-2">Session Focus</h3>
                <input
                    type="text"
                    className="w-full bg-white border-none rounded-lg p-4 text-base shadow"
                    placeholder="What would you like to focus on? (eg: CSS)"
                    value={sessionFocus}
                    onChange={(e) => setSessionFocus(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <h3 className="text-base font-semibold mb-2">Additional Notes (Optional)</h3>
                <textarea
                    className="w-full bg-white border-none rounded-lg p-4 text-base shadow min-h-32 resize-y"
                    placeholder="Add any specific topics or problems to be discussed."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                ></textarea>
            </div>

            <button
                className={`w-full rounded-full py-4 text-base font-medium mt-6 ${selectedTimeSlot ? 'bg-blue-800 text-white' : 'bg-blue-300 text-white cursor-not-allowed'}`}
                disabled={!selectedTimeSlot}
                onClick={handleSubmitForm}
            >
                Book Session
            </button>
        </div>
    );

    // Confirmation Modal
    const renderConfirmationModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Confirm Booking</h3>
                    <button
                        onClick={handleCloseConfirmation}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="mb-4">Please confirm your session details:</p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center mb-2">
                            <Calendar size={16} className="text-blue-800 mr-2" />
                            <p><span className="font-medium">Date:</span> {formattedSelectedDate}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <Clock size={16} className="text-blue-800 mr-2" />
                            <p><span className="font-medium">Time:</span> {selectedTimeSlot}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <User size={16} className="text-blue-800 mr-2" />
                            <p><span className="font-medium">Mentor:</span> {selectedMentor?.name}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <Users size={16} className="text-blue-800 mr-2" />
                            <p><span className="font-medium">Group:</span> {groupNumber || 'Not specified'}</p>
                        </div>
                        <div className="flex items-center">
                            <Target size={16} className="text-blue-800 mr-2" />
                            <p><span className="font-medium">Focus:</span> {sessionFocus || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleConfirmBooking}
                        className="bg-blue-800 text-white rounded-full py-3 font-medium flex items-center justify-center"
                    >
                        <Check size={18} className="mr-2" />
                        Confirm Booking
                    </button>
                    <button
                        onClick={handleCloseConfirmation}
                        className="border border-gray-300 rounded-full py-3 font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <div className="sticky top-0 z-10 flex items-center bg-blue-800 text-white p-4">
                <button
                    onClick={handleBackNavigation}
                    className={`bg-transparent border-none text-white mr-4 flex items-center justify-center cursor-pointer ${currentStep === 'selectDate' ? 'invisible' : ''}`}
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-medium m-0">
                    {currentStep === 'selectDate' ? 'Select a Date' :
                        currentStep === 'selectMentor' ? 'Select a Mentor' : 'Book Session'}
                </h1>
            </div>

            {successMessage && (
                <div className="bg-green-100 text-green-800 p-4 mx-4 my-4 rounded-lg font-medium">
                    {successMessage}
                </div>
            )}

            <div className="w-full">
                {currentStep === 'selectDate' && renderCalendarSelection()}
                {currentStep === 'selectMentor' && renderSelectMentor()}
                {currentStep === 'selectDetails' && renderBookDetails()}
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && renderConfirmationModal()}
        </div>
    );
};

// Missing components for the renderConfirmationModal
const Clock = (props: { size: number, className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const User = (props: { size: number, className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const Users = (props: { size: number, className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
    >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const Target = (props: { size: number, className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

export default EnhancedFeedbackSession;