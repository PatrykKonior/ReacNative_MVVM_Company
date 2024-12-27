import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import NotificationItem from '../../components/notifications/NotificationsItem';
import { useNotifications } from '@/contexts/notificationsContext';

export default function NotificationsScreen() {
    const router = useRouter(); // Do obsługi powrotu
    const { notifications } = useNotifications();


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            {notifications.length > 0 ? ( // Sprawdź, czy są powiadomienia
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NotificationItem
                            notification={item}
                            onPress={() => console.log('Notification clicked')} // Placeholder na akcję
                        />
                    )}
                />
            ) : (
                <Text style={styles.noNotifications}>No notifications</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#465954',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    noNotifications: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});
