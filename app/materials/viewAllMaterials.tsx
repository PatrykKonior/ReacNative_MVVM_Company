import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const mockMaterials = [
    {
        id: '1',
        name: 'Concrete',
        description: 'High-strength concrete for building.',
        unitPrice: '120.50',
        vatRate: '23.00',
    },
    {
        id: '2',
        name: 'Steel',
        description: 'Reinforcement steel bars.',
        unitPrice: '200.00',
        vatRate: '23.00',
    },
];

export default function ViewAllMaterials() {
    const handleEdit = (id: string) => {
        alert(`Edit Material with ID: ${id}`);
    };

    const handleDelete = (id: string) => {
        alert(`Delete Material with ID: ${id}`);
    };

    const renderItem = ({ item }: { item: { [key: string]: any } }) => (
        <View style={styles.materialCard}>
            <View style={styles.materialContent}>
                <Text style={styles.materialName}>{item.name}</Text>
                <Text style={styles.details}>Description: {item.description}</Text>
                <Text style={styles.details}>Unit Price: ${item.unitPrice}</Text>
                <Text style={styles.details}>VAT Rate: {item.vatRate}%</Text>
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
            <Text style={styles.title}>Materials</Text>
            <FlatList
                data={mockMaterials}
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
        flexGrow: 1,
        paddingVertical: 10,
    },
    materialCard: {
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
    materialContent: {
        flex: 1,
        marginRight: 10,
    },
    materialName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    details: {
        fontSize: 14,
        color: '#465954',
        marginTop: 5,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Wyśrodkowanie ikon w pionie
    },
    actionIcon: {
        marginLeft: 15, // Odstęp między ikonami
    },
});
