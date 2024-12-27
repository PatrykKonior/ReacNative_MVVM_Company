import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const formatTime = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);

    const diffMs = now.getTime() - date.getTime(); // Różnica w milisekundach
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} min. ago`;
    if (diffHours < 3) return `${diffHours} h. ago`;

    const formattedDate = date.toLocaleDateString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });

    return formattedDate;
};

interface Notification {
    id: string;
    type: 'add' | 'edit' | 'delete';
    message: string;
    time: string;
}

interface Props {
    notification: Notification;
    onPress: () => void;
}

const NotificationItem: React.FC<Props> = ({ notification, onPress }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'add':
                return <MaterialIcons name="add-circle" size={32} color="green" />;
            case 'edit':
                return <MaterialIcons name="edit" size={32} color="orange" />;
            case 'delete':
                return <MaterialIcons name="delete" size={32} color="red" />;
            default:
                return null;
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.iconContainer}>{getIcon()}</View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{notification.message}</Text>
                <Text style={styles.subtitle}>{formatTime(notification.time)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#ECECEC',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    iconContainer: {
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        position: 'absolute',
        top: 0,
        right: 5,
    },
});

export default NotificationItem;