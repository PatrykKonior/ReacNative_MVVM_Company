import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNotifications } from '@/contexts/notificationsContext';

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
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState<Invoice | null>(null);

    const { addNotification } = useNotifications();

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
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setFormState(invoice);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!formState) return;

        try {
            await apiClient.put(`/invoices/${formState.invoiceID}`, formState);
            addNotification('edit', `Updated Invoice ID: ${formState.invoiceID}`, '/invoices/viewAllInvoices');
            setInvoices((prevInvoices) =>
                prevInvoices.map((inv) =>
                    inv.invoiceID === formState.invoiceID ? { ...formState } : inv
                )
            );
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Updated Invoice ID: ${formState.invoiceID}`,
                position: 'top',
                visibilityTime: 4000,
            });
            setModalVisible(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not update Invoice. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/invoices/${id}`);
            setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.invoiceID !== id));
            addNotification('delete', `Deleted Invoice ID: ${id}`, '/invoices/viewAllInvoices');
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Deleted Invoice ID: ${id}`,
                position: 'top',
                visibilityTime: 4000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not delete Invoice. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    const handleInputChange = (field: keyof Invoice, value: string) => {
        if (formState) {
            setFormState({
                ...formState,
                [field]: field === 'totalAmount' || field === 'saleID' ? Number(value) : value,
            });
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
                    <Text style={styles.details}>
                        Invoice Date: {item.invoiceDate ? item.invoiceDate.split('T')[0] : 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        Due Date: {item.paymentDueDate ? item.paymentDueDate.split('T')[0] : 'N/A'}
                    </Text>
                    <Text style={styles.details}>Status: {item.invoiceStatus}</Text>
                    <Text style={styles.details}>Amount: ${item.totalAmount?.toFixed(2) || '0.00'}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
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
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Invoice</Text>
                        {formState && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Sale ID"
                                    value={formState.saleID?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('saleID', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Invoice Date (YYYY-MM-DD)"
                                    value={formState?.invoiceDate ? formState.invoiceDate.split('T')[0] : ''} // Formatowanie daty
                                    onChangeText={(text) => handleInputChange('invoiceDate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Payment Due Date (YYYY-MM-DD)"
                                    value={formState?.paymentDueDate ? formState.paymentDueDate.split('T')[0] : ''} // Formatowanie daty
                                    onChangeText={(text) => handleInputChange('paymentDueDate', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Invoice Status"
                                    value={formState.invoiceStatus}
                                    onChangeText={(text) => handleInputChange('invoiceStatus', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Total Amount"
                                    value={formState.totalAmount?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('totalAmount', text)}
                                />
                                <View style={styles.modalActions}>
                                    <Button
                                        title="Cancel"
                                        color="#8B0000"
                                        onPress={() => setModalVisible(false)}
                                    />
                                    <Button title="Save" onPress={handleSave} />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
