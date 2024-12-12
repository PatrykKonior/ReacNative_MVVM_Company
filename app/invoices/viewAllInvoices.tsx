import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const mockInvoices = [
    {
        id: '1',
        saleId: 101,
        invoiceDate: '2023-01-01',
        paymentDueDate: '2023-01-15',
        invoiceStatus: 'Paid',
        totalAmount: '1200.00',
    },
    {
        id: '2',
        saleId: 102,
        invoiceDate: '2023-02-01',
        paymentDueDate: '2023-02-15',
        invoiceStatus: 'Pending',
        totalAmount: '800.00',
    },
];

export default function ViewAllInvoices() {
    const handleEdit = (id: string) => {
        alert(`Edit Invoice #${id}`);
    };

    const handleDelete = (id: string) => {
        alert(`Delete Invoice #${id}`);
    };

    const renderItem = ({ item }: { item: { [key: string]: any } }) => (
        <View style={styles.invoiceCard}>
            <View style={styles.invoiceContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="file-invoice-dollar" size={24} color="#465954" />
                    <Text style={styles.invoiceId}>Invoice #{item.id}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Sale ID: {item.saleId}</Text>
                    <Text style={styles.details}>Invoice Date: {item.invoiceDate}</Text>
                    <Text style={styles.details}>Due Date: {item.paymentDueDate}</Text>
                    <Text style={styles.details}>Status: {item.invoiceStatus}</Text>
                    <Text style={styles.details}>Amount: ${item.totalAmount}</Text>
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
            <Text style={styles.title}>Invoices</Text>
            <FlatList
                data={mockInvoices}
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
    invoiceCard: {
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
    invoiceContent: {
        flex: 1,
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    invoiceId: {
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
