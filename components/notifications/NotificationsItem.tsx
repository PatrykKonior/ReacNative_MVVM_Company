import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Notification {
    id: string;
    type: 'add' | 'edit' | 'delete';
    message: string;
}

interface Props {
    notification: Notification;
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'add':
                return <MaterialIcons name="add-circle" size={24} color="green" />;
            case 'edit':
                return <MaterialIcons name="edit" size={24} color="orange" />;
            case 'delete':
                return <MaterialIcons name="delete" size={24} color="red" />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {getIcon()}
            <Text style={styles.message}>{notification.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    message: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default NotificationItem;
