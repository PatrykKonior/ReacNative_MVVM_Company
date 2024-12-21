import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

// Typ faktury
type Invoice = {
    invoiceID: number;
    invoiceDate?: string;
    invoiceStatus?: string;
    totalAmount?: number;
};

// Typ płatności
type Payment = {
    invoiceID: string;
    paymentDate: Date;
    paymentAmount: string;
    paymentMethod: string;
};

export default function AddPayments() {
    const [payment, setPayment] = useState<Payment>({
        invoiceID: '',
        paymentDate: new Date(),
        paymentAmount: '',
        paymentMethod: '',
    });
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Pobierz faktury dla dropdown
    useEffect(() => {
        axios
            .get('http://localhost:5069/api/Invoices')
            .then((response) => setInvoices(response.data))
            .catch((error) => console.error('Error fetching invoices:', error));
    }, []);

    // Obsługuje zmiany w formularzu
    const handleInputChange = (field: keyof Payment, value: string | Date) => {
        setPayment({ ...payment, [field]: value });
    };

    // Obsługuje dodawanie płatności
    const handleSubmit = async () => {
        try {
            const payload = {
                InvoiceID: parseInt(payment.invoiceID),
                PaymentDate: payment.paymentDate.toISOString(),
                PaymentAmount: parseFloat(payment.paymentAmount),
                PaymentMethod: payment.paymentMethod,
            };

            await axios.post('http://localhost:5069/api/Payments', payload);
            alert('Payment added successfully!');
        } catch (error: any) {
            console.error('Error adding payment:', error.response?.data || error.message);
            alert('Failed to add payment.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Payment</Text>

            {/* Dropdown dla faktur */}
            <Text style={styles.label}>Invoice</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={payment.invoiceID}
                    onValueChange={(value) => handleInputChange('invoiceID', value.toString())}
                >
                    <Picker.Item label="Select an Invoice" value="" />
                    {invoices.map((invoice) => (
                        <Picker.Item
                            key={invoice.invoiceID}
                            label={`ID: ${invoice.invoiceID} | ${invoice.invoiceStatus} | $${invoice.totalAmount}`}
                            value={invoice.invoiceID.toString()}
                        />
                    ))}
                </Picker>
            </View>

            {/* Data płatności */}
            <Text style={styles.label}>Payment Date</Text>
            <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
            >
                <Text>{payment.paymentDate.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={payment.paymentDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) handleInputChange('paymentDate', date);
                    }}
                />
            )}

            {/* Kwota płatności */}
            <Text style={styles.label}>Payment Amount</Text>
            <TextInput
                placeholder="Enter Payment Amount"
                style={styles.input}
                keyboardType="numeric"
                value={payment.paymentAmount}
                onChangeText={(text) => handleInputChange('paymentAmount', text)}
            />

            {/* Metoda płatności */}
            <Text style={styles.label}>Payment Method</Text>
            <TextInput
                placeholder="Enter Payment Method"
                style={styles.input}
                value={payment.paymentMethod}
                onChangeText={(text) => handleInputChange('paymentMethod', text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.addButtonText}>Add Payment</Text>
            </TouchableOpacity>
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
        color: '#465954',
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        marginBottom: 15,
    },
    datePicker: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        marginBottom: 15,
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
});
