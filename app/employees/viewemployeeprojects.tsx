import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

type Employee = {
    employeeID: number;
    firstName: string;
    lastName: string;
};

type Project = {
    projectID: number;
    projectName: string;
    projectType: string;
    projectStartDate?: string;
    projectEndDate?: string;
    projectStatus: string;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewEmployeeProjects() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(null);

    const fetchEmployees = async () => {
        try {
            const response = await apiClient.get<Employee[]>('/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            alert('Failed to fetch employees.');
        }
    };

    const fetchProjectsForEmployee = async (employeeId: number) => {
        setLoading(true);
        try {
            const response = await apiClient.get<Project[]>(`/employees/${employeeId}/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedEmployeeID !== null) {
            fetchProjectsForEmployee(selectedEmployeeID);
        }
    }, [selectedEmployeeID]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const renderItem = ({ item }: { item: Project }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <FontAwesome5 name="clipboard-list" size={24} color="#465954" />
                <Text style={styles.cardTitle}>{item.projectName}</Text>
            </View>
            <Text style={styles.details}>Type: {item.projectType}</Text>
            <Text style={styles.details}>
                Start: {item.projectStartDate ? item.projectStartDate.split('T')[0] : 'N/A'}
            </Text>
            <Text style={styles.details}>
                End: {item.projectEndDate ? item.projectEndDate.split('T')[0] : 'N/A'}
            </Text>
            <Text style={styles.details}>Status: {item.projectStatus}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Projects of Employee</Text>
            <Text style={styles.subtitle}>Select an employee to view their projects:</Text>

            <Picker
                selectedValue={selectedEmployeeID}
                onValueChange={(value) => setSelectedEmployeeID(value)}
                style={styles.picker}>
                <Picker.Item label="Select an employee" value={null} />
                {employees.map((employee) => (
                    <Picker.Item
                        key={employee.employeeID}
                        label={`${employee.firstName} ${employee.lastName}`}
                        value={employee.employeeID}
                    />
                ))}
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : projects.length === 0 && selectedEmployeeID ? (
                <Text style={styles.noDataText}>
                    No projects found for this employee. Assign projects to make them productive.
                </Text>
            ) : (
                <FlatList
                    data={projects}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.projectID.toString()}
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
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#465954',
        marginBottom: 20,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#F8F8F8',
    },
    listContainer: {
        paddingVertical: 10,
    },
    card: {
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
        marginLeft: 10,
    },
    details: {
        fontSize: 14,
        color: '#465954',
        marginBottom: 5,
    },
    noDataText: {
        fontSize: 16,
        color: '#FF6347',
        textAlign: 'center',
        marginTop: 20,
    },
});
