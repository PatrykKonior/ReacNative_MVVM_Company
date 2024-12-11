import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const mockClients = [
    {
        id: '1',
        companyName: 'Company A',
        nip: '123456789',
        regon: '123456789012',
        phoneNumber: '123-456-789',
        email: 'companyA@example.com',
        contactPersonName: 'John Doe',
    },
    {
        id: '2',
        companyName: 'Company B',
        nip: '987654321',
        regon: '987654321098',
        phoneNumber: '987-654-321',
        email: 'companyB@example.com',
        contactPersonName: 'Jane Smith',
    },
];

export default function ViewAllClients() {
    const renderItem = ({ item }: { item: { [key: string]: string } }) => (
        <TouchableOpacity style={styles.clientCard} onPress={() => alert(`Details for ${item.companyName}`)}>
            <View style={styles.cardHeader}>
                <FontAwesome5 name="building" size={24} color="#465954" />
                <Text style={styles.companyName}>{item.companyName}</Text>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.details}>NIP: {item.nip}</Text>
                <Text style={styles.details}>Regon: {item.regon}</Text>
                <Text style={styles.details}>Phone: {item.phoneNumber}</Text>
                <Text style={styles.details}>Email: {item.email}</Text>
                <Text style={styles.details}>Contact: {item.contactPersonName}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clients</Text>
            <FlatList
                data={mockClients}
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
    clientCard: {
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
    companyName: {
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
