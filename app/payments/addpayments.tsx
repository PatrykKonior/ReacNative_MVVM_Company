import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

interface Payment {
    invoiceID: string;
    paymentDate: string;
    paymentAmount: string;
    paymentMethod: string;
}

interface Errors {
    invoiceID?: string;
    paymentDate?: string;
    paymentAmount?: string;
    paymentMethod?: string;
}

export default function AddPayments() {
    const [payment, setPayment] = useState<Payment>({
        invoiceID: '',
        paymentDate: '',
        paymentAmount: '',
        paymentMethod: '',
    });

    const [errors, setErrors] = useState<Errors>({});

    const validateFields = (): boolean => {
        const newErrors: Errors = {};
        if (!payment.invoiceID.trim()) newErrors.invoiceID = 'Invoice ID is required';
        if (!payment.paymentDate.trim()) newErrors.paymentDate = 'Payment Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(payment.paymentDate))
            newErrors.paymentDate = 'Invalid date format (YYYY-MM-DD)';
        if (!payment.paymentAmount.trim()) newErrors.paymentAmount = 'Payment Amount is required';
        if (isNaN(Number(payment.paymentAmount))) newErrors.paymentAmount = 'Amount must be a number';
        if (!payment.paymentMethod.trim()) newErrors.paymentMethod = 'Payment Method is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddPayment = () => {
        if (!validateFields()) return;
        Toast.show({
            type: 'success',
            text1: 'Payment added successfully!',
        });
        setPayment({ invoiceID: '', paymentDate: '', paymentAmount: '', paymentMethod: '' });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Payment</Text>
            <TextInput
                placeholder="Invoice ID"
                style={[styles.input, errors.invoiceID ? styles.errorBorder : null]}
                value={payment.invoiceID}
                onChangeText={(text) => setPayment({ ...payment, invoiceID: text })}
            />
            {errors.invoiceID && <Text style={styles.errorText}>{errors.invoiceID}</Text>}

            <TextInput
                placeholder="Payment Date (YYYY-MM-DD)"
                style={[styles.input, errors.paymentDate ? styles.errorBorder : null]}
                value={payment.paymentDate}
                onChangeText={(text) => setPayment({ ...payment, paymentDate: text })}
            />
            {errors.paymentDate && <Text style={styles.errorText}>{errors.paymentDate}</Text>}

            <TextInput
                placeholder="Payment Amount"
                style={[styles.input, errors.paymentAmount ? styles.errorBorder : null]}
                value={payment.paymentAmount}
                keyboardType="numeric"
                onChangeText={(text) => setPayment({ ...payment, paymentAmount: text })}
            />
            {errors.paymentAmount && <Text style={styles.errorText}>{errors.paymentAmount}</Text>}

            <TextInput
                placeholder="Payment Method"
                style={[styles.input, errors.paymentMethod ? styles.errorBorder : null]}
                value={payment.paymentMethod}
                onChangeText={(text) => setPayment({ ...payment, paymentMethod: text })}
            />
            {errors.paymentMethod && <Text style={styles.errorText}>{errors.paymentMethod}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleAddPayment}>
                <Text style={styles.buttonText}>Add Payment</Text>
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
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    errorBorder: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
    button: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
