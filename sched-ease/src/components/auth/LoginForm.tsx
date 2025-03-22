import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';
import { loginUser, loginGoogleUser } from '../../lib/api/auth';
import { UserRole } from '../../types/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Logo from '../../assets/SchedEase.png';
import '../../css/LoginForm.css';
// import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../components/supabase/supabaseClient';

// const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string;
// const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth State Changed:', event, session);
        });

        return () => {
            authListener.subscription.unsubscribe();
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
            // setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // try {

        //     const { data, error } = await supabase.auth.signInWithOAuth({
        //         provider: 'google',
        //         options: {
        //             queryParams: {
        //                 prompt: 'select_account',
        //                 access_type: 'offline',
        //             },
        //             redirectTo: `${window.location.origin}/loginform`
        //             // redirectTo: `${window.location.origin}`
        //             // redirectTo: `/`
        //         }
        //     });
        //     console.log('OAuth Sign-In Data:', data);
        //     if (error) throw error;

        //     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        //     console.log('Session Data:', sessionData);
        //     if (sessionError) throw sessionError;

        //     const user = await loginGoogleUser(sessionData?.session?.access_token as string, role);
        //     console.log('User:', user);
        //     login(user);

        // }
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        prompt: 'select_account',
                        access_type: 'offline',
                    },
                    redirectTo: `${window.location.origin}/oauth-redirect?role=${role}`
                }
            });

            if (error) throw error;
        }

        catch (err) {
            console.error('Google Sign-In Error:', err);
            setError(err instanceof Error ? err.message : 'Google Sign-In failed');
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

                    <div className="mt-6">
                        <Button
                            type="button"
                            className="w-full"
                            variant="outline"
                            onClick={handleGoogleSignIn}
                            isLoading={isLoading}
                        >
                            Sign in with Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
