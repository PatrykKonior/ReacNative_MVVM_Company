import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

type Payment = {
    paymentID: number;
    invoiceID?: number;
    paymentDate?: string;
    paymentAmount?: number;
    paymentMethod?: string;
};

const dummyPayments: Payment[] = [
    { paymentID: 1, invoiceID: 101, paymentDate: '2024-12-20', paymentAmount: 1000, paymentMethod: 'Credit Card' },
    { paymentID: 2, invoiceID: 102, paymentDate: '2024-12-21', paymentAmount: 2000, paymentMethod: 'Bank Transfer' },
];

export default function ViewAllPayments() {
    const [payments] = useState<Payment[]>(dummyPayments);

    const handleEdit = (paymentID: number) => {
        alert(`Edit payment with ID: ${paymentID}`);
    };

    const handleDelete = (paymentID: number) => {
        alert(`Delete payment with ID: ${paymentID}`);
    };

    const renderItem = ({ item }: { item: Payment }) => (
        <View style={styles.paymentCard}>
            <View style={styles.paymentContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="money-check-alt" size={24} color="#465954" />
                    <Text style={styles.paymentTitle}>Payment ID: {item.paymentID}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Invoice ID: {item.invoiceID || 'N/A'}</Text>
                    <Text style={styles.details}>Date: {item.paymentDate || 'N/A'}</Text>
                    <Text style={styles.details}>Amount: ${item.paymentAmount?.toFixed(2) || 'N/A'}</Text>
                    <Text style={styles.details}>Method: {item.paymentMethod || 'N/A'}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.paymentID)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.paymentID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payments</Text>
            <FlatList
                data={payments}
                renderItem={renderItem}
                keyExtractor={(item) => item.paymentID.toString()}
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
    paymentCard: {
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
    paymentContent: {
        flex: 1,
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentTitle: {
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
        alignItems: 'center',
    },
    actionIcon: {
        marginLeft: 15,
    },
});
