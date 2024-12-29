import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function MessagesScreen() {
    const router = useRouter(); // Router do nawigacji

    // Wiadomości – obecnie puste
    const [messages, setMessages] = useState([]); // Pusta lista wiadomości

    // Funkcja czyszcząca wszystkie wiadomości
    const clearAllMessages = () => {
        setMessages([]); // Wyczyść listę
        Toast.show({
            type: 'success',
            text1: 'Messages Cleared',
            text2: 'All messages have been cleared.',
            position: 'top',
            visibilityTime: 3000,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Messages</Text>

            {messages.length > 0 ? (
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.messageItem}>
                            <Text style={styles.messageText}>{item}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noMessages}>No messages available</Text>
            )}

            <TouchableOpacity style={styles.clearButton} onPress={clearAllMessages}>
                <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            {/* tutaj będzie Toast powiadomień */}
            <Toast />
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
        textAlign: 'center',
    },
    noMessages: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
    messageItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#EBF2EB',
        borderRadius: 8,
    },
    messageText: {
        fontSize: 14,
        color: '#0D0D0D',
    },
    clearButton: {
        marginTop: 20,
        backgroundColor: '#8C0E03',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#465954',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
