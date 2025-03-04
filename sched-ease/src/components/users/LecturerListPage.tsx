import React from 'react';
import { Mail, Plus } from 'lucide-react';

export default function LecturerListPage() {
    const [showAddLecturer, setShowAddLecturer] = React.useState(false);
    const [newLecturer, setNewLecturer] = React.useState({
        name: '',
        email: '',
        specialization: '',
        availability: ''
    });

    const lecturers = [
        { name: 'Dr. Sarah Wilson', email: 'sarah.wilson@example.com', specialization: 'Software Engineering', availability: 'Monday, Wednesday' },
        { name: 'Prof. James Chen', email: 'james.chen@example.com', specialization: 'Database Systems', availability: 'Tuesday, Thursday' },
        { name: 'Dr. Michael Brown', email: 'michael.brown@example.com', specialization: 'AI & Machine Learning', availability: 'Wednesday, Friday' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle lecturer addition logic here
        setShowAddLecturer(false);
        setNewLecturer({ name: '', email: '', specialization: '', availability: '' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-gray-900">Lecturers</h2>
                </div>
                <button
                    onClick={() => setShowAddLecturer(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    <Plus size={20} />
                    Add Lecturer
                </button>
            </div>

            {showAddLecturer && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add New Lecturer</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={newLecturer.name}
                                onChange={(e) => setNewLecturer({ ...newLecturer, name: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={newLecturer.email}
                                onChange={(e) => setNewLecturer({ ...newLecturer, email: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Specialization
                            </label>
                            <input
                                type="text"
                                value={newLecturer.specialization}
                                onChange={(e) => setNewLecturer({ ...newLecturer, specialization: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Availability
                            </label>
                            <input
                                type="text"
                                value={newLecturer.availability}
                                onChange={(e) => setNewLecturer({ ...newLecturer, availability: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                                placeholder="e.g., Monday, Wednesday"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowAddLecturer(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Add Lecturer
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {lecturers.map((lecturer, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">{lecturer.name}</h3>
                        <div className="space-y-2 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>{lecturer.email}</span>
                            </div>
                            <p><strong>Specialization:</strong> {lecturer.specialization}</p>
                            <p><strong>Available:</strong> {lecturer.availability}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}