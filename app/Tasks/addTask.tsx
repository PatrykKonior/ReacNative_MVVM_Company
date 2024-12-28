import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useNotifications } from '@/contexts/notificationsContext';

export default function AddTask() {
    const [task, setTask] = useState({
        TaskName: '',
        TaskDescription: '',
        ProjectID: '',
        AssignedEmployeeID: '',
        TaskStartDate: '',
        TaskEndDate: '',
        EstimatedHours: '',
        TaskStatus: '',
    });

    const [errors, setErrors] = useState({
        TaskName: '',
        TaskDescription: '',
        ProjectID: '',
        AssignedEmployeeID: '',
        TaskStartDate: '',
        TaskEndDate: '',
        EstimatedHours: '',
        TaskStatus: '',
    });

    const { addNotification } = useNotifications();

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setTask({ ...task, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (!task.TaskName.trim()) newErrors.TaskName = 'Task Name is required';
        if (!task.TaskDescription.trim()) newErrors.TaskDescription = 'Task Description is required';
        if (!task.ProjectID.trim()) newErrors.ProjectID = 'Project ID is required';
        if (!task.AssignedEmployeeID.trim()) newErrors.AssignedEmployeeID = 'Assigned Employee ID is required';
        if (!task.TaskStartDate.trim()) newErrors.TaskStartDate = 'Start Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(task.TaskStartDate))
            newErrors.TaskStartDate = 'Start Date must be in YYYY-MM-DD format';
        if (!task.TaskEndDate.trim()) newErrors.TaskEndDate = 'End Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(task.TaskEndDate))
            newErrors.TaskEndDate = 'End Date must be in YYYY-MM-DD format';
        if (!task.EstimatedHours.trim()) newErrors.EstimatedHours = 'Estimated Hours is required';
        if (isNaN(Number(task.EstimatedHours))) newErrors.EstimatedHours = 'Estimated Hours must be a number';
        if (!task.TaskStatus.trim()) newErrors.TaskStatus = 'Task Status is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddTask = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/tasks', {
                TaskName: task.TaskName,
                TaskDescription: task.TaskDescription,
                ProjectID: Number(task.ProjectID),
                AssignedEmployeeID: Number(task.AssignedEmployeeID),
                TaskStartDate: task.TaskStartDate,
                TaskEndDate: task.TaskEndDate,
                EstimatedHours: Number(task.EstimatedHours),
                TaskStatus: task.TaskStatus,
            });

            addNotification(
                'add',
                `Added new Task: ${task.TaskName}`,
                '/tasks/addTask'
            );

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Task added successfully 🚀',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastSuccess,
                },
            });

            setTask({
                TaskName: '',
                TaskDescription: '',
                ProjectID: '',
                AssignedEmployeeID: '',
                TaskStartDate: '',
                TaskEndDate: '',
                EstimatedHours: '',
                TaskStatus: '',
            });
        } catch (error) {
            console.error('Error adding task:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to add Task. Try again.',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastError,
                },
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Task</Text>

            <TextInput
                placeholder="Task Name"
                style={[styles.input, errors.TaskName ? styles.errorBorder : null]}
                value={task.TaskName}
                onChangeText={(text) => handleInputChange('TaskName', text)}
            />
            {errors.TaskName && <Text style={styles.errorText}>{errors.TaskName}</Text>}

            <TextInput
                placeholder="Task Description"
                style={[styles.input, styles.multiline, errors.TaskDescription ? styles.errorBorder : null]}
                value={task.TaskDescription}
                multiline
                onChangeText={(text) => handleInputChange('TaskDescription', text)}
            />
            {errors.TaskDescription && <Text style={styles.errorText}>{errors.TaskDescription}</Text>}

            <TextInput
                placeholder="Project ID"
                style={[styles.input, errors.ProjectID ? styles.errorBorder : null]}
                value={task.ProjectID}
                onChangeText={(text) => handleInputChange('ProjectID', text)}
            />
            {errors.ProjectID && <Text style={styles.errorText}>{errors.ProjectID}</Text>}

            <TextInput
                placeholder="Assigned Employee ID"
                style={[styles.input, errors.AssignedEmployeeID ? styles.errorBorder : null]}
                value={task.AssignedEmployeeID}
                onChangeText={(text) => handleInputChange('AssignedEmployeeID', text)}
            />
            {errors.AssignedEmployeeID && <Text style={styles.errorText}>{errors.AssignedEmployeeID}</Text>}

            <TextInput
                placeholder="Start Date (YYYY-MM-DD)"
                style={[styles.input, errors.TaskStartDate ? styles.errorBorder : null]}
                value={task.TaskStartDate}
                onChangeText={(text) => handleInputChange('TaskStartDate', text)}
            />
            {errors.TaskStartDate && <Text style={styles.errorText}>{errors.TaskStartDate}</Text>}

            <TextInput
                placeholder="End Date (YYYY-MM-DD)"
                style={[styles.input, errors.TaskEndDate ? styles.errorBorder : null]}
                value={task.TaskEndDate}
                onChangeText={(text) => handleInputChange('TaskEndDate', text)}
            />
            {errors.TaskEndDate && <Text style={styles.errorText}>{errors.TaskEndDate}</Text>}

            <TextInput
                placeholder="Estimated Hours"
                style={[styles.input, errors.EstimatedHours ? styles.errorBorder : null]}
                value={task.EstimatedHours}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('EstimatedHours', text)}
            />
            {errors.EstimatedHours && <Text style={styles.errorText}>{errors.EstimatedHours}</Text>}

            <TextInput
                placeholder="Task Status"
                style={[styles.input, errors.TaskStatus ? styles.errorBorder : null]}
                value={task.TaskStatus}
                onChangeText={(text) => handleInputChange('TaskStatus', text)}
            />
            {errors.TaskStatus && <Text style={styles.errorText}>{errors.TaskStatus}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>

            <Toast />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#465954',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#F9F9F9',
    },
    multiline: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#F20505',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    errorBorder: {
        borderColor: '#F20505',
    },
    toastSuccess: {
        backgroundColor: '#465954',
        borderRadius: 10,
        padding: 15,
        width: '90%',
    },
    toastError: {
        backgroundColor: '#8B0000',
        borderRadius: 10,
        padding: 15,
        width: '90%',
    },
});
