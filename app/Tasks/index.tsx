import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TasksIndex() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tasks Management</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/Tasks/addTask')}
            >
                <Text style={styles.buttonText}>Add New Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/Tasks/viewAllTasks')}
            >
                <Text style={styles.buttonText}>View All Tasks</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#465954',
    },
    button: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
