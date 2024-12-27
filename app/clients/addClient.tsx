import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useNotifications } from '@/contexts/notificationsContext';

// Typy dla klienta
interface Client {
    companyName: string;
    nip: string;
    regon: string;
    phoneNumber: string;
    email: string;
    contactPersonName: string;
}

// Typy dla błędów
interface Errors {
    companyName?: string;
    nip?: string;
    regon?: string;
    phoneNumber?: string;
    email?: string;
    contactPersonName?: string;
}

export default function AddClient() {
    // funkcja powiadomień
    const { addNotification } = useNotifications();

    const [client, setClient] = useState<Client>({
        companyName: '',
        nip: '',
        regon: '',
        phoneNumber: '',
        email: '',
        contactPersonName: '',
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
        setErrors({ ...errors, [field]: '' });
    };

    const validateFields = (): boolean => {
        const newErrors: Partial<Errors> = {};

        if (!client.companyName.trim()) newErrors.companyName = 'Company Name is required';
        if (!client.nip.trim()) newErrors.nip = 'NIP is required';
        else if (!/^[0-9]{10}$/.test(client.nip)) newErrors.nip = 'NIP must be a 10-digit number';

        if (!client.regon.trim()) newErrors.regon = 'Regon is required';
        else if (!/^[0-9]{9}$/.test(client.regon)) newErrors.regon = 'Regon must be a 9-digit number';

        if (!client.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        else if (!/^\+?[0-9\- ]+$/.test(client.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number format';

        if (!client.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) newErrors.email = 'Invalid email address';

        if (!client.contactPersonName.trim()) newErrors.contactPersonName = 'Contact Person Name is required';

        setErrors(newErrors as Errors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddClient = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/Clients', client); // Poprawiony endpoint
            addNotification('add', `Added client: ${client.companyName}`, '/clients/addClient'); // Powiadomienie
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Client added successfully 🚀',
                position: 'top',
                visibilityTime: 4000,
            });

            setClient({
                companyName: '',
                nip: '',
                regon: '',
                phoneNumber: '',
                email: '',
                contactPersonName: '',
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
                style={[styles.input, errors.companyName ? styles.errorBorder : null]}
                value={client.companyName}
                onChangeText={(text) => handleInputChange('companyName', text)}
            />
            {errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}

            <TextInput
                placeholder="NIP"
                style={[styles.input, errors.nip ? styles.errorBorder : null]}
                value={client.nip}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('nip', text)}
            />
            {errors.nip && <Text style={styles.errorText}>{errors.nip}</Text>}

            <TextInput
                placeholder="Regon"
                style={[styles.input, errors.regon ? styles.errorBorder : null]}
                value={client.regon}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('regon', text)}
            />
            {errors.regon && <Text style={styles.errorText}>{errors.regon}</Text>}

            <TextInput
                placeholder="Phone Number"
                style={[styles.input, errors.phoneNumber ? styles.errorBorder : null]}
                value={client.phoneNumber}
                keyboardType="phone-pad"
                onChangeText={(text) => handleInputChange('phoneNumber', text)}
            />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

            <TextInput
                placeholder="Email"
                style={[styles.input, errors.email ? styles.errorBorder : null]}
                value={client.email}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange('email', text)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
                placeholder="Contact Person Name"
                style={[styles.input, errors.contactPersonName ? styles.errorBorder : null]}
                value={client.contactPersonName}
                onChangeText={(text) => handleInputChange('contactPersonName', text)}
            />
            {errors.contactPersonName && <Text style={styles.errorText}>{errors.contactPersonName}</Text>}

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
