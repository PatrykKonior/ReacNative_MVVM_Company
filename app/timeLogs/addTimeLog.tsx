import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AddTimeLog() {
    const [timeLog, setTimeLog] = useState({
        EmployeeID: '',
        ProjectID: '',
        LogDate: '',
        HoursWorked: '',
        HourlyRate: '',
        TotalAmount: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setTimeLog({ ...timeLog, [field]: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Time Log</Text>
            <TextInput
                placeholder="Employee ID"
                style={styles.input}
                onChangeText={(text) => handleInputChange('EmployeeID', text)}
            />
            <TextInput
                placeholder="Project ID"
                style={styles.input}
                onChangeText={(text) => handleInputChange('ProjectID', text)}
            />
            <TextInput
                placeholder="Log Date (YYYY-MM-DD)"
                style={styles.input}
                onChangeText={(text) => handleInputChange('LogDate', text)}
            />
            <TextInput
                placeholder="Hours Worked"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('HoursWorked', text)}
            />
            <TextInput
                placeholder="Hourly Rate"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('HourlyRate', text)}
            />
            <TextInput
                placeholder="Total Amount"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalAmount', text)}
            />
            <TouchableOpacity style={styles.button} onPress={() => alert('Time Log Added')}>
                <Text style={styles.buttonText}>Add Time Log</Text>
            </TouchableOpacity>
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
});
