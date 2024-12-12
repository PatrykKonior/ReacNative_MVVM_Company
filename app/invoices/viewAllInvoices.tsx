import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Invoice = {
    invoiceID: number;
    saleID: number | null;
    invoiceDate: string | null;
    paymentDueDate: string | null;
    invoiceStatus: string;
    totalAmount: number | null;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllInvoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Invoice[]>('/invoices');
            setInvoices(response.data);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while fetching invoices'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        alert(`Edit Invoice with ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/invoices/${id}`);
            setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.invoiceID !== id));
            alert(`Deleted Invoice with ID: ${id}`);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while deleting the invoice'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        }
    };

    const renderItem = ({ item }: { item: Invoice }) => (
        <View style={styles.invoiceCard}>
            <View style={styles.invoiceContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="file-invoice-dollar" size={24} color="#465954" />
                    <Text style={styles.invoiceId}>Invoice #{item.invoiceID}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Sale ID: {item.saleID || 'N/A'}</Text>
                    <Text style={styles.details}>Invoice Date: {item.invoiceDate || 'N/A'}</Text>
                    <Text style={styles.details}>Due Date: {item.paymentDueDate || 'N/A'}</Text>
                    <Text style={styles.details}>Status: {item.invoiceStatus}</Text>
                    <Text style={styles.details}>Amount: ${item.totalAmount?.toFixed(2) || '0.00'}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.invoiceID)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.invoiceID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invoices</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={invoices}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.invoiceID.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
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
        alignItems: 'center',
    },
    actionIcon: {
        marginLeft: 15,
    },
});
