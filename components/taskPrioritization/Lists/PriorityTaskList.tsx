import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchTasks, processTasks } from '@/components/taskPrioritization/Functions/taskProcessing';

const PriorityTaskList = () => {
    const [taskGroups, setTaskGroups] = useState<{
        shortTerm: any[];
        mediumTerm: any[];
        longTerm: any[];
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const tasks = await fetchTasks();
                const processedTasks = processTasks(tasks);
                setTaskGroups(processedTasks.taskByDeadline);
            } catch (error) {
                console.error('Error fetching or processing tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#355679" />;
    }

    if (!taskGroups) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No tasks available.</Text>
                <Text style={styles.noDataSubText}>Please check your task data.</Text>
            </View>
        );
    }

    const renderTaskGroup = (title: string, tasks: any[]) => (
        <View style={styles.taskGroup} key={title}>
            <Text style={styles.taskGroupTitle}>{title}</Text>
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <View style={styles.taskCard} key={index}>
                        <Text style={styles.taskName}>{task.taskName}</Text>
                        <Text style={styles.taskDetails}>Status: {task.taskStatus}</Text>
                        <Text style={styles.taskDetails}>Hours: {task.estimatedHours}h</Text>
                        <Text style={styles.taskDetails}>Assigned To: {task.assignedEmployeeID || 'Unassigned'}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noTasksText}>No tasks in this category.</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderTaskGroup('Short Term (0-7 days)', taskGroups.shortTerm)}
            {renderTaskGroup('Medium Term (8-30 days)', taskGroups.mediumTerm)}
            {renderTaskGroup('Long Term (>30 days)', taskGroups.longTerm)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
    },
    taskGroup: {
        marginBottom: 20,
    },
    taskGroupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#011a34',
        marginBottom: 10,
    },
    taskCard: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#96a7bb',
        borderRadius: 8,
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#011a34',
    },
    taskDetails: {
        fontSize: 14,
        color: '#011a34',
    },
    noTasksText: {
        fontSize: 14,
        color: '#355679',
        fontStyle: 'italic',
    },
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#355679',
    },
    noDataSubText: {
        fontSize: 14,
        color: '#355679',
        marginTop: 5,
    },
});

export default PriorityTaskList;
