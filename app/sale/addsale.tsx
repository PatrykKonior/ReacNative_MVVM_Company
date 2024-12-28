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
import DateTimePicker from '@react-native-community/datetimepicker'; // Dodany poprawny import
import axios from 'axios';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNotifications } from '@/contexts/notificationsContext';

// Typ klienta
type Client = {
    clientID: number;
    companyName: string;
    nip: string;
};

export default function AddSale() {
    const [sale, setSale] = useState({
        ClientID: '', // ClientID jako string dla Picker
        SaleDate: new Date(), // Domyślna wartość jako aktualna data
        TotalNetAmount: '',
        TotalVATAmount: '',
        TotalGrossAmount: '',
        SaleStatus: '',
    });
    const [clients, setClients] = useState<Client[]>([]); // Lista klientów zdefiniowana z typem Client
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { addNotification } = useNotifications();

    // Fetch clients for dropdown
    useEffect(() => {
        axios
            .get('http://localhost:5069/api/Clients')
            .then((response) => setClients(response.data))
            .catch((error) => console.error('Error fetching clients:', error));
    }, []);

    // Obsługa zmian w polach formularza
    const handleInputChange = (field: keyof typeof sale, value: string | Date) => {
        setSale({ ...sale, [field]: value });
    };

    // Obsługa wysyłania danych do backendu
    const handleSubmit = async () => {
        if (
            !sale.ClientID ||
            !sale.TotalNetAmount ||
            !sale.TotalVATAmount ||
            !sale.TotalGrossAmount ||
            !sale.SaleStatus
        ) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'All fields are required.',
                position: 'top',
                visibilityTime: 4000,
            });
            return; // Zakończ funkcję, jeśli walidacja nie powiedzie się
        }

        try {
            const payload = {
                ClientID: parseInt(sale.ClientID), // Konwertuj na numer
                SaleDate: sale.SaleDate.toISOString(), // ISO8601 do backendu
                TotalNetAmount: parseFloat(sale.TotalNetAmount),
                TotalVATAmount: parseFloat(sale.TotalVATAmount),
                TotalGrossAmount: parseFloat(sale.TotalGrossAmount),
                SaleStatus: sale.SaleStatus,
            };
            await axios.post('http://localhost:5069/api/Sales', payload);

            addNotification(
                'add',
                `Added new sale for Client ID: ${payload.ClientID}`,
                '/sales/addSale'
            );

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Sale added successfully 🚀',
                position: 'top',
                visibilityTime: 4000,
            });

            // Resetowanie formularza
            setSale({
                ClientID: '',
                SaleDate: new Date(),
                TotalNetAmount: '',
                TotalVATAmount: '',
                TotalGrossAmount: '',
                SaleStatus: '',
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to add Sale. Please try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Sale</Text>

            {/* Dropdown dla klientów */}
            <Text style={styles.label}>Client</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={sale.ClientID}
                    onValueChange={(value) => handleInputChange('ClientID', value.toString())}
                >
                    <Picker.Item label="Select a Client" value="" />
                    {clients.map((client) => (
                        <Picker.Item
                            key={client.clientID}
                            label={`${client.companyName} (${client.nip})`}
                            value={client.clientID.toString()} // Przechowuj jako string
                        />
                    ))}
                </Picker>
            </View>

            {/* Date Picker */}
            <Text style={styles.label}>Sale Date</Text>
            <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
            >
                <Text>{sale.SaleDate.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={sale.SaleDate} // Ustaw początkową wartość jako aktualną datę
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false); // Zamknij picker
                        if (selectedDate) {
                            handleInputChange('SaleDate', selectedDate); // Aktualizuj stan
                        }
                    }}
                />
            )}

            {/* Total Net Amount */}
            <Text style={styles.label}>Total Net Amount</Text>
            <TextInput
                placeholder="Enter Total Net Amount"
                style={styles.input}
                value={sale.TotalNetAmount}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalNetAmount', text)}
            />

            {/* Total VAT Amount */}
            <Text style={styles.label}>Total VAT Amount</Text>
            <TextInput
                placeholder="Enter Total VAT Amount"
                style={styles.input}
                value={sale.TotalVATAmount}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalVATAmount', text)}
            />

            {/* Total Gross Amount */}
            <Text style={styles.label}>Total Gross Amount</Text>
            <TextInput
                placeholder="Enter Total Gross Amount"
                style={styles.input}
                value={sale.TotalGrossAmount}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('TotalGrossAmount', text)}
            />

            {/* Sale Status */}
            <Text style={styles.label}>Sale Status</Text>
            <TextInput
                placeholder="Enter Sale Status"
                style={styles.input}
                value={sale.SaleStatus}
                onChangeText={(text) => handleInputChange('SaleStatus', text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
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
