import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNotifications } from '@/contexts/notificationsContext';
import axios from 'axios';

export default function AddEmployee() {
    const [employee, setEmployee] = useState({
        FirstName: '',
        LastName: '',
        Position: '',
        PhoneNumber: '',
        Email: '',
        HireDate: '',
        Salary: '',
    });

    const [errors, setErrors] = useState({
        FirstName: '',
        LastName: '',
        Position: '',
        PhoneNumber: '',
        Email: '',
        HireDate: '',
        Salary: '',
    });

    const { addNotification } = useNotifications();

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setEmployee({ ...employee, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (!employee.FirstName.trim()) newErrors.FirstName = 'First Name is required';
        if (!employee.LastName.trim()) newErrors.LastName = 'Last Name is required';
        if (!employee.Position.trim()) newErrors.Position = 'Position is required';
        if (!employee.PhoneNumber.trim()) newErrors.PhoneNumber = 'Phone Number is required';
        if (!/^\d{9,15}$/.test(employee.PhoneNumber)) newErrors.PhoneNumber = 'Invalid phone number format';
        if (!employee.Email.trim()) newErrors.Email = 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.Email)) newErrors.Email = 'Invalid email address';
        if (!employee.HireDate.trim()) newErrors.HireDate = 'Hire Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(employee.HireDate)) newErrors.HireDate = 'Hire Date must be in YYYY-MM-DD format';
        if (!employee.Salary.trim()) newErrors.Salary = 'Salary is required';
        if (isNaN(Number(employee.Salary))) newErrors.Salary = 'Salary must be a number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddEmployee = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/employees', {
                FirstName: employee.FirstName,
                LastName: employee.LastName,
                Position: employee.Position,
                PhoneNumber: employee.PhoneNumber,
                Email: employee.Email,
                HireDate: employee.HireDate,
                Salary: Number(employee.Salary),
            });

            addNotification('add', `Added Employee: ${employee.FirstName} ${employee.LastName}`, '/employees/addEmployee');

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Employee added successfully 🚀',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastSuccess,
                },
            });

            setEmployee({
                FirstName: '',
                LastName: '',
                Position: '',
                PhoneNumber: '',
                Email: '',
                HireDate: '',
                Salary: '',
            });
        } catch (error) {
            console.error('Error adding Employee:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not add Employee. Try again.',
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
            <Text style={styles.title}>Add New Employee</Text>

            <TextInput
                placeholder="First Name"
                style={[styles.input, errors.FirstName ? styles.errorBorder : null]}
                value={employee.FirstName}
                onChangeText={(text) => handleInputChange('FirstName', text)}
            />
            {errors.FirstName && <Text style={styles.errorText}>{errors.FirstName}</Text>}

            <TextInput
                placeholder="Last Name"
                style={[styles.input, errors.LastName ? styles.errorBorder : null]}
                value={employee.LastName}
                onChangeText={(text) => handleInputChange('LastName', text)}
            />
            {errors.LastName && <Text style={styles.errorText}>{errors.LastName}</Text>}

            <TextInput
                placeholder="Position"
                style={[styles.input, errors.Position ? styles.errorBorder : null]}
                value={employee.Position}
                onChangeText={(text) => handleInputChange('Position', text)}
            />
            {errors.Position && <Text style={styles.errorText}>{errors.Position}</Text>}

            <TextInput
                placeholder="Phone Number"
                style={[styles.input, errors.PhoneNumber ? styles.errorBorder : null]}
                value={employee.PhoneNumber}
                keyboardType="phone-pad"
                onChangeText={(text) => handleInputChange('PhoneNumber', text)}
            />
            {errors.PhoneNumber && <Text style={styles.errorText}>{errors.PhoneNumber}</Text>}

            <TextInput
                placeholder="Email"
                style={[styles.input, errors.Email ? styles.errorBorder : null]}
                value={employee.Email}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange('Email', text)}
            />
            {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}

            <TextInput
                placeholder="Hire Date (YYYY-MM-DD)"
                style={[styles.input, errors.HireDate ? styles.errorBorder : null]}
                value={employee.HireDate}
                onChangeText={(text) => handleInputChange('HireDate', text)}
            />
            {errors.HireDate && <Text style={styles.errorText}>{errors.HireDate}</Text>}

            <TextInput
                placeholder="Salary"
                style={[styles.input, errors.Salary ? styles.errorBorder : null]}
                value={employee.Salary}
                keyboardType="decimal-pad"
                onChangeText={(text) => handleInputChange('Salary', text)}
            />
            {errors.Salary && <Text style={styles.errorText}>{errors.Salary}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
                <Text style={styles.addButtonText}>Add Employee</Text>
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
