import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useNotifications } from '@/contexts/notificationsContext';

export default function AddDepartment() {
    const { addNotification } = useNotifications();
    const [department, setDepartment] = useState({
        DepartmentName: '',
        ManagerID: '',
    });

    const [errors, setErrors] = useState({
        DepartmentName: '',
        ManagerID: '',
    });

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setDepartment({ ...department, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (!department.DepartmentName.trim()) newErrors.DepartmentName = 'Department Name is required';
        if (!department.ManagerID.trim()) newErrors.ManagerID = 'Manager ID is required';
        if (isNaN(Number(department.ManagerID))) newErrors.ManagerID = 'Manager ID must be a number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddDepartment = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/departments', {
                DepartmentName: department.DepartmentName,
                ManagerID: Number(department.ManagerID),
            });

            addNotification('add', `Added Department: ${department.DepartmentName}`, '/departments/addDepartment');

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Department added successfully 🚀',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastSuccess,
                },
            });

            setDepartment({
                DepartmentName: '',
                ManagerID: '',
            });
        } catch (error) {
            console.error('Error adding department:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not add Department. Try again.',
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
            <Text style={styles.title}>Add New Department</Text>

            <TextInput
                placeholder="Department Name"
                style={[styles.input, errors.DepartmentName ? styles.errorBorder : null]}
                value={department.DepartmentName}
                onChangeText={(text) => handleInputChange('DepartmentName', text)}
            />
            {errors.DepartmentName && <Text style={styles.errorText}>{errors.DepartmentName}</Text>}

            <TextInput
                placeholder="Manager ID"
                style={[styles.input, errors.ManagerID ? styles.errorBorder : null]}
                value={department.ManagerID}
                keyboardType="number-pad"
                onChangeText={(text) => handleInputChange('ManagerID', text)}
            />
            {errors.ManagerID && <Text style={styles.errorText}>{errors.ManagerID}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleAddDepartment}>
                <Text style={styles.addButtonText}>Add Department</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#465954',
        marginBottom: 20,
        textAlign: 'center',
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
    addButton: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
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
