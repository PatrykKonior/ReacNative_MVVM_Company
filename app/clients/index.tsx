import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ClientsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clients</Text>
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => router.push('/clients/addClient')}
            >
                <Text style={styles.optionText}>Add New Client</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => router.push('/clients/viewAllClients')}
            >
                <Text style={styles.optionText}>View All Clients</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#465954',
    },
    optionButton: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    optionText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
