import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNotifications } from '@/contexts/notificationsContext';


// Typ dla płatności
type Payment = {
    paymentID: number;
    paymentDate?: string;
    paymentAmount?: number;
    paymentMethod?: string;
    invoiceDate?: string;
    invoiceStatus?: string;
    totalAmount?: number;
};

export default function ViewAllPayments() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

    const { addNotification } = useNotifications();

    // Pobieram płatności z API
    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:5069/api/Payments');
            setPayments(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch payments. Please try again later.', [{ text: 'OK' }]);
        }
    };

    // Edycja
    const handleEdit = (payment: Payment) => {
        setSelectedPayment(payment);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (selectedPayment) {
            try {
                await axios.put(
                    `http://localhost:5069/api/Payments/${selectedPayment.paymentID}`,
                    selectedPayment
                );

                addNotification(
                    'edit',
                    `Updated Payment ID: ${selectedPayment.paymentID}`,
                    '/payments/viewAllPayments'
                );

                // Aktualizacja listy płatności
                setPayments((prevPayments) =>
                    prevPayments.map((payment) =>
                        payment.paymentID === selectedPayment.paymentID
                            ? selectedPayment
                            : payment
                    )
                );

                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: `Payment Updated successfully!`,
                    position: 'top',
                    visibilityTime: 4000,
                });
                setIsEditing(false);
                setSelectedPayment(null);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to update Payment. Try again.',
                    position: 'top',
                    visibilityTime: 4000,
                });
            }
        }
    };

    // Usuwanie
    const handleDelete = async (paymentID: number) => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete Payment ID ${paymentID}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await axios.delete(
                                `http://localhost:5069/api/Payments/${paymentID}`
                            );
                            setPayments((prevPayments) =>
                                prevPayments.filter((payment) => payment.paymentID !== paymentID)
                            );

                            addNotification(
                                'delete',
                                `Deleted Payment ID: ${paymentID}`,
                                '/payments/viewAllPayments'
                            );

                            Toast.show({
                                type: 'success',
                                text1: 'Success',
                                text2: `Deleted Payment ID: ${paymentID}`,
                                position: 'top',
                                visibilityTime: 4000,
                            });
                        } catch (error) {
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Failed to delete Payment. Try again.',
                                position: 'top',
                                visibilityTime: 4000,
                            });
                        }
                    },
                },
            ]
        );
    };


    // Wyświetlenie pojedynczego elementu
    const renderItem = ({ item }: { item: Payment }) => (
        <View style={styles.saleCard}>
            <View style={styles.saleContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="money-check-alt" size={24} color="#465954" />
                    <Text style={styles.saleTitle}>Payment ID: {item.paymentID}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>
                        Invoice Date: {item.invoiceDate ? item.invoiceDate.split('T')[0] : 'N/A'}
                    </Text>
                    <Text style={styles.details}>Status: {item.invoiceStatus || 'N/A'}</Text>
                    <Text style={styles.details}>
                        Total Amount: ${item.totalAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        Payment Date: {item.paymentDate ? item.paymentDate.split('T')[0] : 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        Payment Amount: ${item.paymentAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        Method: {item.paymentMethod || 'N/A'}
                    </Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                    <MaterialIcons
                        name="edit"
                        size={24}
                        color="#0D0D0D"
                        style={styles.actionIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.paymentID)}>
                    <Ionicons
                        name="trash"
                        size={24}
                        color="#F20505"
                        style={styles.actionIcon}
                    />
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

            {/* Modal do edycji */}
            {isEditing && selectedPayment && (
                <Modal visible={isEditing} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Payment</Text>

                            {/* Payment Date */}
                            <TextInput
                                style={styles.input}
                                placeholder="Payment Date (YYYY-MM-DD)"
                                value={
                                    selectedPayment.paymentDate
                                        ? selectedPayment.paymentDate.split('T')[0] // Usunięcie części T00:00:00
                                        : ''
                                }
                                onChangeText={(text) =>
                                    setSelectedPayment({
                                        ...selectedPayment,
                                        paymentDate: text,
                                    })
                                }
                            />

                            {/* Payment Amount */}
                            <TextInput
                                style={styles.input}
                                placeholder="Payment Amount"
                                value={selectedPayment.paymentAmount?.toString() || ''}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    setSelectedPayment({
                                        ...selectedPayment,
                                        paymentAmount: parseFloat(text),
                                    })
                                }
                            />

                            {/* Payment Method */}
                            <TextInput
                                style={styles.input}
                                placeholder="Payment Method"
                                value={selectedPayment.paymentMethod || ''}
                                onChangeText={(text) =>
                                    setSelectedPayment({
                                        ...selectedPayment,
                                        paymentMethod: text,
                                    })
                                }
                            />

                            {/* Zapisz zmiany */}
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </TouchableOpacity>

                            {/* Anuluj */}
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setIsEditing(false);
                                    setSelectedPayment(null);
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

// Style identyczne z Sales i Projects
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
    },
    input: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#CCC',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#0D0D0D',
        fontSize: 16,
    },
});
