export type Role = 'administrator' | 'sdgp_administrator' | 'lecturer' | 'student';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
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