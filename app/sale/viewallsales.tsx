import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type Sale = {
    saleID: number;
    clientID?: number;
    clientName: string;
    clientNIP: string;
    clientRegon: string;
    saleDate?: string;
    totalNetAmount?: number;
    totalVATAmount?: number;
    totalGrossAmount?: number;
    saleStatus: string;
};

export default function ViewAllSales() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

    // Fetch sales data from backend
    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:5069/api/Sales');
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const handleEdit = (sale: Sale) => {
        setSelectedSale(sale);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (selectedSale) {
            try {
                await axios.put(`http://localhost:5069/api/Sales/${selectedSale.saleID}`, selectedSale);
                setSales((prevSales) =>
                    prevSales.map((sale) =>
                        sale.saleID === selectedSale.saleID ? selectedSale : sale
                    )
                );
                setIsEditing(false);
                setSelectedSale(null);
            } catch (error) {
                console.error('Error updating sale:', error);
            }
        }
    };

    const handleDelete = async (saleID: number) => {
        try {
            await axios.delete(`http://localhost:5069/api/Sales/${saleID}`);
            setSales((prevSales) => prevSales.filter((sale) => sale.saleID !== saleID));
            alert(`Sale ID ${saleID} deleted successfully!`);
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };

    const renderItem = ({ item }: { item: Sale }) => (
        <View style={styles.saleCard}>
            <View style={styles.saleContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="file-invoice-dollar" size={24} color="#465954" />
                    <Text style={styles.saleTitle}>Sale ID: {item.saleID}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.details}>Client Name: {item.clientName || 'N/A'}</Text>
                    <Text style={styles.details}>NIP: {item.clientNIP || 'N/A'}</Text>
                    <Text style={styles.details}>REGON: {item.clientRegon || 'N/A'}</Text>
                    <Text style={styles.details}>Date: {item.saleDate || 'N/A'}</Text>
                    <Text style={styles.details}>
                        Net Amount: ${item.totalNetAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        VAT Amount: ${item.totalVATAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>
                        Gross Amount: ${item.totalGrossAmount?.toFixed(2) || 'N/A'}
                    </Text>
                    <Text style={styles.details}>Status: {item.saleStatus}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.saleID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sales</Text>
            <FlatList
                data={sales}
                renderItem={renderItem}
                keyExtractor={(item) => item.saleID.toString()}
                contentContainerStyle={styles.listContainer}
            />

            {/* Modal for editing */}
            {isEditing && selectedSale && (
                <Modal visible={isEditing} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Sale</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Client ID"
                                value={selectedSale.clientID?.toString() || ''}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    setSelectedSale({
                                        ...selectedSale,
                                        clientID: parseInt(text) || undefined,
                                    })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Sale Date (YYYY-MM-DD)"
                                value={selectedSale.saleDate || ''}
                                onChangeText={(text) =>
                                    setSelectedSale({ ...selectedSale, saleDate: text })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Net Amount"
                                value={selectedSale.totalNetAmount?.toString() || ''}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    setSelectedSale({
                                        ...selectedSale,
                                        totalNetAmount: parseFloat(text),
                                    })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="VAT Amount"
                                value={selectedSale.totalVATAmount?.toString() || ''}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    setSelectedSale({
                                        ...selectedSale,
                                        totalVATAmount: parseFloat(text),
                                    })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Gross Amount"
                                value={selectedSale.totalGrossAmount?.toString() || ''}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    setSelectedSale({
                                        ...selectedSale,
                                        totalGrossAmount: parseFloat(text),
                                    })
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Sale Status"
                                value={selectedSale.saleStatus || ''}
                                onChangeText={(text) =>
                                    setSelectedSale({ ...selectedSale, saleStatus: text })
                                }
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setIsEditing(false);
                                    setSelectedSale(null);
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    saleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    saleContent: {
        flex: 1,
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    saleTitle: {
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
        alignItems: 'center',
    },
    actionIcon: {
        marginLeft: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#CCC',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#0D0D0D',
        fontSize: 16,
    },
});
