import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

type Sale = {
    saleID: number;
    clientID?: number;
    saleDate?: string;
    totalNetAmount?: number;
    totalVATAmount?: number;
    totalGrossAmount?: number;
    saleStatus: string;
};

const dummySales: Sale[] = [
    {
        saleID: 1,
        clientID: 101,
        saleDate: '2024-12-19',
        totalNetAmount: 1000,
        totalVATAmount: 230,
        totalGrossAmount: 1230,
        saleStatus: 'Completed',
    },
    {
        saleID: 2,
        clientID: 102,
        saleDate: '2024-12-20',
        totalNetAmount: 2000,
        totalVATAmount: 460,
        totalGrossAmount: 2460,
        saleStatus: 'Pending',
    },
];

export default function ViewAllSales() {
    const [sales] = useState<Sale[]>(dummySales);

    const handleEdit = (saleID: number) => {
        alert(`Edit sale with ID: ${saleID}`);
    };

    const handleDelete = (saleID: number) => {
        alert(`Delete sale with ID: ${saleID}`);
    };

    const renderItem = ({ item }: { item: Sale }) => (
        <View style={styles.saleCard}>
            <View style={styles.saleContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="file-invoice-dollar" size={24} color="#465954" />
                    <Text style={styles.saleTitle}>Sale ID: {item.saleID}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Client ID: {item.clientID || 'N/A'}</Text>
                    <Text style={styles.details}>Date: {item.saleDate || 'N/A'}</Text>
                    <Text style={styles.details}>
                        Net Amount: ${item.totalNetAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        VAT Amount: ${item.totalVATAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        Gross Amount: ${item.totalGrossAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>Status: {item.saleStatus}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.saleID)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.saleID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sales</Text>
            <FlatList
                data={sales}
                renderItem={renderItem}
                keyExtractor={(item) => item.saleID.toString()}
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
    saleCard: {
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
    saleContent: {
        flex: 1,
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    saleTitle: {
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
