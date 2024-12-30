import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNotifications } from '@/contexts/notificationsContext';
import axios from 'axios';

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
        "/notifications" |
        "/messages" |
    "/announcements";

    const router = useRouter(); // Inicjalizacja routera

    const { notifications } = useNotifications(); // LISTA POWIADOMIEŃ
    const [activeProjectsCount, setActiveProjectsCount] = useState<number>(0);
    const [employeesCount, setEmployeesCount] = useState<number>(0);
    const [unpaidInvoicesCount, setUnpaidInvoicesCount] = useState<number>(0);
    const [upcomingDeadlinesCount, setUpcomingDeadlinesCount] = useState<number>(0);

    // Funkcja do nawigacji
    const navigateTo = (route: RoutePaths) => {
        router.push(route as never);
    };

    // Pobranie liczby aktywnych projektów
    const fetchActiveProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5069/api/Projects');
            const projects = response.data;

            // Filtrujemy projekty, które NIE są zakończone
            const activeProjects = projects.filter(
                (project: { projectStatus: string }) =>
                    project.projectStatus !== 'Zakończony' &&
                    project.projectStatus !== 'zakończony' &&
                    project.projectStatus !== 'Zakonczony' &&
                    project.projectStatus !== 'zakonczony'
            );

            setActiveProjectsCount(activeProjects.length);
        } catch (error) {
            console.error('Error fetching active projects:', error);
        }
    };

    // Pobranie liczby pracowników
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5069/api/Employees');
            setEmployeesCount(response.data.length); // Liczba pracowników
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Liczba nieopłaconych faktur
    const fetchUnpaidInvoices = async () => {
        try {
            const response = await axios.get('http://localhost:5069/api/Invoices');
            const invoices = response.data;

            const unpaidInvoices = invoices.filter(
                (invoice: { invoiceStatus: string }) =>
                    invoice.invoiceStatus.toLowerCase() !== 'opłacona' // Sprawdzamy status
            );

            setUnpaidInvoicesCount(unpaidInvoices.length); // Ustawiamy stan
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    // Pobranie zadań z nadchodzącymi terminami
    const fetchUpcomingDeadlines = async () => {
        try {
            const response = await axios.get('http://localhost:5069/api/tasks');
            const tasks = response.data;

            // Aktualna data
            const today = new Date();

            const upcomingDeadlines = tasks.filter((task: { taskStatus: string; taskEndDate?: string }) => {
                const taskEndDate = task.taskEndDate ? new Date(task.taskEndDate) : null;

                return (
                    // Zadania tylko w trakcie
                    task.taskStatus === 'W trakcie' &&
                    // Termin jeszcze nie minął LUB jest przeterminowane, ale nadal w toku
                    (taskEndDate && (taskEndDate >= today || taskEndDate < today))
                );
            });

            setUpcomingDeadlinesCount(upcomingDeadlines.length);
        } catch (error) {
            console.error('Error fetching upcoming deadlines:', error);
        }
    };

    useEffect(() => {
        fetchActiveProjects();
        fetchEmployees();
        fetchUnpaidInvoices();
        fetchUpcomingDeadlines();
    }, []);


    const renderTile = (
        title: string,
        subtitle: string,
        backgroundColor: string,
        circleColor: string,
        iconName: string,
        IconComponent: any,
        route: RoutePaths,
        badgeCount?: number
    ) => (
        <TouchableOpacity
            style={[styles.tile, { backgroundColor }]}
            onPress={() => navigateTo(route)} // Obsługa kliknięcia
        >
            <View style={[styles.circle, { backgroundColor: circleColor }]}>
                <IconComponent name={iconName} size={24} color="#FFFFFF" />
                {badgeCount !== undefined && badgeCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badgeCount}</Text>
                    </View>
                )}
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
                    '/notifications',
                    notifications.length
                )}
                {renderTile(
                    'Messages',
                    'Check new messages',
                    '#EBF2EB',
                    '#465954',
                    'message',
                    MaterialIcons,
                    '/messages',
                    0
                )}
                {renderTile(
                    'Announcements',
                    'Go to announcements',
                    '#EBF2EB',
                    '#BBBFB4',
                    'announcement',
                    MaterialIcons,
                    '/announcements',
                    1,
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
                        <Text style={styles.wideTileSubtitle}>Count: {activeProjectsCount}</Text>
                    </View>
                </View>

                <View style={[styles.wideTile, { backgroundColor: '#465954' }]}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="users" size={40} color="#FFFFFF" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.wideTileTitle}>Number of Employees</Text>
                        <Text style={styles.wideTileSubtitle}>Count: {employeesCount}</Text>
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
                        <Text style={styles.wideTileSubtitle}>Count: {unpaidInvoicesCount}</Text>
                    </View>
                </View>

                <View style={[styles.wideTile, { backgroundColor: '#47634b' }]}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="date-range" size={40} color="#FFFFFF" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.wideTileTitle}>Upcoming Deadlines</Text>
                        <Text style={styles.wideTileSubtitle}>Count: {upcomingDeadlinesCount}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -8,
        top: -8,
        backgroundColor: '#8C0E03',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF', // Obramowanie
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
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
