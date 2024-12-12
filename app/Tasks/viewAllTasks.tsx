import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Task = {
    taskID: number;
    taskName: string;
    taskDescription: string;
    taskStatus: string;
    estimatedHours: number | null;
    projectID?: number;
    assignedEmployeeID?: number;
    taskStartDate?: string;
    taskEndDate?: string;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Task[]>('/tasks');
            setTasks(response.data);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while fetching tasks'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        alert(`Edit Task with ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/tasks/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.taskID !== id));
            alert(`Deleted Task with ID: ${id}`);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while deleting the task'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        }
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{item.taskName}</Text>
                <Text style={styles.taskDescription}>{item.taskDescription}</Text>
                <Text style={styles.taskStatus}>Status: {item.taskStatus}</Text>
                <Text style={styles.taskHours}>Estimated Hours: {item.estimatedHours || '0'}</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.taskID)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.taskID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Tasks</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={tasks}
                    renderItem={renderTaskItem}
                    keyExtractor={(item) => item.taskID.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
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
