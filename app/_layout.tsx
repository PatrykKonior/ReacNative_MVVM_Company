import React from 'react';
import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import { NotificationsProvider } from '@/contexts/notificationsContext';

export default function RootLayout() {
    return (
        <NotificationsProvider>
            <>
                <Slot />
                <Toast />
            </>
        </NotificationsProvider>
    );
}
