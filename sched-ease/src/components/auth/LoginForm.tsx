import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';
import { loginUser } from '../../lib/api/auth';
import { UserRole } from '../../types/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Logo from '../../assets/SchedEase.png';
import '../../css/LoginForm.css';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('student');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const login = useAuthStore((state) => state.login);

    // Disable scrolling when the login form is displayed
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await loginUser(email, password, role);
            login(user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left Side - Logo with Full Background Coverage */}
            <div className="logo-section">
                <div className="logo-wrapper">
                    <img src={Logo} alt="Sched-Ease Logo" className="logo-image" />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="login-form-section">
                <div className="form-container">
                    <div className="form-header">
                        <LogIn className="header-icon" />
                        <h2 className="header-title">
                            Sign in to <span className="brand-name">Sched-Ease</span> Portal
                        </h2>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <Input
                            id="email"
                            type="email"
                            label="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Role Selection */}
                        <div>
                            <label className="role-label">Role</label>
                            <div className="role-grid">
                                {['student', 'lecturer', 'sdgp_admin', 'admin'].map((r) => (
                                    <Button
                                        key={r}
                                        type="button"
                                        variant={role === r ? 'primary' : 'secondary'}
                                        onClick={() => setRole(r as UserRole)}
                                        className={`role-button ${role === r ? 'active' : 'inactive'}`}
                                    >
                                        {r.charAt(0).toUpperCase() + r.slice(1).replace('_', ' ')}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="submit-button"
                            isLoading={isLoading}
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}