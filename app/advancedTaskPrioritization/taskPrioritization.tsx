import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Pie, Bar } from 'react-chartjs-2';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Mock dane (do testów - później zastąpimy danymi z API)
const mockTasks = [
    { status: 'Completed', hours: 160 },
    { status: 'In Progress', hours: 120 },
    { status: 'Delayed', hours: 80 },
];

const mockEmployees = [
    { name: 'Marek Kowalski', hours: 160 },
    { name: 'Ewa Nowak', hours: 80 },
    { name: 'Piotr Wiśniewski', hours: 120 },
];

type TaskGroup = {
    title: string;
    hours: number;
    status: string;
    assigned: string;
};

// Dane dla grup
const mockGroups: {
    shortTerm: TaskGroup[];
    mediumTerm: TaskGroup[];
    longTerm: TaskGroup[];
} = {
    shortTerm: [
        { title: 'Spotkanie z kierownikiem', hours: 16, status: 'In Progress', assigned: 'Piotr' },
    ],
    mediumTerm: [
        { title: 'Renowacja elewacji', hours: 120, status: 'In Progress', assigned: 'Marek' },
    ],
    longTerm: [
        { title: 'Inwentaryzacja budynku', hours: 30, status: 'In Progress', assigned: 'Patryk' },
    ],
};

// Analytics dane
const analytics = {
    averageDuration: 75,
    longestTask: { name: 'Wykonanie fundamentów', hours: 160 },
    shortestTask: { name: 'Spotkanie z kierownikiem', hours: 16 },
    avgHoursPerEmployee: 80,
};

// Legenda
const legendOptions = {
    plugins: {
        legend: {
            position: 'bottom' as const, // Poprawiony typ
            labels: {
                boxWidth: 15,
                padding: 15,
                font: {
                    size: 14,
                    weight: 'bold',
                },
                color: '#023059',
            },
        },
    },
};

export default function TaskPrioritization() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false); // Testowe dane
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#023059" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Task Prioritization</Text>

            {/* Wykres kołowy */}
            <Text style={styles.chartTitle}>Task Status Overview</Text>
            <View style={styles.chartContainer}>
                <Pie
                    data={{
                        labels: ['Completed', 'In Progress', 'Delayed'],
                        datasets: [
                            {
                                data: mockTasks.map((task) => task.hours),
                                backgroundColor: ['#023059', '#355679', '#96a7bb'],
                                borderColor: '#FFFFFF',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={legendOptions}
                />
            </View>

            {/* Wykres słupkowy */}
            <Text style={styles.chartTitle}>Employee Workload</Text>
            <View style={styles.chartContainer}>
                <Bar
                    data={{
                        labels: mockEmployees.map((e) => e.name),
                        datasets: [
                            {
                                label: 'Hours Assigned',
                                data: mockEmployees.map((e) => e.hours),
                                backgroundColor: '#355679',
                                borderColor: '#FFFFFF',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={legendOptions}
                />
            </View>

            {/* Grupy priorytetów */}
            <Text style={styles.sectionTitle}>Task Groups</Text>
            <View>
                {Object.entries(mockGroups).map(([groupKey, tasks], idx) => (
                    <View
                        key={groupKey}
                        style={[
                            styles.priorityGroupContainer,
                            idx === 0
                                ? styles.shortTerm
                                : idx === 1
                                    ? styles.mediumTerm
                                    : styles.longTerm,
                        ]}
                    >
                        <Text style={styles.groupTitle}>
                            {groupKey === 'shortTerm'
                                ? 'Short Term (0-7 days)'
                                : groupKey === 'mediumTerm'
                                    ? 'Medium Term (8-30 days)'
                                    : 'Long Term (>30 days)'}
                        </Text>
                        {tasks.map((task, index) => (
                            <View key={index} style={styles.taskContainer}>
                                <FontAwesome5 name="tasks" size={16} color="#023059" style={{ marginRight: 10 }} />
                                <View>
                                    <Text style={styles.taskTitle}>{task.title}</Text>
                                    <Text style={styles.taskSubtitle}>{task.hours}h</Text>
                                    <Text style={styles.taskSubtitle}>{task.status}</Text>
                                    <Text style={styles.taskSubtitle}>{task.assigned}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            {/* Analytics */}
            <Text style={styles.analysisTitle}>Analytics</Text>
            <View style={styles.analysisContainer}>
                <Text style={styles.analysisItem}>
                    <FontAwesome5 name="clock" size={16} color="#011a34" /> Avg Duration: {analytics.averageDuration}h
                </Text>
                <Text style={styles.analysisItem}>
                    <FontAwesome5 name="arrow-up" size={16} color="#011a34" /> Longest Task: {analytics.longestTask.name} ({analytics.longestTask.hours}h)
                </Text>
                <Text style={styles.analysisItem}>
                    <FontAwesome5 name="arrow-down" size={16} color="#011a34" /> Shortest Task: {analytics.shortestTask.name} ({analytics.shortestTask.hours}h)
                </Text>
            </View>
        </ScrollView>
    );
}

// Style
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#023059',
    },
    chartContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#023059',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#023059',
    },
    priorityGroupContainer: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
    },
    shortTerm: {
        backgroundColor: '#96a7bb', // Jasny odcień dla krótkoterminowych
    },
    mediumTerm: {
        backgroundColor: '#355679', // Średni odcień dla średnioterminowych
    },
    longTerm: {
        backgroundColor: '#023059', // Najciemniejszy odcień dla długoterminowych
    },
    taskRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        borderRadius: 8,
        backgroundColor: 'rgba(202,198,198,0.68)', // Tło dla pojedynczego zadania
    },
    taskText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF', // Biały tekst dla kontrastu
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
        marginBottom: 10,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#023059',
    },
    taskSubtitle: {
        fontSize: 14,
        color: '#011a34',
    },
    analysisTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#023059',
    },
    analysisContainer: {
        padding: 10,
        backgroundColor: '#355679',
        borderRadius: 8,
    },
    analysisItem: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
