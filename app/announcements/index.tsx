import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AnnouncementsScreen() {
    const router = useRouter(); // POWROT

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Announcements</Text>

            <View style={styles.announcementContainer}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="campaign" size={40} color="#BB4444" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.announcementTitle}>
                        Upcoming Update!
                    </Text>
                    <Text style={styles.announcementMessage}>
                        A new version of the app will be available in early March. Stay tuned!
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.back()}
            >
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
        textAlign: 'center',
    },
    announcementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 15,
        backgroundColor: '#FAD2D2',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    announcementTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#BB4444',
    },
    announcementMessage: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
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
