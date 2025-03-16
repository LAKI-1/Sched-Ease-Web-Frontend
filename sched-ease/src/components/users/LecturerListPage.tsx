import React from 'react';
import { Mail, Plus } from 'lucide-react';
import '../../css/LecturerListPage.css';

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
        <div className="lecturer-container">
            <div className="header-wrapper">
                <div className="header-title-container">
                    <h2 className="header-title">Lecturers</h2>
                </div>
                <button
                    onClick={() => setShowAddLecturer(true)}
                    className="add-lecturer-button"
                >
                    <Plus size={20} />
                    Add Lecturer
                </button>
            </div>

            {showAddLecturer && (
                <div className="form-container">
                    <h3 className="form-title">Add New Lecturer</h3>
                    <form onSubmit={handleSubmit} className="form-content">
                        <div className="form-field">
                            <label className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                value={newLecturer.name}
                                onChange={(e) => setNewLecturer({ ...newLecturer, name: e.target.value })}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                value={newLecturer.email}
                                onChange={(e) => setNewLecturer({ ...newLecturer, email: e.target.value })}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label className="form-label">
                                Specialization
                            </label>
                            <input
                                type="text"
                                value={newLecturer.specialization}
                                onChange={(e) => setNewLecturer({ ...newLecturer, specialization: e.target.value })}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label className="form-label">
                                Availability
                            </label>
                            <input
                                type="text"
                                value={newLecturer.availability}
                                onChange={(e) => setNewLecturer({ ...newLecturer, availability: e.target.value })}
                                className="form-input"
                                required
                                placeholder="e.g., Monday, Wednesday"
                            />
                        </div>
                        <div className="form-buttons">
                            <button
                                type="button"
                                onClick={() => setShowAddLecturer(false)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-button"
                            >
                                Add Lecturer
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="lecturer-grid">
                {lecturers.map((lecturer, index) => (
                    <div key={index} className="lecturer-card">
                        <h3 className="lecturer-name">{lecturer.name}</h3>
                        <div className="lecturer-info">
                            <div className="lecturer-email">
                                <Mail size={16} />
                                <span>{lecturer.email}</span>
                            </div>
                            <p><span className="info-label">Specialization:</span> {lecturer.specialization}</p>
                            <p><span className="info-label">Available:</span> {lecturer.availability}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}