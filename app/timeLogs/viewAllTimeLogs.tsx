import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
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

    const fetchTimeLogs = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<TimeLog[]>('/timelogs');
            setTimeLogs(response.data);
        } catch (error) {
            console.error('Error fetching time logs:', error);
            alert('An error occurred while fetching time logs.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        alert(`Edit Time Log with ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/timelogs/${id}`);
            setTimeLogs((prevLogs) => prevLogs.filter((log) => log.timeLogID !== id));
            alert(`Deleted Time Log with ID: ${id}`);
        } catch (error) {
            console.error('Error deleting time log:', error);
            alert('An error occurred while deleting the time log.');
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
                <TouchableOpacity onPress={() => handleEdit(item.timeLogID)}>
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
});
