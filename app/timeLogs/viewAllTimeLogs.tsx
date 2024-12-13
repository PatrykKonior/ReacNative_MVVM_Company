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
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type TimeLog = {
    timeLogID: number;
    employeeID: number | null;
    projectID: number | null;
    logDate: string | null;
    hoursWorked: number | null;
    hourlyRate: number | null;
    totalAmount: number | null;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllTimeLogs() {
    const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedLog, setSelectedLog] = useState<TimeLog | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState<TimeLog | null>(null);

    const fetchTimeLogs = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<TimeLog[]>('/timelogs');
            setTimeLogs(response.data);
        } catch (error) {
            console.error('Error fetching time logs:', error);
            Alert.alert('Error', 'An error occurred while fetching time logs.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (log: TimeLog) => {
        setSelectedLog(log);
        setFormState(log);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!formState) return;

        try {
            await apiClient.put(`/timelogs/${formState.timeLogID}`, formState);
            setTimeLogs((prevLogs) =>
                prevLogs.map((log) =>
                    log.timeLogID === formState.timeLogID ? { ...formState } : log
                )
            );
            Alert.alert('Success', 'Time log updated successfully!');
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating time log:', error);
            Alert.alert('Error', 'An error occurred while updating the time log.');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/timelogs/${id}`);
            setTimeLogs((prevLogs) => prevLogs.filter((log) => log.timeLogID !== id));
            Alert.alert('Success', `Deleted Time Log with ID: ${id}`);
        } catch (error) {
            console.error('Error deleting time log:', error);
            Alert.alert('Error', 'An error occurred while deleting the time log.');
        }
    };

    const handleInputChange = (field: keyof TimeLog, value: string) => {
        if (formState) {
            setFormState({
                ...formState,
                [field]: field === 'hoursWorked' || field === 'hourlyRate' || field === 'totalAmount'
                    ? Number(value)
                    : value,
            });
        }
    };

    const renderTimeLogItem = ({ item }: { item: TimeLog }) => (
        <View style={styles.recordContainer}>
            <View style={styles.recordContent}>
                <Text style={styles.recordTitle}>Employee ID: {item.employeeID}</Text>
                <Text style={styles.recordSubTitle}>Project ID: {item.projectID}</Text>
                <Text style={styles.recordSubTitle}>Date: {item.logDate}</Text>
                <Text style={styles.recordSubTitle}>
                    Hours: {item.hoursWorked || 0}, Rate: ${item.hourlyRate || 0}/hr
                </Text>
                <Text style={styles.recordSubTitle}>Total: ${item.totalAmount || 0}</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.timeLogID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchTimeLogs();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Time Logs</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={timeLogs}
                    renderItem={renderTimeLogItem}
                    keyExtractor={(item) => item.timeLogID.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Time Log</Text>
                        {formState && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Employee ID"
                                    value={formState.employeeID?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('employeeID', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Project ID"
                                    value={formState.projectID?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('projectID', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Log Date (YYYY-MM-DD)"
                                    value={formState.logDate || ''}
                                    onChangeText={(text) => handleInputChange('logDate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Hours Worked"
                                    value={formState.hoursWorked?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('hoursWorked', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Hourly Rate"
                                    value={formState.hourlyRate?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('hourlyRate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Total Amount"
                                    value={formState.totalAmount?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('totalAmount', text)}
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#465954',
    },
    listContainer: {
        paddingVertical: 10,
    },
    recordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EBF2EB',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    recordContent: {
        flex: 1,
        marginRight: 10,
    },
    recordTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    recordSubTitle: {
        fontSize: 14,
        color: '#465954',
        marginTop: 2,
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
