import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import NotificationItem from '../../components/notifications/NotificationsItem';

interface Notification {
    id: string;
    type: 'add' | 'edit' | 'delete';
    message: string;
}

export default function NotificationsScreen() {
    const router = useRouter(); // Do obsługi powrotu
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', type: 'add', message: 'Added a new project: Project A' },
        { id: '2', type: 'edit', message: 'Edited project: Project B' },
        { id: '3', type: 'delete', message: 'Deleted project: Project C' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationItem notification={item} />}
            />
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
});
