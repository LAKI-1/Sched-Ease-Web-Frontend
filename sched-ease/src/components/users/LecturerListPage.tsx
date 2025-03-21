import React, { useEffect, useState } from 'react';
import { Mail, Plus, Loader, Search, GraduationCap, Building2 } from 'lucide-react';
import axios from 'axios';
import '../../css/LecturerListPage.css';

interface Lecturer {
    id: number;
    name: string;
    nameShort: string;
    email: string;
}

interface NewLecturer {
    name: string;
    nameShort: string;
    email: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

export default function LecturerListPage() {
    const [showAddLecturer, setShowAddLecturer] = React.useState(false);
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [newLecturer, setNewLecturer] = useState<NewLecturer>({
        name: '',
        nameShort: '',
        email: ''
    });

    useEffect(() => {
        fetchLecturers();
    }, []);

    const fetchLecturers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/lecturers`);
            setLecturers(response.data);
        } catch (err) {
            setError('Failed to load lecturers. Please try again.');
            console.error('Error fetching lecturers:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            const response = await axios.post(`${API_BASE_URL}/lecturers`, newLecturer);
            setLecturers([...lecturers, response.data]);
            setShowAddLecturer(false);
            setNewLecturer({ name: '', nameShort: '', email: '' });
        } catch (err) {
            setError('Failed to add lecturer. Please try again.');
            console.error('Error adding lecturer:', err);
        }
    };

    const filteredLecturers = lecturers.filter(lecturer =>
        lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.nameShort.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <Loader className="loading-spinner" />
                    <p className="loading-text">Loading faculty information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="lecturer-page">
            <div className="lecturer-container">
                {/* Header Section */}
                <div className="header-section">
                    <div className="header-content">
                        <div className="header-title-section">
                            <GraduationCap size={32} className="header-icon" />
                            <div>
                                <h2 className="header-title">Faculty Directory</h2>
                                <p className="header-subtitle">Manage and view faculty members</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddLecturer(true)}
                            className="add-faculty-button"
                        >
                            <Plus size={20} />
                            Add Faculty Member
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="search-container">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search faculty by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {showAddLecturer && (
                    <div className="add-lecturer-form">
                        <div className="form-header">
                            <Building2 size={24} className="header-icon" />
                            <h3 className="form-title">Add New Faculty Member</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="form-group">
                            <div>
                                <label className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={newLecturer.name}
                                    onChange={(e) => setNewLecturer({ ...newLecturer, name: e.target.value })}
                                    className="form-input"
                                    required
                                    placeholder="e.g., Dr. John Smith"
                                />
                            </div>
                            <div>
                                <label className="form-label">
                                    Short Name
                                </label>
                                <input
                                    type="text"
                                    value={newLecturer.nameShort}
                                    onChange={(e) => setNewLecturer({ ...newLecturer, nameShort: e.target.value })}
                                    className="form-input"
                                    required
                                    placeholder="e.g., Dr. Smith"
                                />
                            </div>
                            <div>
                                <label className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={newLecturer.email}
                                    onChange={(e) => setNewLecturer({ ...newLecturer, email: e.target.value })}
                                    className="form-input"
                                    required
                                    placeholder="email@university.edu"
                                />
                            </div>
                            <div className="form-actions">
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

                {filteredLecturers.length === 0 ? (
                    <div className="empty-state">
                        <GraduationCap size={48} className="empty-state-icon" />
                        <p className="empty-state-text">
                            {searchTerm ? 'No faculty members found matching your search.' : 'No faculty members found. Add some to get started.'}
                        </p>
                    </div>
                ) : (
                    <div className="lecturer-grid">
                        {filteredLecturers.map((lecturer) => (
                            <div key={lecturer.id} className="lecturer-card">
                                <div className="lecturer-card-content">
                                    <div className="lecturer-info">
                                        <div className="lecturer-avatar">
                                            <div className="avatar-icon-container">
                                                <GraduationCap size={24} className="avatar-icon" />
                                            </div>
                                            <div>
                                                <h3 className="lecturer-name">{lecturer.name}</h3>
                                                <p className="lecturer-short-name">{lecturer.nameShort}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lecturer-contact">
                                        <div className="lecturer-email">
                                            <Mail size={16} />
                                            <a href={`mailto:${lecturer.email}`}>
                                                {lecturer.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}