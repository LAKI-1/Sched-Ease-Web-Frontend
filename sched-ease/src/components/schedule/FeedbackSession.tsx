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
        <div className="w-full px-6 py-6 max-w-5xl mx-auto">
            <div className="flex gap-8">
                {/* Calendar Section */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ArrowLeft size={24} className="text-gray-600" />
                            </button>
                            <h3 className="text-xl font-semibold text-gray-800">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full rotate-180 transition-colors">
                                <ArrowLeft size={24} className="text-gray-600" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-sm font-medium text-gray-500">{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center">
                            {generateCalendarDays()}
                        </div>

                        <div className="mt-6 flex items-center text-sm text-gray-600">
                            <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                            <span>Available dates</span>
                        </div>
                    </div>
                </div>

                {/* Selected Date Details Section */}
                <div className="w-80">
                    {selectedDate ? (
                        <div className="sticky top-6">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg mb-8">
                                <p className="text-lg font-semibold text-gray-800">Selected date: {formattedSelectedDate}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    {availableMentors.length} mentors available on this date
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className={`w-32 rounded-full px-6 py-3 font-medium text-base transition-all duration-200 transform hover:scale-105 ${
                                        selectedDate 
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!selectedDate}
                                    onClick={handleContinueToMentors}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-6 text-center">
                            <p className="text-gray-500">Select a date to continue</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // Render mentor selection
    const renderSelectMentor = () => (
        <div className="w-full px-6 py-6 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={handleBackNavigation}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
                >
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 py-1">{formattedSelectedDate}</h2>
                    <p className="text-gray-600 text-base">Select a mentor for your session:</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {availableMentors.map((mentor) => (
                    <div
                        key={mentor.id}
                        className={`flex items-center bg-white rounded-xl p-4 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${
                            selectedMentor?.id === mentor.id ? 'ring-2 ring-blue-600' : ''
                        }`}
                        onClick={() => handleMentorSelect(mentor)}
                    >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 font-semibold text-xl mr-4" style={{ backgroundColor: mentor.avatarColor }}>
                            {mentor.avatarInitial}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold mb-1 text-gray-800">{mentor.name}</h3>
                            <p className="text-gray-600 text-sm">{mentor.specialty}</p>
                        </div>
                        <div className="w-6 h-6">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                                selectedMentor?.id === mentor.id 
                                    ? 'border-blue-600 flex items-center justify-center bg-blue-600' 
                                    : 'border-gray-300'
                            }`}>
                                {selectedMentor?.id === mentor.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                            </div>
                        </div>
                    </div>
                ))}

                {availableMentors.length === 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500 text-base">
                        No mentors available on this date. Please select a different date.
                    </div>
                )}
            </div>

            <div className="fixed bottom-8 inset-x-0 flex justify-center">
                <button
                    className={`rounded-full px-8 py-3 w-32 font-medium text-base transition-all duration-200 transform hover:scale-105 ${
                        selectedMentor 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
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
        <div className="w-full px-6 py-6 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={handleBackNavigation}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
                >
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 py-1">{formattedSelectedDate}</h2>
                </div>
            </div>

            {selectedMentor && (
                <div className="flex items-center mb-6 bg-white rounded-xl p-4 shadow-md">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 font-semibold text-xl mr-4" style={{ backgroundColor: selectedMentor.avatarColor }}>
                        {selectedMentor.avatarInitial}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1 text-gray-800">{selectedMentor.name}</h3>
                        <p className="text-gray-600 text-sm">{selectedMentor.specialty}</p>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Select a Time Slot</h3>
                    <div className="relative">
                        <div
                            className="flex justify-between items-center bg-white rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200"
                            onClick={() => setShowTimeSlotDropdown(!showTimeSlotDropdown)}
                        >
                            <span className="text-base">{selectedTimeSlot || 'Select a time slot'}</span>
                            <ChevronDown size={20} className="text-gray-600" />
                        </div>

                        {showTimeSlotDropdown && (
                            <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg z-10 mt-1 overflow-hidden">
                                {timeSlots.map(slot => (
                                    <div
                                        key={slot.id}
                                        className="p-3 cursor-pointer hover:bg-gray-50 text-base transition-colors"
                                        onClick={() => handleTimeSlotSelect(slot.time)}
                                    >
                                        {slot.time}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Group Number</h3>
                    <input
                        type="text"
                        className="w-full bg-white border-none rounded-lg p-3 text-base shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all duration-200"
                        placeholder="Enter your group number (eg: CS-66)"
                        value={groupNumber}
                        onChange={(e) => setGroupNumber(e.target.value)}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Session Focus</h3>
                    <input
                        type="text"
                        className="w-full bg-white border-none rounded-lg p-3 text-base shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all duration-200"
                        placeholder="What would you like to focus on? (eg: CSS)"
                        value={sessionFocus}
                        onChange={(e) => setSessionFocus(e.target.value)}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Additional Notes (Optional)</h3>
                    <textarea
                        className="w-full bg-white border-none rounded-lg p-3 text-base shadow-md min-h-24 resize-y focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all duration-200"
                        placeholder="Add any specific topics or problems to be discussed."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    className={`w-48 rounded-full py-2.5 text-base font-medium mt-6 transition-all duration-200 transform hover:scale-105 ${
                        selectedTimeSlot 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!selectedTimeSlot}
                    onClick={handleSubmitForm}
                >
                    Book Session
                </button>
            </div>
        </div>
    );

    // Confirmation Modal
    const renderConfirmationModal = () => (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Confirm Booking</h3>
                    <button
                        onClick={handleCloseConfirmation}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-4">Please confirm your session details:</p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center mb-2">
                            <Calendar size={16} className="text-blue-800 mr-2" />
                            <p className="text-gray-700"><span className="font-medium">Date:</span> {formattedSelectedDate}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <Clock size={16} className="text-blue-800 mr-2" />
                            <p className="text-gray-700"><span className="font-medium">Time:</span> {selectedTimeSlot}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <User size={16} className="text-blue-800 mr-2" />
                            <p className="text-gray-700"><span className="font-medium">Mentor:</span> {selectedMentor?.name}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <Users size={16} className="text-blue-800 mr-2" />
                            <p className="text-gray-700"><span className="font-medium">Group:</span> {groupNumber || 'Not specified'}</p>
                        </div>
                        <div className="flex items-center">
                            <Target size={16} className="text-blue-800 mr-2" />
                            <p className="text-gray-700"><span className="font-medium">Focus:</span> {sessionFocus || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleConfirmBooking}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full py-3 font-medium flex items-center justify-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                        <Check size={18} className="mr-2" />
                        Confirm Booking
                    </button>
                    <button
                        onClick={handleCloseConfirmation}
                        className="border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen">
            {successMessage && (
                <div className="bg-green-50 text-green-700 p-4 mx-4 my-4 rounded-lg font-medium text-base shadow-md max-w-2xl mx-auto">
                    {successMessage}
                </div>
            )}

            <div className="w-full pb-24">
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