import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const mockProjects = [
    {
        id: '1',
        projectName: 'Project A',
        projectType: 'Construction',
        projectStartDate: '2023-01-01',
        projectEndDate: '2023-06-01',
        projectBudget: 50000,
        vatRate: 23,
        projectStatus: 'Active',
        managerId: 101,
    },
    {
        id: '2',
        projectName: 'Project B',
        projectType: 'Software Development',
        projectStartDate: '2023-03-01',
        projectEndDate: '2023-12-01',
        projectBudget: 75000,
        vatRate: 19,
        projectStatus: 'Pending',
        managerId: 102,
    },
];

export default function ViewAllProjects() {
    const renderItem = ({ item }: { item: { [key: string]: any } }) => (
        <TouchableOpacity style={styles.projectCard} onPress={() => alert(`Details for ${item.projectName}`)}>
            <View style={styles.cardHeader}>
                <FontAwesome5 name="clipboard-list" size={24} color="#465954" />
                <Text style={styles.projectName}>{item.projectName}</Text>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.details}>Type: {item.projectType}</Text>
                <Text style={styles.details}>Start: {item.projectStartDate}</Text>
                <Text style={styles.details}>End: {item.projectEndDate}</Text>
                <Text style={styles.details}>Budget: ${item.projectBudget}</Text>
                <Text style={styles.details}>VAT: {item.vatRate}%</Text>
                <Text style={styles.details}>Status: {item.projectStatus}</Text>
                <Text style={styles.details}>Manager ID: {item.managerId}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Projects</Text>
            <FlatList
                data={mockProjects}
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
    projectCard: {
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
});
