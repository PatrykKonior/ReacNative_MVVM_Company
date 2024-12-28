import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNotifications } from '@/contexts/notificationsContext';

type Material = {
    materialID: number;
    materialName: string;
    materialDescription: string;
    unitPrice: number | null;
    vatRate: number | null;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function ViewAllMaterials() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState<Material | null>(null);

    const { addNotification } = useNotifications();

    const fetchMaterials = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Material[]>('/materials');
            setMaterials(response.data);
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data || 'An error occurred while fetching materials'
                : 'Unknown error occurred';
            console.error(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (material: Material) => {
        setSelectedMaterial(material);
        setFormState(material);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!formState) return;

        try {
            await apiClient.put(`/materials/${formState.materialID}`, formState);
            addNotification('edit', `Updated Material: ${formState.materialName}`, '/materials/viewAllMaterials');
            setMaterials((prevMaterials) =>
                prevMaterials.map((mat) =>
                    mat.materialID === formState.materialID ? { ...formState } : mat
                )
            );
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Updated Material: ${formState.materialName}`,
                position: 'top',
                visibilityTime: 4000,
            });
            setModalVisible(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not update Material. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/materials/${id}`);
            setMaterials((prevMaterials) =>
                prevMaterials.filter((material) => material.materialID !== id)
            );
            addNotification('delete', `Deleted Material ID: ${id}`, '/materials/viewAllMaterials');
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Deleted material ID: ${id}`,
                position: 'top',
                visibilityTime: 4000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not delete Material. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    const handleInputChange = (field: keyof Material, value: string) => {
        if (formState) {
            setFormState({
                ...formState,
                [field]: field === 'unitPrice' || field === 'vatRate' ? Number(value) : value,
            });
        }
    };

    const renderItem = ({ item }: { item: Material }) => (
        <View style={styles.materialCard}>
            <View style={styles.materialContent}>
                <View style={styles.cardHeader}>
                    <FontAwesome5 name="boxes" size={24} color="#465954" />
                    <Text style={styles.materialName}>{item.materialName}</Text>
                </View>
                <Text style={styles.details}>Description: {item.materialDescription}</Text>
                <Text style={styles.details}>Unit Price: ${item.unitPrice?.toFixed(2) || '0.00'}</Text>
                <Text style={styles.details}>VAT Rate: {item.vatRate || '0.00'}%</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                    <MaterialIcons name="edit" size={24} color="#0D0D0D" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.materialID)}>
                    <Ionicons name="trash" size={24} color="#F20505" style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Materials</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={materials}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.materialID.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Material</Text>
                        {formState && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Material Name"
                                    value={formState.materialName}
                                    onChangeText={(text) => handleInputChange('materialName', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Material Description"
                                    value={formState.materialDescription}
                                    onChangeText={(text) =>
                                        handleInputChange('materialDescription', text)
                                    }
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Unit Price"
                                    value={formState.unitPrice?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('unitPrice', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="VAT Rate"
                                    value={formState.vatRate?.toString() || ''}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleInputChange('vatRate', text)}
                                />
                                <View style={styles.modalActions}>
                                    <Button
                                        title="Cancel"
                                        color="#8B0000"
                                        onPress={() => setModalVisible(false)}
                                    />
                                    <Button title="Save" onPress={handleSave} />
                                </View>
                            </>
                        )}
                    </View>
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
    materialCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EBF2EB',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    materialContent: {
        flex: 1,
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    materialName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
        marginLeft: 10,
    },
    details: {
        fontSize: 14,
        color: '#465954',
        marginTop: 5,
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
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
