import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const timeLogsData = [
    {
        id: '1',
        employeeName: 'John Doe',
        projectName: 'Project Alpha',
        logDate: '2023-12-01',
        hoursWorked: 5.5,
        hourlyRate: 50.0,
        totalAmount: 275.0,
    },
    {
        id: '2',
        employeeName: 'Jane Smith',
        projectName: 'Project Beta',
        logDate: '2023-12-02',
        hoursWorked: 8.0,
        hourlyRate: 45.0,
        totalAmount: 360.0,
    },
];

export default function ViewAllTimeLogs() {
    const handleEdit = (id: string) => {
        alert(`Edit record with ID: ${id}`);
    };

    const handleDelete = (id: string) => {
        alert(`Delete record with ID: ${id}`);
    };

    const renderItem = ({ item }: { item: typeof timeLogsData[0] }) => (
        <View style={styles.recordContainer}>
            {/* Record Content */}
            <View style={styles.recordContent}>
                <Text style={styles.recordTitle}>{item.employeeName}</Text>
                <Text style={styles.recordSubTitle}>Project: {item.projectName}</Text>
                <Text style={styles.recordSubTitle}>Date: {item.logDate}</Text>
                <Text style={styles.recordSubTitle}>
                    Hours: {item.hoursWorked}, Rate: ${item.hourlyRate}/hr
                </Text>
                <Text style={styles.recordSubTitle}>Total: ${item.totalAmount}</Text>
            </View>
            {/* Actions */}
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.id)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Time Logs</Text>
            <FlatList
                data={timeLogsData}
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
