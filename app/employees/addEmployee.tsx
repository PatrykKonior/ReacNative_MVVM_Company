import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function AddEmployee() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Employee</Text>

            {/* Formularz */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#BBBFB4"
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#BBBFB4"
            />
            <TextInput
                style={styles.input}
                placeholder="Position"
                placeholderTextColor="#BBBFB4"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#BBBFB4"
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#BBBFB4"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Hire Date (YYYY-MM-DD)"
                placeholderTextColor="#BBBFB4"
            />
            <TextInput
                style={styles.input}
                placeholder="Salary"
                placeholderTextColor="#BBBFB4"
                keyboardType="decimal-pad"
            />

            {/* Przycisk dodawania */}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Employee</Text>
            </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#465954',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#BBBFB4',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#0D0D0D',
        backgroundColor: '#F9F9F9',
    },
    addButton: {
        backgroundColor: '#465954',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
