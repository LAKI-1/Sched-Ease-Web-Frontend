import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';
import { loginUser, loginGoogleUser } from '../../lib/api/auth';
import { UserRole } from '../../types/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
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
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { queryParams: { prompt: 'select_account', access_type: 'offline', }, }, });
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        prompt: 'select_account',
                        access_type: 'offline',
                    },
                    // redirectTo: `${window.location.origin}/loginform`
                    redirectTo: `${window.location.origin}`
                    // redirectTo: `/`
                }
            });
            console.log('OAuth Sign-In Data:', data);
            if (error) throw error;

            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            console.log('Session Data:', sessionData);
            if (sessionError) throw sessionError;

            const user = await loginGoogleUser(sessionData?.session?.access_token as string, role);
            console.log('User:', user);
            login(user);

        } catch (err) {
            console.error('Google Sign-In Error:', err);
            setError(err instanceof Error ? err.message : 'Google Sign-In failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <LogIn className="h-12 w-12 text-blue-700" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to Sched-Ease Portal
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            id="email"
                            type="email"
                            label="Email address"
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    variant={role === 'student' ? 'primary' : 'secondary'}
                                    onClick={() => setRole('student')}
                                >
                                    Student
                                </Button>
                                <Button
                                    type="button"
                                    variant={role === 'lecturer' ? 'primary' : 'secondary'}
                                    onClick={() => setRole('lecturer')}
                                >
                                    Lecturer
                                </Button>
                                <Button
                                    type="button"
                                    variant={role === 'sdgp_admin' ? 'primary' : 'secondary'}
                                    onClick={() => setRole('sdgp_admin')}
                                >
                                    SDGP Admin
                                </Button>
                                <Button
                                    type="button"
                                    variant={role === 'admin' ? 'primary' : 'secondary'}
                                    onClick={() => setRole('admin')}
                                >
                                    Admin
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
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
