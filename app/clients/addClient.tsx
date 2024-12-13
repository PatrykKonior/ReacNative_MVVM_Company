import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

// Typy dla klienta
interface Client {
    CompanyName: string;
    NIP: string;
    Regon: string;
    PhoneNumber: string;
    Email: string;
    ContactPerson: string;
}

// Typy dla błędów
interface Errors {
    CompanyName?: string;
    NIP?: string;
    Regon?: string;
    PhoneNumber?: string;
    Email?: string;
    ContactPerson?: string;
}

export default function AddClient() {
    const [client, setClient] = useState<Client>({
        CompanyName: '',
        NIP: '',
        Regon: '',
        PhoneNumber: '',
        Email: '',
        ContactPerson: '',
    });

    const [errors, setErrors] = useState<Errors>({});

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: keyof Client, value: string) => {
        setClient({ ...client, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Usuwanie błędu dla danego pola
    };

    const validateFields = (): boolean => {
        const newErrors: Partial<Errors> = {};

        if (!client.CompanyName.trim()) newErrors.CompanyName = 'Company Name is required';
        if (!client.NIP.trim()) newErrors.NIP = 'NIP is required';
        else if (!/^[0-9]{10}$/.test(client.NIP)) newErrors.NIP = 'NIP must be a 10-digit number';

        if (!client.Regon.trim()) newErrors.Regon = 'Regon is required';
        else if (!/^[0-9]{9}$/.test(client.Regon)) newErrors.Regon = 'Regon must be a 9-digit number';

        if (!client.PhoneNumber.trim()) newErrors.PhoneNumber = 'Phone Number is required';
        else if (!/^\+?[0-9\- ]+$/.test(client.PhoneNumber)) newErrors.PhoneNumber = 'Invalid phone number format';

        if (!client.Email.trim()) newErrors.Email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.Email)) newErrors.Email = 'Invalid email address';

        if (!client.ContactPerson.trim()) newErrors.ContactPerson = 'Contact Person is required';

        setErrors(newErrors as Errors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddClient = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/clients', client);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Client added successfully 🚀',
                position: 'top',
                visibilityTime: 4000,
            });

            setClient({
                CompanyName: '',
                NIP: '',
                Regon: '',
                PhoneNumber: '',
                Email: '',
                ContactPerson: '',
            });
        } catch (error) {
            console.error('Error adding client:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not add client. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Client</Text>

            <TextInput
                placeholder="Company Name"
                style={[styles.input, errors.CompanyName ? styles.errorBorder : null]}
                value={client.CompanyName}
                onChangeText={(text) => handleInputChange('CompanyName', text)}
            />
            {errors.CompanyName && <Text style={styles.errorText}>{errors.CompanyName}</Text>}

            <TextInput
                placeholder="NIP"
                style={[styles.input, errors.NIP ? styles.errorBorder : null]}
                value={client.NIP}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('NIP', text)}
            />
            {errors.NIP && <Text style={styles.errorText}>{errors.NIP}</Text>}

            <TextInput
                placeholder="Regon"
                style={[styles.input, errors.Regon ? styles.errorBorder : null]}
                value={client.Regon}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('Regon', text)}
            />
            {errors.Regon && <Text style={styles.errorText}>{errors.Regon}</Text>}

            <TextInput
                placeholder="Phone Number"
                style={[styles.input, errors.PhoneNumber ? styles.errorBorder : null]}
                value={client.PhoneNumber}
                keyboardType="phone-pad"
                onChangeText={(text) => handleInputChange('PhoneNumber', text)}
            />
            {errors.PhoneNumber && <Text style={styles.errorText}>{errors.PhoneNumber}</Text>}

            <TextInput
                placeholder="Email"
                style={[styles.input, errors.Email ? styles.errorBorder : null]}
                value={client.Email}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange('Email', text)}
            />
            {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}

            <TextInput
                placeholder="Contact Person Name"
                style={[styles.input, errors.ContactPerson ? styles.errorBorder : null]}
                value={client.ContactPerson}
                onChangeText={(text) => handleInputChange('ContactPerson', text)}
            />
            {errors.ContactPerson && <Text style={styles.errorText}>{errors.ContactPerson}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
                <Text style={styles.addButtonText}>Add Client</Text>
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
        backgroundColor: '#F9F9F9',
    },
    errorBorder: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
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
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
