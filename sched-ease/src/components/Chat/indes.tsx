import React from 'react';
import { MessageSquare} from 'lucide-react';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';
import type { Role } from '../../types/auth.ts';

interface Props {
    role: Role;
    userId: string;
    userName: string;
    isGroupLeader: boolean;
}

export function Chat({ role, userId, userName, isGroupLeader }: Props) {
    const [selectedChatId, setSelectedChatId] = React.useState<string | null>(null);

    // Mock data - in a real app, this would come from your database
    const getAvailableChats = () => {
        switch (role) {
            case 'student':
                const studentChats = [
                    {
                        id: 'cs-20-group',
                        name: 'CS-20 Team Chat',
                        type: 'group' as const,
                        unreadCount: 0,
                        lastMessage: {
                            content: 'Updated the documentation',
                            timestamp: 'Yesterday'
                        }
                    },
                    {
                        id: 'lecturer-chat',
                        name: 'Dr. Sarah Wilson',
                        type: 'direct' as const,
                        unreadCount: 1,
                        lastMessage: {
                            content: 'Please review the changes',
                            timestamp: '2:45 PM'
                        }
                    }
                ];

                // Only add group leaders chat if user is a group leader
                if (isGroupLeader) {
                    studentChats.unshift({
                        id: 'group-leaders',
                        name: 'Group Leaders Chat',
                        type: 'group' as const,
                        unreadCount: 2,
                        lastMessage: {
                            content: 'Next meeting tomorrow at 10 AM',
                            timestamp: '10:30 AM'
                        }
                    });
                }

                return studentChats;

            case 'lecturer':
                return [
                    {
                        id: 'lecturer-group',
                        name: 'Lecturers Chat',
                        type: 'group' as const,
                        unreadCount: 3,
                        lastMessage: {
                            content: 'Assessment criteria updated',
                            timestamp: '11:15 AM'
                        }
                    },
                    {
                        id: 'cs-20-leader',
                        name: 'CS-20 Team Leader',
                        type: 'direct' as const,
                        unreadCount: 0,
                        lastMessage: {
                            content: 'Progress report submitted',
                            timestamp: 'Yesterday'
                        }
                    }
                ];

            case 'sdgp_administrator':
                return [
                    {
                        id: 'admin-lecturer',
                        name: 'Lecturers Group',
                        type: 'group' as const,
                        unreadCount: 1,
                        lastMessage: {
                            content: 'Viva schedule updated',
                            timestamp: '9:00 AM'
                        }
                    },
                    {
                        id: 'group-leaders-admin',
                        name: 'Group Leaders',
                        type: 'group' as const,
                        unreadCount: 2,
                        lastMessage: {
                            content: 'Submission deadline query',
                            timestamp: '3:30 PM'
                        }
                    }
                ];

            default:
                return [];
        }
    };

    const [chats] = React.useState(getAvailableChats());
    const [messages, setMessages] = React.useState<Record<string, any[]>>({});

    const handleSendMessage = (chatId: string, content: string, attachments?: File[]) => {
        const newMessage = {
            id: Date.now().toString(),
            senderId: userId,
            senderName: userName,
            content,
            timestamp: new Date().toLocaleTimeString(),
            attachments: attachments ? attachments.map(file => URL.createObjectURL(file)) : undefined
        };

        setMessages(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), newMessage]
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
                <div className="lg:col-span-1">
                    <ChatList
                        chats={chats}
                        selectedChatId={selectedChatId}
                        onSelectChat={setSelectedChatId}
                    />
                </div>
                <div className="lg:col-span-2">
                    {selectedChatId ? (
                        <ChatWindow
                            chatId={selectedChatId}
                            chatName={chats.find(c => c.id === selectedChatId)?.name || ''}
                            messages={messages[selectedChatId] || []}
                            onSendMessage={(content, attachments) => handleSendMessage(selectedChatId, content, attachments)}
                            currentUserId={userId}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-white rounded-lg shadow">
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <MessageSquare className="w-16 h-16 text-gray-400" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No chat selected</h3>
                                <p className="mt-2 text-gray-500">Choose a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}