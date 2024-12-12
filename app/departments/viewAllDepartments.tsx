import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const mockDepartments = [
    {
        id: '1',
        departmentName: 'Human Resources',
        managerId: 101,
    },
    {
        id: '2',
        departmentName: 'Engineering',
        managerId: 102,
    },
];

export default function ViewAllDepartments() {
    const renderItem = ({ item }: { item: { [key: string]: any } }) => (
        <TouchableOpacity style={styles.departmentCard} onPress={() => alert(`Details for ${item.departmentName}`)}>
            <View style={styles.cardHeader}>
                <FontAwesome5 name="building" size={24} color="#465954" />
                <Text style={styles.departmentName}>{item.departmentName}</Text>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.details}>Manager ID: {item.managerId}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Departments</Text>
            <FlatList
                data={mockDepartments}
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
});
