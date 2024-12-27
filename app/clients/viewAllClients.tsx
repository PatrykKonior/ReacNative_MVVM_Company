import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNotifications } from '@/contexts/notificationsContext';

type Client = {
    clientID: number;
    companyName: string;
    nip: string;
    regon: string;
    phoneNumber: string;
    email: string;
    contactPersonName: string;
};

type Errors = {
    companyName?: string;
    nip?: string;
    regon?: string;
    phoneNumber?: string;
    email?: string;
    contactPersonName?: string;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    const { addNotification } = useNotifications();

    const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Client[]>('/Clients');
            setClients(response.data);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while fetching clients'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setErrors({});
    };

    const handleSave = async () => {
        if (!editingClient) return;

        const newErrors: Errors = {};
        if (!editingClient.companyName.trim()) newErrors.companyName = 'Company Name is required';
        if (!editingClient.nip.trim()) newErrors.nip = 'NIP is required';
        if (!editingClient.regon.trim()) newErrors.regon = 'Regon is required';
        if (!editingClient.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        if (!editingClient.email.trim()) newErrors.email = 'Email is required';
        if (!editingClient.contactPersonName.trim()) newErrors.contactPersonName = 'Contact Person Name is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await apiClient.put(`/Clients/${editingClient.clientID}`, editingClient); // Poprawiony endpoint
            addNotification('edit', `Updated client: ${editingClient.companyName}`, '/clients/viewAllClients'); // Powiadomienie
            setEditingClient(null);
            fetchClients();
            alert('Client updated successfully!');
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while updating the client'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/Clients/${id}`);
            setClients((prevClients) => prevClients.filter((client) => client.clientID !== id));
            addNotification('delete', `Deleted client with ID: ${id}`, '/clients/viewAllClients'); // Powiadomienie
            alert(`Deleted Client #${id}`);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while deleting the client'
                : 'Unknown error occurred';
            console.error(errorMessage);
            alert(errorMessage);
        }
    };

    const renderItem = ({ item }: { item: Client }) => (
        <View style={styles.clientCard}>
            <View style={styles.cardHeader}>
                <FontAwesome5 name="building" size={24} color="#465954" />
                <Text style={styles.companyName}>{item.companyName}</Text>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.details}>NIP: {item.nip}</Text>
                <Text style={styles.details}>Regon: {item.regon}</Text>
                <Text style={styles.details}>Phone: {item.phoneNumber}</Text>
                <Text style={styles.details}>Email: {item.email}</Text>
                <Text style={styles.details}>Contact Person: {item.contactPersonName}</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.clientID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clients</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={clients}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.clientID.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            {/* Modal for Editing */}
            <Modal visible={!!editingClient} animationType="slide">
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Client</Text>

                    {editingClient && (
                        <>
                            <TextInput
                                style={[styles.input, errors.companyName ? styles.errorBorder : null]}
                                placeholder="Company Name"
                                value={editingClient.companyName}
                                onChangeText={(text) => setEditingClient({ ...editingClient, companyName: text })}
                            />
                            {errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}

                            <TextInput
                                style={[styles.input, errors.nip ? styles.errorBorder : null]}
                                placeholder="NIP"
                                value={editingClient.nip}
                                onChangeText={(text) => setEditingClient({ ...editingClient, nip: text })}
                            />
                            {errors.nip && <Text style={styles.errorText}>{errors.nip}</Text>}

                            <TextInput
                                style={[styles.input, errors.regon ? styles.errorBorder : null]}
                                placeholder="Regon"
                                value={editingClient.regon}
                                onChangeText={(text) => setEditingClient({ ...editingClient, regon: text })}
                            />
                            {errors.regon && <Text style={styles.errorText}>{errors.regon}</Text>}

                            <TextInput
                                style={[styles.input, errors.phoneNumber ? styles.errorBorder : null]}
                                placeholder="Phone Number"
                                value={editingClient.phoneNumber}
                                onChangeText={(text) => setEditingClient({ ...editingClient, phoneNumber: text })}
                            />
                            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                            <TextInput
                                style={[styles.input, errors.email ? styles.errorBorder : null]}
                                placeholder="Email"
                                value={editingClient.email}
                                onChangeText={(text) => setEditingClient({ ...editingClient, email: text })}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            <TextInput
                                style={[styles.input, errors.contactPersonName ? styles.errorBorder : null]}
                                placeholder="Contact Person Name"
                                value={editingClient.contactPersonName}
                                onChangeText={(text) => setEditingClient({ ...editingClient, contactPersonName: text })}
                            />
                            {errors.contactPersonName && <Text style={styles.errorText}>{errors.contactPersonName}</Text>}

                            <View style={styles.actionContainer}>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={handleSave}
                                >
                                    <Text style={styles.addButtonText}>Save</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.addButton, { backgroundColor: '#F20505' }]}
                                    onPress={() => setEditingClient(null)}
                                >
                                    <Text style={styles.addButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
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
    clientCard: {
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
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    companyName: {
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
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    actionIcon: {
        marginLeft: 15,
    },
    input: {
        height: 50,
        borderColor: '#BBBFB4',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#0D0D0D',
        backgroundColor: '#F9F9F9',
    },
    errorBorder: {
        borderColor: '#8B0000',
    },
    errorText: {
        color: '#8B0000',
        fontSize: 12,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
