import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockTimeLogs = [
    {
        TimeLogID: '1',
        EmployeeID: '101',
        ProjectID: '202',
        LogDate: '2023-12-01',
        HoursWorked: '8',
        HourlyRate: '25.00',
        TotalAmount: '200.00',
    },
    {
        TimeLogID: '2',
        EmployeeID: '102',
        ProjectID: '203',
        LogDate: '2023-12-02',
        HoursWorked: '5',
        HourlyRate: '20.00',
        TotalAmount: '100.00',
    },
];

export default function ViewAllTimeLogs() {
    const renderTimeLogItem = ({ item }: { item: typeof mockTimeLogs[0] }) => (
        <View style={styles.timeLogCard}>
            <Text style={styles.timeLogTitle}>Employee ID: {item.EmployeeID}</Text>
            <Text style={styles.timeLogSubtitle}>Project ID: {item.ProjectID}</Text>
            <Text style={styles.timeLogSubtitle}>Log Date: {item.LogDate}</Text>
            <Text style={styles.timeLogSubtitle}>Hours Worked: {item.HoursWorked}</Text>
            <Text style={styles.timeLogSubtitle}>Hourly Rate: {item.HourlyRate}</Text>
            <Text style={styles.timeLogSubtitle}>Total Amount: {item.TotalAmount}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Time Logs</Text>
            <FlatList
                data={mockTimeLogs}
                renderItem={renderTimeLogItem}
                keyExtractor={(item) => item.TimeLogID}
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
        color: '#465954',
        textAlign: 'center',
    },
    listContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    timeLogCard: {
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
    timeLogTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    timeLogSubtitle: {
        fontSize: 14,
        color: '#465954',
        marginTop: 5,
    },
});
