import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AddSale() {
    const [sale, setSale] = useState({
        ClientID: '',
        SaleDate: '',
        TotalNetAmount: '',
        TotalVATAmount: '',
        TotalGrossAmount: '',
        SaleStatus: '',
    });

    const handleInputChange = (field: keyof typeof sale, value: string) => {
        setSale({ ...sale, [field]: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Sale</Text>

            <TextInput
                placeholder="Client ID"
                style={styles.input}
                value={sale.ClientID}
                onChangeText={(text) => handleInputChange('ClientID', text)}
            />

            <TextInput
                placeholder="Sale Date (YYYY-MM-DD)"
                style={styles.input}
                value={sale.SaleDate}
                onChangeText={(text) => handleInputChange('SaleDate', text)}
            />

            <TextInput
                placeholder="Total Net Amount"
                style={styles.input}
                value={sale.TotalNetAmount}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalNetAmount', text)}
            />

            <TextInput
                placeholder="Total VAT Amount"
                style={styles.input}
                value={sale.TotalVATAmount}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalVATAmount', text)}
            />

            <TextInput
                placeholder="Total Gross Amount"
                style={styles.input}
                value={sale.TotalGrossAmount}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalGrossAmount', text)}
            />

            <TextInput
                placeholder="Sale Status"
                style={styles.input}
                value={sale.SaleStatus}
                onChangeText={(text) => handleInputChange('SaleStatus', text)}
            />

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Sale</Text>
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
