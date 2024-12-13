import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function AddInvoice() {
    const [invoice, setInvoice] = useState({
        SaleID: '',
        InvoiceDate: '',
        PaymentDueDate: '',
        InvoiceStatus: '',
        TotalAmount: '',
    });

    const [errors, setErrors] = useState({
        SaleID: '',
        InvoiceDate: '',
        PaymentDueDate: '',
        InvoiceStatus: '',
        TotalAmount: '',
    });

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setInvoice({ ...invoice, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (!invoice.SaleID.trim()) newErrors.SaleID = 'Sale ID is required';
        if (isNaN(Number(invoice.SaleID))) newErrors.SaleID = 'Sale ID must be a number';
        if (!invoice.InvoiceDate.trim()) newErrors.InvoiceDate = 'Invoice Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(invoice.InvoiceDate))
            newErrors.InvoiceDate = 'Invoice Date must be in YYYY-MM-DD format';
        if (!invoice.PaymentDueDate.trim()) newErrors.PaymentDueDate = 'Payment Due Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(invoice.PaymentDueDate))
            newErrors.PaymentDueDate = 'Payment Due Date must be in YYYY-MM-DD format';
        if (!invoice.InvoiceStatus.trim()) newErrors.InvoiceStatus = 'Invoice Status is required';
        if (!invoice.TotalAmount.trim()) newErrors.TotalAmount = 'Total Amount is required';
        if (isNaN(Number(invoice.TotalAmount))) newErrors.TotalAmount = 'Total Amount must be a number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddInvoice = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/invoices', {
                SaleID: Number(invoice.SaleID),
                InvoiceDate: invoice.InvoiceDate,
                PaymentDueDate: invoice.PaymentDueDate,
                InvoiceStatus: invoice.InvoiceStatus,
                TotalAmount: Number(invoice.TotalAmount),
            });

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Invoice added successfully 🚀',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastSuccess,
                },
            });

            setInvoice({
                SaleID: '',
                InvoiceDate: '',
                PaymentDueDate: '',
                InvoiceStatus: '',
                TotalAmount: '',
            });
        } catch (error) {
            console.error('Error adding invoice:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not add Invoice. Try again.',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastError,
                },
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Invoice</Text>

            <TextInput
                placeholder="Sale ID"
                style={[styles.input, errors.SaleID ? styles.errorBorder : null]}
                value={invoice.SaleID}
                keyboardType="number-pad"
                onChangeText={(text) => handleInputChange('SaleID', text)}
            />
            {errors.SaleID && <Text style={styles.errorText}>{errors.SaleID}</Text>}

            <TextInput
                placeholder="Invoice Date (YYYY-MM-DD)"
                style={[styles.input, errors.InvoiceDate ? styles.errorBorder : null]}
                value={invoice.InvoiceDate}
                onChangeText={(text) => handleInputChange('InvoiceDate', text)}
            />
            {errors.InvoiceDate && <Text style={styles.errorText}>{errors.InvoiceDate}</Text>}

            <TextInput
                placeholder="Payment Due Date (YYYY-MM-DD)"
                style={[styles.input, errors.PaymentDueDate ? styles.errorBorder : null]}
                value={invoice.PaymentDueDate}
                onChangeText={(text) => handleInputChange('PaymentDueDate', text)}
            />
            {errors.PaymentDueDate && <Text style={styles.errorText}>{errors.PaymentDueDate}</Text>}

            <TextInput
                placeholder="Invoice Status"
                style={[styles.input, errors.InvoiceStatus ? styles.errorBorder : null]}
                value={invoice.InvoiceStatus}
                onChangeText={(text) => handleInputChange('InvoiceStatus', text)}
            />
            {errors.InvoiceStatus && <Text style={styles.errorText}>{errors.InvoiceStatus}</Text>}

            <TextInput
                placeholder="Total Amount"
                style={[styles.input, errors.TotalAmount ? styles.errorBorder : null]}
                value={invoice.TotalAmount}
                keyboardType="decimal-pad"
                onChangeText={(text) => handleInputChange('TotalAmount', text)}
            />
            {errors.TotalAmount && <Text style={styles.errorText}>{errors.TotalAmount}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleAddInvoice}>
                <Text style={styles.addButtonText}>Add Invoice</Text>
            </TouchableOpacity>

            <Toast />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
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
    input: {
        width: '100%',
        height: 50,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#F9F9F9',
    },
    addButton: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#F20505',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    errorBorder: {
        borderColor: '#F20505',
    },
    toastSuccess: {
        backgroundColor: '#465954',
        borderRadius: 10,
        padding: 15,
        width: '90%',
    },
    toastError: {
        backgroundColor: '#8B0000',
        borderRadius: 10,
        padding: 15,
        width: '90%',
    },
});
