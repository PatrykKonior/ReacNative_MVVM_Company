import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

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
    const handleEdit = (id: string) => {
        alert(`Edit task with ID: ${id}`);
    };

    const handleDelete = (id: string) => {
        alert(`Delete task with ID: ${id}`);
    };

    const renderTaskItem = ({ item }: { item: typeof mockTasks[0] }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{item.TaskName}</Text>
                <Text style={styles.taskDescription}>{item.TaskDescription}</Text>
                <Text style={styles.taskStatus}>Status: {item.TaskStatus}</Text>
                <Text style={styles.taskHours}>Estimated Hours: {item.EstimatedHours}</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.TaskID)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.TaskID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    taskContent: {
        flex: 1,
        marginRight: 10,
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
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginLeft: 15,
    },
});
