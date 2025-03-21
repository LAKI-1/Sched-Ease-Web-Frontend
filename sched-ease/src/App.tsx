import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/store/authStore';
import LoginForm from './components/auth/LoginForm';
import Header from './components/layout/Header';
import AdminDashboard from './components/dashboard/AdminDashboard';
import SDGPAdminDashboard from './components/dashboard/SDGPAdminDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import LecturerDashboard from './components/dashboard/LecturerDashboard';
import LecturerListPage from './components/users/LecturerListPage';
import GroupListPage from './components/users/GroupListPage';
import TeamListPage from './components/users/TeamListPage';
import Availability from './components/schedule/Availability';
import { Timetable } from './components/schedule/Timetable';
import { MasterCalendar } from './components/schedule/MasterCalendar';
import { TeamRegistration } from "./components/registration/TeamRegistration.tsx";
import FeedbackSession from './components/schedule/FeedbackSession';
import SchedulePage from './components/schedule/SchedulePage';
import SettingsPage from './components/settings/SettingsPage';
import SplashScreen from './components/Splash Screen/splashscreen';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

    if (loading) {
        return <SplashScreen onDone={() => setLoading(false)} />;
    }

    function ProtectedRoute({ children }: { children: React.ReactNode }) {
        return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                {isAuthenticated && <Header />}
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} />

                        {/* Protected Route for Dashboards */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                {user?.role === 'admin' ? (
                                    <AdminDashboard />
                                ) : user?.role === 'sdgp_admin' ? (
                                    <SDGPAdminDashboard />
                                ) : user?.role === 'student' ? (
                                    <StudentDashboard />
                                ) : user?.role === 'lecturer' ? (
                                    <LecturerDashboard />
                                ) : (
                                    <Navigate to="/login" />
                                )}
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/lecturers" element={
                            <ProtectedRoute>
                                <LecturerListPage />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/availability" element={
                            <ProtectedRoute>
                                <Availability />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/master-calendar" element={
                            <ProtectedRoute>
                                <MasterCalendar />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/groups" element={
                            <ProtectedRoute>
                                <GroupListPage />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/feedback-session" element={
                            <ProtectedRoute>
                                <FeedbackSession />
                            </ProtectedRoute>
                        }
                        />

                        <Route  path="/timetable" element={
                            <ProtectedRoute>
                                <Timetable />
                            </ProtectedRoute>
                        }
                        />

                        <Route  path="/schedule-page" element={
                            <ProtectedRoute>
                                <SchedulePage />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/teams" element={
                            <ProtectedRoute>
                                <TeamListPage />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/team-registration" element={
                            <ProtectedRoute>
                                <TeamRegistration />
                            </ProtectedRoute>
                        }
                        />

                        {/* Settings Page */}
                        <Route path="/settings" element={
                            <ProtectedRoute>
                                <SettingsPage />
                            </ProtectedRoute>
                        }
                        />

                        {/* Default Redirect */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;