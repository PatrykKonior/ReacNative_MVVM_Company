import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNotifications } from '@/contexts/notificationsContext';

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
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState<Task | null>(null);

    const { addNotification } = useNotifications();

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
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setFormState(task);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!formState) return;

        try {
            await apiClient.put(`/tasks/${formState.taskID}`, formState);
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.taskID === formState.taskID ? { ...formState } : t))
            );

            addNotification(
                'edit',
                `Updated Task: ${formState.taskName}`,
                '/tasks/viewAllTasks'
            );

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Task updated successfully!`,
                position: 'top',
                visibilityTime: 4000,
            });

            setModalVisible(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to update Task. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };


    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/tasks/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.taskID !== id));

            addNotification(
                'delete',
                `Deleted Task ID: ${id}`,
                '/tasks/viewAllTasks'
            );

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Deleted Task ID: ${id}`,
                position: 'top',
                visibilityTime: 4000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete Task. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    const handleInputChange = (field: keyof Task, value: string) => {
        if (formState) {
            setFormState({
                ...formState,
                [field]: field === 'estimatedHours' ? Number(value) : value,
            });
        }
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{item.taskName}</Text>
                <Text style={styles.taskDescription}>{item.taskDescription}</Text>
                <Text style={styles.taskStatus}>Status: {item.taskStatus}</Text>
                <Text style={styles.taskHours}>Estimated Hours: {item.estimatedHours || '0'}</Text>
                <Text style={styles.details}>Project ID: {item.projectID || 'N/A'}</Text>
                <Text style={styles.details}>Assigned Employee ID: {item.assignedEmployeeID || 'N/A'}</Text>
                <Text style={styles.details}>
                    Start Date: {item.taskStartDate ? item.taskStartDate.split('T')[0] : 'N/A'}
                </Text>
                <Text style={styles.details}>
                    End Date: {item.taskEndDate ? item.taskEndDate.split('T')[0] : 'N/A'}
                </Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
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
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Task</Text>
                        {formState && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Task Name"
                                    value={formState.taskName}
                                    onChangeText={(text) => handleInputChange('taskName', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Task Description"
                                    value={formState.taskDescription}
                                    onChangeText={(text) =>
                                        handleInputChange('taskDescription', text)
                                    }
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Status"
                                    value={formState.taskStatus}
                                    onChangeText={(text) => handleInputChange('taskStatus', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Estimated Hours"
                                    value={formState.estimatedHours?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) =>
                                        handleInputChange('estimatedHours', text)
                                    }
                                />
                                <View style={styles.modalActions}>
                                    <Button
                                        title="Cancel"
                                        color="#8B0000"
                                        onPress={() => setModalVisible(false)}
                                    />
                                    <Button title="Save" onPress={handleSave} />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
    details: {
        fontSize: 14,
        color: '#0D0D0D',
        marginTop: 5,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
