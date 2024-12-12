import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Employee = {
    employeeID: number;
    firstName: string;
    lastName: string;
    position: string;
    phoneNumber: string;
    email: string;
    hireDate?: string;
    salary?: number;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Employee[]>('/employees');
            setEmployees(response.data);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while fetching employees'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        alert(`Edit Employee with ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/employees/${id}`);
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employeeID !== id));
            alert(`Deleted Employee with ID: ${id}`);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while deleting the employee'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        }
    };

    const renderItem = ({ item }: { item: Employee }) => (
        <View style={styles.employeeCard}>
            <View style={styles.employeeContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="user" size={24} color="#465954" />
                    <Text style={styles.employeeName}>
                        {item.firstName} {item.lastName}
                    </Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Position: {item.position}</Text>
                    <Text style={styles.details}>Phone: {item.phoneNumber}</Text>
                    <Text style={styles.details}>Email: {item.email}</Text>
                    <Text style={styles.details}>Hire Date: {item.hireDate || 'N/A'}</Text>
                    <Text style={styles.details}>Salary: ${item.salary?.toFixed(2) || 'N/A'}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.employeeID)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.employeeID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Employees</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={employees}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.employeeID.toString()}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    employeeContent: {
        flex: 1,
        marginRight: 10,
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
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginLeft: 15,
    },
});
