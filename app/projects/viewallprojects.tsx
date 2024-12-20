import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    TextInput,
    Button,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Project = {
    projectID: number;
    projectName: string;
    projectType: string;
    projectStartDate?: string;
    projectEndDate?: string;
    projectBudget?: number;
    vatRate?: number;
    projectStatus: string;
    clientName?: string;
    clientNIP?: string;
    managerFirstName?: string;
    managerLastName?: string;
    managerPosition?: string;
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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState<Project | null>(null);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Project[]>('/Projects');
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

    const handleEditPress = (project: Project) => {
        setSelectedProject(project);
        setFormState({ ...project });
        setModalVisible(true);
    };

    const handleEditSave = async () => {
        if (!formState) return;

        try {
            await apiClient.put(`/Projects/${formState.projectID}`, formState);
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.projectID === formState.projectID ? formState : project
                )
            );
            alert('Project updated successfully!');
            setModalVisible(false);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while updating the project'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/Projects/${id}`);
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

    const handleInputChange = (field: keyof Project, value: string) => {
        if (formState) {
            setFormState({
                ...formState,
                [field]: field === 'projectBudget' || field === 'vatRate' ? Number(value) : value,
            });
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
                    <Text style={styles.details}>
                        Client: {item.clientName || 'N/A'} (NIP: {item.clientNIP || 'N/A'})
                    </Text>
                    <Text style={styles.details}>
                        Manager: {item.managerFirstName || 'N/A'} {item.managerLastName || 'N/A'} ({item.managerPosition || 'N/A'})
                    </Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEditPress(item)}>
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
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Project</Text>
                        {formState && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Project Name"
                                    value={formState.projectName}
                                    onChangeText={(text) => handleInputChange('projectName', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Project Type"
                                    value={formState.projectType}
                                    onChangeText={(text) => handleInputChange('projectType', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Start Date (YYYY-MM-DD)"
                                    value={formState.projectStartDate || ''}
                                    onChangeText={(text) => handleInputChange('projectStartDate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="End Date (YYYY-MM-DD)"
                                    value={formState.projectEndDate || ''}
                                    onChangeText={(text) => handleInputChange('projectEndDate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Budget"
                                    value={formState.projectBudget?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('projectBudget', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="VAT Rate"
                                    value={formState.vatRate?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('vatRate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Status"
                                    value={formState.projectStatus}
                                    onChangeText={(text) => handleInputChange('projectStatus', text)}
                                />
                                <View style={styles.modalActions}>
                                    <Button
                                        title="Cancel"
                                        color="#8B0000"
                                        onPress={() => setModalVisible(false)}
                                    />
                                    <Button title="Save" onPress={handleEditSave} />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
