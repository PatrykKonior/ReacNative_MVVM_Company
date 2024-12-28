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
import Toast from 'react-native-toast-message';
import { useNotifications } from '@/contexts/notificationsContext';

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
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState<Employee | null>(null);

    const { addNotification } = useNotifications();

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
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setFormState(employee);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!formState) return;

        try {
            await apiClient.put(`/employees/${formState.employeeID}`, formState);
            addNotification('edit', `Updated Employee: ${formState.firstName} ${formState.lastName}`, '/employees/viewAllEmployees');
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.employeeID === formState.employeeID ? { ...formState } : emp
                )
            );
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Updated Employee: ${formState.firstName} ${formState.lastName}`,
                position: 'top',
                visibilityTime: 4000,
            });
            setModalVisible(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not update Employee. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/employees/${id}`);
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employeeID !== id));
            addNotification('delete', `Deleted Employee with ID: ${id}`, '/employees/viewAllEmployees');
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Deleted Employee with ID: ${id}`,
                position: 'top',
                visibilityTime: 4000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not delete Employee. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    const handleInputChange = (field: keyof Employee, value: string) => {
        if (formState) {
            setFormState({ ...formState, [field]: value });
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
                    <Text style={styles.details}>
                        Hire Date: {item.hireDate ? item.hireDate.split('T')[0] : 'N/A'}
                    </Text>
                    <Text style={styles.details}>Salary: {item.salary}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
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
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Employee</Text>
                        {formState && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="First Name"
                                    value={formState.firstName}
                                    onChangeText={(text) => handleInputChange('firstName', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Last Name"
                                    value={formState.lastName}
                                    onChangeText={(text) => handleInputChange('lastName', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Position"
                                    value={formState.position}
                                    onChangeText={(text) => handleInputChange('position', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    value={formState.phoneNumber}
                                    onChangeText={(text) => handleInputChange('phoneNumber', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={formState.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Hire Date (YYYY-MM-DD)"
                                    value={formState?.hireDate ? formState.hireDate.split('T')[0] : ''} // Usuwamy czas
                                    onChangeText={(text) => handleInputChange('hireDate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Salary"
                                    value={formState.salary?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('salary', text)}
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
    employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EBF2EB',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
