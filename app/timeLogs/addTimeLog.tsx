import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function AddTimeLog() {
    const [timeLog, setTimeLog] = useState({
        EmployeeID: '',
        ProjectID: '',
        LogDate: '',
        HoursWorked: '',
        HourlyRate: '',
        TotalAmount: '',
    });

    const [errors, setErrors] = useState({
        EmployeeID: '',
        ProjectID: '',
        LogDate: '',
        HoursWorked: '',
        HourlyRate: '',
        TotalAmount: '',
    });

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setTimeLog({ ...timeLog, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (!timeLog.EmployeeID.trim()) newErrors.EmployeeID = 'Employee ID is required';
        if (!timeLog.ProjectID.trim()) newErrors.ProjectID = 'Project ID is required';
        if (!timeLog.LogDate.trim()) newErrors.LogDate = 'Log Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(timeLog.LogDate)) newErrors.LogDate = 'Log Date must be in YYYY-MM-DD format';
        if (!timeLog.HoursWorked.trim()) newErrors.HoursWorked = 'Hours Worked is required';
        if (isNaN(Number(timeLog.HoursWorked))) newErrors.HoursWorked = 'Hours Worked must be a number';
        if (!timeLog.HourlyRate.trim()) newErrors.HourlyRate = 'Hourly Rate is required';
        if (isNaN(Number(timeLog.HourlyRate))) newErrors.HourlyRate = 'Hourly Rate must be a number';
        if (!timeLog.TotalAmount.trim()) newErrors.TotalAmount = 'Total Amount is required';
        if (isNaN(Number(timeLog.TotalAmount))) newErrors.TotalAmount = 'Total Amount must be a number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddTimeLog = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/timelogs', {
                EmployeeID: Number(timeLog.EmployeeID),
                ProjectID: Number(timeLog.ProjectID),
                LogDate: timeLog.LogDate,
                HoursWorked: Number(timeLog.HoursWorked),
                HourlyRate: Number(timeLog.HourlyRate),
                TotalAmount: Number(timeLog.TotalAmount),
            });

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Successfuully added Time Log 🚀',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastSuccess,
                },
            });

            setTimeLog({
                EmployeeID: '',
                ProjectID: '',
                LogDate: '',
                HoursWorked: '',
                HourlyRate: '',
                TotalAmount: '',
            });
        } catch (error) {
            console.error('Error adding time log:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not add Time Log. Try again. 🙁',
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
            <Text style={styles.title}>Add New Time Log</Text>

            <TextInput
                placeholder="Employee ID"
                style={[styles.input, errors.EmployeeID ? styles.errorBorder : null]}
                value={timeLog.EmployeeID}
                onChangeText={(text) => handleInputChange('EmployeeID', text)}
            />
            {errors.EmployeeID && <Text style={styles.errorText}>{errors.EmployeeID}</Text>}

            <TextInput
                placeholder="Project ID"
                style={[styles.input, errors.ProjectID ? styles.errorBorder : null]}
                value={timeLog.ProjectID}
                onChangeText={(text) => handleInputChange('ProjectID', text)}
            />
            {errors.ProjectID && <Text style={styles.errorText}>{errors.ProjectID}</Text>}

            <TextInput
                placeholder="Log Date (YYYY-MM-DD)"
                style={[styles.input, errors.LogDate ? styles.errorBorder : null]}
                value={timeLog.LogDate}
                onChangeText={(text) => handleInputChange('LogDate', text)}
            />
            {errors.LogDate && <Text style={styles.errorText}>{errors.LogDate}</Text>}

            <TextInput
                placeholder="Hours Worked"
                style={[styles.input, errors.HoursWorked ? styles.errorBorder : null]}
                value={timeLog.HoursWorked}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('HoursWorked', text)}
            />
            {errors.HoursWorked && <Text style={styles.errorText}>{errors.HoursWorked}</Text>}

            <TextInput
                placeholder="Hourly Rate"
                style={[styles.input, errors.HourlyRate ? styles.errorBorder : null]}
                value={timeLog.HourlyRate}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('HourlyRate', text)}
            />
            {errors.HourlyRate && <Text style={styles.errorText}>{errors.HourlyRate}</Text>}

            <TextInput
                placeholder="Total Amount"
                style={[styles.input, errors.TotalAmount ? styles.errorBorder : null]}
                value={timeLog.TotalAmount}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalAmount', text)}
            />
            {errors.TotalAmount && <Text style={styles.errorText}>{errors.TotalAmount}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleAddTimeLog}>
                <Text style={styles.buttonText}>Add Time Log</Text>
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
