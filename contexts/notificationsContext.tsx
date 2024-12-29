import React, { createContext, useContext, useState } from 'react';

interface Notification {
    id: string;
    type: 'add' | 'edit' | 'delete';
    message: string;
    time: string;
    route: string;
}

interface NotificationsContextType {
    notifications: Notification[];
    addNotification: (type: 'add' | 'edit' | 'delete', message: string, route: string) => void;
    removeNotification: (id: string) => void;
    clearAllNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (type: 'add' | 'edit' | 'delete', message: string, route: string) => {
        const newNotification: Notification = {
            id: Date.now().toString(),
            type,
            message,
            time: new Date().toISOString(),
            route,
        };
        setNotifications((prev) => [newNotification, ...prev]);
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    const clearAllNotifications = () => {
        setNotifications([]); // Usuwam wszystkie powiadomienia
    };

    return (
        <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification, clearAllNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};
