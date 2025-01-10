import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

type Project = {
    projectID: number;
    projectName: string;
};

type Employee = {
    employeeID: number;
    firstName: string;
    lastName: string;
    position: string;
    phoneNumber: string;
    email: string;
    hireDate?: string;
    salary?: number;
    projectName?: string;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewProjectEmployees() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProjectID, setSelectedProjectID] = useState<number | null>(null);

    const fetchProjects = async () => {
        try {
            const response = await apiClient.get<Project[]>('/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            alert('Failed to fetch projects.');
        }
    };

    const fetchEmployeesForProject = async (projectId: number) => {
        setLoading(true);
        try {
            const response = await apiClient.get<Employee[]>(`/projects/${projectId}/employees`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]); // Ustaw pustą listę, jeśli wystąpi błąd
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedProjectID !== null) {
            fetchEmployeesForProject(selectedProjectID);
        }
    }, [selectedProjectID]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const renderItem = ({ item }: { item: Employee }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>
                <View style={styles.cardImage}>
                    <FontAwesome5 name="user-circle" size={24} color="#465954" />
                </View>
                {item.firstName} {item.lastName} ({item.position})
            </Text>
            <Text>Email: {item.email}</Text>
            <Text>Phone: {item.phoneNumber}</Text>
            <Text>Salary: {item.salary ? `$${item.salary.toFixed(2)}` : 'N/A'}</Text>
            <Text>Assigned to: {item.projectName || 'N/A'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Employees in Project</Text>
            <Text style={styles.subtitle}>Select a project to view its employees:</Text>

            <Picker
                selectedValue={selectedProjectID}
                onValueChange={(value) => setSelectedProjectID(value)}
                style={styles.picker}
            >
                <Picker.Item label="Select a project" value={null} />
                {projects.map((project) => (
                    <Picker.Item key={project.projectID} label={project.projectName} value={project.projectID} />
                ))}
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : employees.length === 0 && selectedProjectID ? (
                <Text style={styles.noDataText}>
                    No employees found for this project. Assign employees to make the project operational.
                </Text>
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
    cardImage:{
      paddingRight: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noDataText: {
        fontSize: 16,
        color: '#FF6347',
        textAlign: 'center',
        marginTop: 20,
    },
});
