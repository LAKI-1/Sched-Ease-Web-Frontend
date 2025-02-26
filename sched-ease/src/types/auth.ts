export type UserRole = 'admin' | 'student' | 'lecturer' | 'sdgp_admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface Group {
    id: string;
    name: string;
    leader: {
        name: string;
        mobile: string;
        email: string;
        studentId: string;
    };
    members: string[];
}

export interface FeedbackSession {
    id: string;
    groupId: string;
    lecturerId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'pending' | 'completed';
    feedback?: string;
}