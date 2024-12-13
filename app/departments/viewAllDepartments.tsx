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
    Alert,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Department = {
    departmentID: number;
    departmentName: string;
    managerID?: number;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllDepartments() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState<Department | null>(null);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Department[]>('/departments');
            setDepartments(response.data);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while fetching departments'
                : 'Unknown error occurred';
            console.error(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (department: Department) => {
        setSelectedDepartment(department);
        setFormState(department);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!formState) return;

        try {
            await apiClient.put(`/departments/${formState.departmentID}`, formState);
            setDepartments((prevDepartments) =>
                prevDepartments.map((dept) =>
                    dept.departmentID === formState.departmentID ? { ...formState } : dept
                )
            );
            Alert.alert('Success', 'Department updated successfully!');
            setModalVisible(false);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while updating the department'
                : 'Unknown error occurred';
            console.error(errorMessage);
            Alert.alert('Error', errorMessage);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/departments/${id}`);
            setDepartments((prevDepartments) => prevDepartments.filter((dept) => dept.departmentID !== id));
            Alert.alert('Success', `Deleted Department with ID: ${id}`);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while deleting the department'
                : 'Unknown error occurred';
            console.error(errorMessage);
            Alert.alert('Error', errorMessage);
        }
    };

    const handleInputChange = (field: keyof Department, value: string) => {
        if (formState) {
            setFormState({ ...formState, [field]: field === 'managerID' ? Number(value) : value });
        }
    };

    const renderItem = ({ item }: { item: Department }) => (
        <View style={styles.departmentCard}>
            <View style={styles.departmentContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="building" size={24} color="#465954" />
                    <Text style={styles.departmentName}>{item.departmentName}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Manager ID: {item.managerID || 'N/A'}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.departmentID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Departments</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={departments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.departmentID.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Department</Text>
                        {formState && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Department Name"
                                    value={formState.departmentName}
                                    onChangeText={(text) => handleInputChange('departmentName', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Manager ID"
                                    value={formState.managerID?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('managerID', text)}
                                />
                                <View style={styles.modalActions}>
                                    <Button
                                        title="Cancel"
                                        color="#8B0000"
                                        onPress={() => setModalVisible(false)}
                                    />
                                    <Button title="Save" onPress={handleSave} />
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
    departmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EBF2EB',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    departmentContent: {
        flex: 1,
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    departmentName: {
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
