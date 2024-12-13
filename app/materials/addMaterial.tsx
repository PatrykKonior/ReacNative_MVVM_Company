import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function AddMaterial() {
    const [material, setMaterial] = useState({
        MaterialName: '',
        MaterialDescription: '',
        UnitPrice: '',
        VATRate: '',
    });

    const [errors, setErrors] = useState({
        MaterialName: '',
        MaterialDescription: '',
        UnitPrice: '',
        VATRate: '',
    });

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setMaterial({ ...material, [field]: value });
        setErrors({ ...errors, [field]: '' }); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (!material.MaterialName.trim()) newErrors.MaterialName = 'Material Name is required';
        if (!material.MaterialDescription.trim())
            newErrors.MaterialDescription = 'Material Description is required';
        if (!material.UnitPrice.trim()) newErrors.UnitPrice = 'Unit Price is required';
        if (isNaN(Number(material.UnitPrice))) newErrors.UnitPrice = 'Unit Price must be a number';
        if (!material.VATRate.trim()) newErrors.VATRate = 'VAT Rate is required';
        if (isNaN(Number(material.VATRate))) newErrors.VATRate = 'VAT Rate must be a number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddMaterial = async () => {
        if (!validateFields()) return;

        try {
            await apiClient.post('/materials', {
                MaterialName: material.MaterialName,
                MaterialDescription: material.MaterialDescription,
                UnitPrice: Number(material.UnitPrice),
                VATRate: Number(material.VATRate),
            });

            Toast.show({
                type: 'success',
                text1: 'Sukces',
                text2: 'Pomyślnie dodano Material 🚀',
                position: 'top',
                visibilityTime: 4000,
                props: {
                    style: styles.toastSuccess,
                },
            });

            setMaterial({
                MaterialName: '',
                MaterialDescription: '',
                UnitPrice: '',
                VATRate: '',
            });
        } catch (error) {
            console.error('Error adding material:', error);

            Toast.show({
                type: 'error',
                text1: 'Błąd',
                text2: 'Nie udało się dodać Material. Spróbuj ponownie.',
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
            <Text style={styles.title}>Add New Material</Text>

            <TextInput
                placeholder="Material Name"
                style={[styles.input, errors.MaterialName ? styles.errorBorder : null]}
                value={material.MaterialName}
                onChangeText={(text) => handleInputChange('MaterialName', text)}
            />
            {errors.MaterialName && <Text style={styles.errorText}>{errors.MaterialName}</Text>}

            <TextInput
                placeholder="Material Description"
                style={[styles.input, styles.multiline, errors.MaterialDescription ? styles.errorBorder : null]}
                value={material.MaterialDescription}
                multiline
                onChangeText={(text) => handleInputChange('MaterialDescription', text)}
            />
            {errors.MaterialDescription && <Text style={styles.errorText}>{errors.MaterialDescription}</Text>}

            <TextInput
                placeholder="Unit Price"
                style={[styles.input, errors.UnitPrice ? styles.errorBorder : null]}
                value={material.UnitPrice}
                keyboardType="decimal-pad"
                onChangeText={(text) => handleInputChange('UnitPrice', text)}
            />
            {errors.UnitPrice && <Text style={styles.errorText}>{errors.UnitPrice}</Text>}

            <TextInput
                placeholder="VAT Rate"
                style={[styles.input, errors.VATRate ? styles.errorBorder : null]}
                value={material.VATRate}
                keyboardType="decimal-pad"
                onChangeText={(text) => handleInputChange('VATRate', text)}
            />
            {errors.VATRate && <Text style={styles.errorText}>{errors.VATRate}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleAddMaterial}>
                <Text style={styles.addButtonText}>Add Material</Text>
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
        fontSize: 16,
    },
    multiline: {
        height: 100,
        textAlignVertical: 'top',
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
