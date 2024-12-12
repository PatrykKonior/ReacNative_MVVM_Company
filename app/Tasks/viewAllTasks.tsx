import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mockTasks = [
    {
        TaskID: '1',
        TaskName: 'Design Wireframes',
        TaskDescription: 'Create wireframes for the mobile app',
        TaskStatus: 'In Progress',
        EstimatedHours: '15',
    },
    {
        TaskID: '2',
        TaskName: 'Develop Backend',
        TaskDescription: 'Develop APIs for user authentication',
        TaskStatus: 'Pending',
        EstimatedHours: '30',
    },
];

export default function ViewAllTasks() {
    const renderTaskItem = ({ item }: { item: typeof mockTasks[0] }) => (
        <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.TaskName}</Text>
            <Text style={styles.taskDescription}>{item.TaskDescription}</Text>
            <Text style={styles.taskStatus}>Status: {item.TaskStatus}</Text>
            <Text style={styles.taskHours}>Estimated Hours: {item.EstimatedHours}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Tasks</Text>
            <FlatList
                data={mockTasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.TaskID}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#465954',
        textAlign: 'center',
    },
    listContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    taskCard: {
        backgroundColor: '#EBF2EB',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    taskDescription: {
        fontSize: 14,
        color: '#465954',
        marginTop: 5,
    },
    taskStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F20505',
        marginTop: 10,
    },
    taskHours: {
        fontSize: 14,
        color: '#0D0D0D',
        marginTop: 5,
    },
});
