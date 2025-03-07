import React from 'react';
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
import { Feedback } from './components/folder/Feedback';
import { MasterCalendar } from './components/schedule/MasterCalendar';
import SettingsPage from './components/settings/SettingsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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

                        <Route  path="/timetable" element={
                            <ProtectedRoute>
                                <Timetable />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/teams" element={
                            <ProtectedRoute>
                                <TeamListPage />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/feedback" element={
                            <ProtectedRoute>
                                <Feedback role={user?.role === 'sdgp_admin' ? 'sdgp_admin' : 'lecturer'} />
                            </ProtectedRoute>
                        }
                        />

                        {/* <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            /> */}

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
}

export default App;
