import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TimeLogsIndex() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Time Logs Management</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/timeLogs/addTimeLog')}
            >
                <Text style={styles.buttonText}>Add New Time Log</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/timeLogs/viewAllTimeLogs')}
            >
                <Text style={styles.buttonText}>View All Time Logs</Text>
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
