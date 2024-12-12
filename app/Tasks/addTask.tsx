import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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

    const handleInputChange = (field: string, value: string) => {
        setTask({ ...task, [field]: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Task</Text>
            <TextInput
                placeholder="Task Name"
                style={styles.input}
                onChangeText={(text) => handleInputChange('TaskName', text)}
            />
            <TextInput
                placeholder="Task Description"
                style={[styles.input, styles.multiline]}
                multiline
                onChangeText={(text) => handleInputChange('TaskDescription', text)}
            />
            <TextInput
                placeholder="Project ID"
                style={styles.input}
                onChangeText={(text) => handleInputChange('ProjectID', text)}
            />
            <TextInput
                placeholder="Assigned Employee ID"
                style={styles.input}
                onChangeText={(text) => handleInputChange('AssignedEmployeeID', text)}
            />
            <TextInput
                placeholder="Start Date (YYYY-MM-DD)"
                style={styles.input}
                onChangeText={(text) => handleInputChange('TaskStartDate', text)}
            />
            <TextInput
                placeholder="End Date (YYYY-MM-DD)"
                style={styles.input}
                onChangeText={(text) => handleInputChange('TaskEndDate', text)}
            />
            <TextInput
                placeholder="Estimated Hours"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('EstimatedHours', text)}
            />
            <TextInput
                placeholder="Task Status"
                style={styles.input}
                onChangeText={(text) => handleInputChange('TaskStatus', text)}
            />
            <TouchableOpacity style={styles.button} onPress={() => alert('Task Added')}>
                <Text style={styles.buttonText}>Add Task</Text>
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
});
