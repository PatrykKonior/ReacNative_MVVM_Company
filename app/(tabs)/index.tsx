import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomePage() {
    type RoutePaths =
        "/clients" |
        "/projects" |
        "/employees" |
        "/departments" |
        "/invoices" |
        "/materials" |
        "/Tasks" |
        "/timeLogs" |
        "/settings" |
        "/sale" |
        "/payments" |
        "/notifications";

    const router = useRouter(); // Inicjalizacja routera

    // Funkcja do nawigacji
    const navigateTo = (route: string) => {
        router.push(route); // Bez błędu
    };

    const renderTile = (
        title: string,
        subtitle: string,
        backgroundColor: string,
        circleColor: string,
        iconName: string,
        IconComponent: any,
        route: RoutePaths
    ) => (
        <TouchableOpacity
            style={[styles.tile, { backgroundColor }]}
            onPress={() => navigateTo(route)} // Obsługa kliknięcia
        >
            <View style={[styles.circle, { backgroundColor: circleColor }]}>
                <IconComponent name={iconName} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.tileTitle}>{title}</Text>
            <Text style={styles.tileSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.greeting}>Hello Patryk!</Text>

            {/* 1 rząd */}
            <View style={styles.row}>
                {renderTile(
                    'Notifications',
                    'Check your notifications',
                    '#EBF2EB',
                    '#0D2618',
                    'notifications',
                    MaterialIcons,
                    '/notifications'
                )}
                {renderTile(
                    'Messages',
                    'Check new messages',
                    '#EBF2EB',
                    '#465954',
                    'message',
                    MaterialIcons,
                    '/invoices' // DO NAPRAWY
                )}
                {renderTile(
                    'Announcements',
                    'Go to announcements',
                    '#EBF2EB',
                    '#BBBFB4',
                    'announcement',
                    MaterialIcons,
                    '/invoices' // DO NAPRAWY
                )}
            </View>

            {/* belunia */}
            <View style={styles.sectionDivider}>
                <Text style={styles.sectionText}>Quick Access</Text>
            </View>

            {/* 2 rząd */}
            <View style={styles.row}>
                {renderTile(
                    'Invoices',
                    'Menage Your Invoices',
                    '#EBF2EB',
                    '#BBBFB4',
                    'file-invoice-dollar',
                    FontAwesome5,
                    '/invoices'
                )}
                {renderTile(
                    'Clients',
                    'Menage Your Clients',
                    '#EBF2EB',
                    '#465954',
                    'users',
                    FontAwesome5,
                    '/clients'
                )}
            </View>
            <View style={styles.row}>
                {renderTile(
                    'Projects',
                    'Your personal projects',
                    '#EBF2EB',
                    '#0D2618',
                    'briefcase',
                    FontAwesome5,
                    '/projects'
                )}
                {renderTile(
                    'Tasks',
                    'Check Your Tasks',
                    '#EBF2EB',
                    '#D9B4A7',
                    'tasks',
                    FontAwesome5,
                    '/Tasks'
                )}
            </View>

            <View style={styles.sectionDivider}>
                <Text style={styles.sectionText}>Announcements</Text>
            </View>

            {/* 3 Rzad */}
            <View style={styles.rowWide}>
                <View style={[styles.wideTile, { backgroundColor: '#465954' }]}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="construction" size={40} color="#FFFFFF" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.wideTileTitle}>Active Projects</Text>
                        <Text style={styles.wideTileSubtitle}>Count: 23</Text>
                    </View>
                </View>

                <View style={[styles.wideTile, { backgroundColor: '#465954' }]}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="users" size={40} color="#FFFFFF" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.wideTileTitle}>Number of Employees</Text>
                        <Text style={styles.wideTileSubtitle}>Count: 10</Text>
                    </View>
                </View>
            </View>

            <View style={styles.sectionDivider}>
                <Text style={styles.sectionText}>Deadlines</Text>
            </View>

            {/* 4 Rzad */}
            <View style={styles.rowWide}>
                <View style={[styles.wideTile, { backgroundColor: '#47634b' }]}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="file-invoice-dollar" size={40} color="#FFFFFF" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.wideTileTitle}>Unpaid Invoices</Text>
                        <Text style={styles.wideTileSubtitle}>Count: 15</Text>
                    </View>
                </View>

                <View style={[styles.wideTile, { backgroundColor: '#47634b' }]}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="date-range" size={40} color="#FFFFFF" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.wideTileTitle}>Upcoming Deadlines</Text>
                        <Text style={styles.wideTileSubtitle}>Count: 5</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0a0a0a',
        textAlign: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    tile: {
        flex: 1,
        height: 140, // Wyższe kafelki
        marginHorizontal: 5,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionDivider: {
        backgroundColor: '#575555',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 8,
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
        textAlign: 'center',
    },
    tileSubtitle: {
        fontSize: 14,
        color: '#0D0D0D',
        textAlign: 'center',
    },
    rowWide: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    wideTile: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 140,
        width: "auto",
        marginVertical: 10,
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#FFFFFF33',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 85,
        marginLeft: 40,
    },
    textContainer: {
        flex: 1,
    },
    wideTileTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    wideTileSubtitle: {
        fontSize: 14,
        color: '#FFFFFF',
    },
});
