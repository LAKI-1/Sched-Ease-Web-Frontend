import { User, UserRole } from '../../types/auth';

// Simulated API call - replace with actual API integration
export const loginUser = async (
    email: string,
    password: string,
    role: UserRole
): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate authentication
    if (email && password) {
        return {
            id: '1',
            name: email.split('@')[0],
            email,
            role,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        };
    }

    throw new Error('Invalid credentials');
};