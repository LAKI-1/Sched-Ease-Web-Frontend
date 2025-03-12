import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';
import { loginUser } from '../../lib/api/auth';
import { UserRole } from '../../types/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Logo from '../../assets/SchedEase.png';

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
        <div className="h-screen flex overflow-hidden">
            {/* Left Side - Logo with Full Background Coverage */}
            <div className="hidden lg:flex items-center justify-center w-1/2 bg-blue-100 border-r border-gray-200">
                <div className="flex items-center justify-center w-full h-full">
                    <img src={Logo} alt="Sched-Ease Logo" className="w-2/3 animate-fadeIn" />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-white border-l border-gray-200">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <LogIn className="h-12 w-12 text-blue-700 mx-auto mb-2" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Sign in to <span className="text-blue-700">Sched-Ease</span> Portal
                        </h2>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-center mb-6">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5 w-full" onSubmit={handleSubmit}>
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
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                {['student', 'lecturer', 'sdgp_admin', 'admin'].map((r) => (
                                    <Button
                                        key={r}
                                        type="button"
                                        variant={role === r ? 'primary' : 'secondary'}
                                        onClick={() => setRole(r as UserRole)}
                                        className={`transition-all duration-300 ${
                                            role === r ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        {r.charAt(0).toUpperCase() + r.slice(1).replace('_', ' ')}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
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