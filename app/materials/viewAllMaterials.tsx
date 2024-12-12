import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

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
    const renderItem = ({ item }: { item: { [key: string]: any } }) => (
        <TouchableOpacity style={styles.materialCard} onPress={() => alert(`Details for Material: ${item.name}`)}>
            <View style={styles.cardHeader}>
                <FontAwesome5 name="boxes" size={24} color="#465954" />
                <Text style={styles.materialName}>{item.name}</Text>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.details}>Description: {item.description}</Text>
                <Text style={styles.details}>Unit Price: ${item.unitPrice}</Text>
                <Text style={styles.details}>VAT Rate: {item.vatRate}%</Text>
            </View>
        </TouchableOpacity>
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
        paddingVertical: 10,
    },
    materialCard: {
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
    materialName: {
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
