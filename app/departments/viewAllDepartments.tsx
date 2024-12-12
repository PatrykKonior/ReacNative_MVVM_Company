import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

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
    const handleEdit = (id: string) => {
        alert(`Edit Department #${id}`);
    };

    const handleDelete = (id: string) => {
        alert(`Delete Department #${id}`);
    };

    const renderItem = ({ item }: { item: { [key: string]: any } }) => (
        <View style={styles.departmentCard}>
            <View style={styles.departmentContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="building" size={24} color="#465954" />
                    <Text style={styles.departmentName}>{item.departmentName}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Manager ID: {item.managerId}</Text>
                </View>
            </View>
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
        alignItems: 'center', // Wyśrodkowanie ikon
    },
    actionIcon: {
        marginLeft: 15, // Odstęp między ikonami
    },
});
