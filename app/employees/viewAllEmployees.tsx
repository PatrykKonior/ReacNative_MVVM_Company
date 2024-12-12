import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const mockEmployees = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Manager',
        phoneNumber: '123-456-789',
        email: 'john.doe@example.com',
        hireDate: '2020-01-01',
        salary: 5000,
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        position: 'Developer',
        phoneNumber: '987-654-321',
        email: 'jane.smith@example.com',
        hireDate: '2021-05-15',
        salary: 4000,
    },
];

export default function ViewAllEmployees() {
    const renderItem = ({ item }: { item: { [key: string]: any } }) => (
        <TouchableOpacity style={styles.employeeCard} onPress={() => alert(`Details for ${item.firstName} ${item.lastName}`)}>
            <View style={styles.cardHeader}>
                <FontAwesome5 name="user" size={24} color="#465954" />
                <Text style={styles.employeeName}>{item.firstName} {item.lastName}</Text>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.details}>Position: {item.position}</Text>
                <Text style={styles.details}>Phone: {item.phoneNumber}</Text>
                <Text style={styles.details}>Email: {item.email}</Text>
                <Text style={styles.details}>Hire Date: {item.hireDate}</Text>
                <Text style={styles.details}>Salary: ${item.salary}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Employees</Text>
            <FlatList
                data={mockEmployees}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#465954',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContainer: {
        paddingVertical: 10,
    },
    employeeCard: {
        backgroundColor: '#EBF2EB',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    employeeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
        marginLeft: 10,
    },
    cardDetails: {
        marginTop: 10,
    },
    details: {
        fontSize: 14,
        color: '#465954',
        marginBottom: 5,
    },
});
