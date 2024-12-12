import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Project = {
    projectID: number;
    clientID?: number;
    projectName: string;
    projectType: string;
    projectStartDate?: string;
    projectEndDate?: string;
    projectBudget?: number;
    vatRate?: number;
    projectStatus: string;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Project[]>('/projects');
            setProjects(response.data);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while fetching projects'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        alert(`Edit project with ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/projects/${id}`);
            setProjects((prevProjects) => prevProjects.filter((project) => project.projectID !== id));
            alert(`Deleted project with ID: ${id}`);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while deleting the project'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        }
    };

    const renderItem = ({ item }: { item: Project }) => (
        <View style={styles.projectCard}>
            <View style={styles.projectContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="clipboard-list" size={24} color="#465954" />
                    <Text style={styles.projectName}>{item.projectName}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Type: {item.projectType}</Text>
                    <Text style={styles.details}>Start: {item.projectStartDate || 'N/A'}</Text>
                    <Text style={styles.details}>End: {item.projectEndDate || 'N/A'}</Text>
                    <Text style={styles.details}>Budget: ${item.projectBudget?.toFixed(2) || 'N/A'}</Text>
                    <Text style={styles.details}>VAT: {item.vatRate || 0}%</Text>
                    <Text style={styles.details}>Status: {item.projectStatus}</Text>
                    <Text style={styles.details}>Manager ID: {item.clientID || 'N/A'}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.projectID)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.projectID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Projects</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
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
        marginBottom: 20,
        textAlign: 'center',
    },
    listContainer: {
        paddingVertical: 10,
    },
    projectCard: {
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
    projectContent: {
        flex: 1,
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    projectName: {
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
