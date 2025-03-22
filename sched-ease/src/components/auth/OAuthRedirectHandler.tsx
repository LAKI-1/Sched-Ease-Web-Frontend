import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { loginGoogleUser } from '../../lib/api/auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../components/supabase/supabaseClient';
import { UserRole } from '../../types/auth';

export default function OAuthRedirectHandler() {
    const [error, setError] = useState<string>('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleOAuthLogin = async () => {
            try {
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                const urlParams = new URLSearchParams(window.location.search);
                const role = urlParams.get('role') as UserRole;

                if (!sessionData?.session?.access_token) {
                    throw new Error('No access token found');
                }

                const user = await loginGoogleUser(sessionData.session.access_token, role);
                login(user);

                let redirect = '/';
                switch (role) {
                    case 'admin':
                        redirect = '/admindashboard';
                        break;
                    case 'student':
                        redirect = '/studentdashboard';
                        break;
                    case 'lecturer':
                        redirect = '/lecturerdashboard';
                        break;
                    case 'sdgp_admin':
                        redirect = '/sdgpadmindashboard';
                        break;
                }

                navigate(redirect);
            } catch (err) {
                console.error('OAuth Redirect Error:', err);
                setError(err instanceof Error ? err.message : 'OAuth Sign-In failed');
            }
        };

        handleOAuthLogin();
        setIsLoading(false);
    }, [login, navigate]);

    return (
        <div className="oauth-redirect-container">
            {error ? <p className="error-message">{error}</p> : <></>}
        </div>
    );
}
