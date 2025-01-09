import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskStatusPieChart from '@/components/taskPrioritization/Charts/TaskStatusPieChart';
import EmployeeLoadBarChart from '@/components/taskPrioritization/Charts/EmployeeLoadBarChart';
import PriorityTaskList from '@/components/taskPrioritization/Lists/PriorityTaskList';
import TaskAnalytics from '@/components/taskPrioritization/Analytics/TaskAnalytics';

export default function TaskPrioritization() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Nagłówek */}
            <Text style={styles.title}>Task Prioritization</Text>

            {/* Wykres kołowy – Status zadań */}
            <View style={styles.section}>
                <TaskStatusPieChart />
            </View>

            {/* Wykres słupkowy – Obciążenie pracowników */}
            <View style={styles.section}>
                <EmployeeLoadBarChart />
            </View>

            {/* Lista priorytetów */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Priority Tasks</Text>
                <PriorityTaskList />
            </View>

            {/* Sekcja analityczna */}
            <View style={styles.section}>
                <TaskAnalytics />
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#023059',
    },
    section: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#023059',
    },
});
