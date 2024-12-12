import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Client = {
    clientID: number;
    companyName: string;
    nip: string;
    regon: string;
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

    const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Client[]>('/clients');
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

    const handleEdit = (id: number) => {
        alert(`Edit Client #${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/clients/${id}`);
            setClients((prevClients) => prevClients.filter((client) => client.clientID !== id));
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
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.clientID)}>
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
});
