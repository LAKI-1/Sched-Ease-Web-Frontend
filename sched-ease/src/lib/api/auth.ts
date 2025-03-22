import { User, UserRole } from '../../types/auth';
import { postRequest } from '../../lib/fetch/utils';

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
            token: 'fake-token',
        };
    }

    throw new Error('Invalid credentials');
};

// ** Move Google login inside a React component **
export const loginGoogleUser = async (
    token: string,
    role: UserRole
): Promise<User> => {

    console.log("making req with token:", token, "for role:", role);


    // Simulate API delay
    const response = await postRequest(token, `api/v1/login/${role}-login`, {});
    // Simulate authentication

    if (!response) {
        throw new Error("Failed to fetch user data");
    }

    const json = await response.json();

    console.log("response: ", json);

    return {
        id: json.user?.id.toString() || "",
        name: json.user?.name || "",
        email: json.user?.email || "",
        avatar: json.user?.avatar || "",
        role,
        token,
    };

    throw new Error('Invalid credentials');
};
