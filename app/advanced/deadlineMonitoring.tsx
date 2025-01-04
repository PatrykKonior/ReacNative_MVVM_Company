import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';

type Invoice = {
    invoiceID: number;
    saleID: number | null;
    invoiceDate: string | null;
    paymentDueDate: string | null;
    invoiceStatus: string;
    totalAmount: number | null;
};

type Task = {
    taskID: number;
    taskName: string;
    taskDescription: string;
    taskStatus: string;
    estimatedHours: number | null;
    projectID?: number;
    assignedEmployeeID?: number;
    taskStartDate?: string;
    taskEndDate?: string;
};

type CombinedItem = {
    id: string;
    title: string;
    date: string | null;
    status: string;
    type: 'invoice' | 'task';
    isOverdue: boolean;
    amount?: number | null;
    description?: string;
    assignedEmployeeID?: number;
};

// API Client
const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Formatowanie daty
const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return date.split('T')[0];
};

// Eksport danych do CSV
const exportToCSV = async (data: CombinedItem[]) => {
    try {
        if (data.length === 0) {
            Toast.show({
                type: 'info',
                text1: 'Export Info',
                text2: 'No data to export!',
                position: 'top',
                visibilityTime: 4000,
            });
            return;
        }

        // Tworzenie danych CSV
        const headers = 'ID,Title,Date,Status,Type,Amount,Description,Assigned To\n';
        const rows = data.map(item =>
            `${item.id},"${item.title}",${formatDate(item.date)},${item.status},${item.type},${item.amount || ''},"${item.description || ''}",${item.assignedEmployeeID || ''}`
        );

        const csvContent = headers + rows.join('\n');

        // Obsługa dla web
        if (Platform.OS === 'web') {
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'deadline_report.csv';
            link.click();

            window.URL.revokeObjectURL(url);

            // Sukces - Toast
            Toast.show({
                type: 'success',
                text1: 'Report shared successfully!',
                text2: 'Report exported successfully!',
                position: 'top',
                visibilityTime: 4000,
            });
        } else {
            // Obsługa dla Android/iOS
            const fileUri = FileSystem.documentDirectory + 'deadline_report.csv';
            await FileSystem.writeAsStringAsync(fileUri, csvContent);

            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/csv',
                dialogTitle: 'Export Report',
                UTI: 'public.comma-separated-values-text',
            });

            // Sukces - Toast
            Toast.show({
                type: 'success',
                text1: 'Report exported successfully!',
                text2: 'Report shared successfully!',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    } catch (error) {
        console.error('Export Error:', error);

        // Błąd - Toast
        Toast.show({
            type: 'error',
            text1: 'Export Failed',
            text2: 'An error occurred. Please try again!',
            position: 'top',
            visibilityTime: 4000,
        });
    }
};

// Funkcja do pobrania ikony
const getIcon = (type: string, isOverdue: boolean) => {
    const iconColor = isOverdue ? '#FAD2D2' : '#FFFFFF';
    if (type === 'invoice') {
        return <FontAwesome5 name="file-invoice-dollar" size={24} color={iconColor} />;
    }
    return <MaterialIcons name="assignment" size={24} color={iconColor} />;
};

export default function DeadlineMonitoring() {
    const [data, setData] = useState<CombinedItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Pobieranie faktur
                const invoiceResponse = await apiClient.get<Invoice[]>('/invoices');
                const invoices: CombinedItem[] = invoiceResponse.data
                    .filter((invoice) =>
                        !['opłacony', 'opłacona', 'opłacono'].includes(invoice.invoiceStatus.toLowerCase())
                    )
                    .map((invoice) => ({
                        id: `invoice-${invoice.invoiceID}`,
                        title: `Invoice #${invoice.invoiceID}`,
                        date: invoice.paymentDueDate || null,
                        status: invoice.invoiceStatus,
                        type: 'invoice',
                        isOverdue: invoice.paymentDueDate
                            ? new Date(invoice.paymentDueDate) < new Date()
                            : false,
                        amount: invoice.totalAmount,
                    }));


                // Pobieranie zadań
                const taskResponse = await apiClient.get<Task[]>('/tasks');
                const tasks: CombinedItem[] = taskResponse.data
                    .filter((task) =>
                        !['zakończone', 'zakończono'].includes(task.taskStatus.toLowerCase())
                    )
                    .map((task) => ({
                        id: `task-${task.taskID}`,
                        title: task.taskName,
                        date: task.taskEndDate || null,
                        status: task.taskStatus,
                        type: 'task',
                        isOverdue: task.taskEndDate
                            ? new Date(task.taskEndDate) < new Date()
                            : false,
                        description: task.taskDescription,
                        assignedEmployeeID: task.assignedEmployeeID,
                    }));

                // Połączenie danych i sortowanie
                const combinedData = [...invoices, ...tasks].sort((a, b) => {
                    if (a.isOverdue && !b.isOverdue) return -1;
                    if (!a.isOverdue && b.isOverdue) return 1;
                    return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
                });

                // Aktualizacja stanu
                setData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    // Renderowanie pojedynczego elementu
    const renderItem = ({ item }: { item: CombinedItem }) => (
        <TouchableOpacity>
            <View style={[
                styles.card,
                item.isOverdue && styles.overdueContainer
            ]}>
                <View style={[
                    styles.iconContainer,
                    item.isOverdue && styles.overdueIconContainer
                ]}>
                    {getIcon(item.type, item.isOverdue)}
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.cardTitle, item.isOverdue && styles.overdueText]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.cardSubtitle, item.isOverdue && styles.overdueText]}>
                        Due: {formatDate(item.date)}
                    </Text>
                    <Text>Status: {item.status}</Text>
                    {item.amount !== undefined && (
                        <Text>Amount: ${item.amount?.toFixed(2) || '0.00'}</Text>
                    )}
                    {item.description && (
                        <Text>Description: {item.description}</Text>
                    )}
                    {item.assignedEmployeeID && (
                        <Text>Assigned To: {item.assignedEmployeeID}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deadline Monitoring</Text>
            <TouchableOpacity style={styles.exportButton} onPress={() => exportToCSV(data)}>
                <Text style={styles.exportButtonText}>Export to CSV</Text>
            </TouchableOpacity>
            {loading ? (
                <ActivityIndicator size="large" color="#465954" />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#465954',
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        paddingVertical: 10,
    },
    exportButton: {
        padding: 10,
        backgroundColor: '#88A29B',
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    exportButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#EBF2EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    overdueContainer: {
        backgroundColor: '#FAD2D2',
        borderColor: '#BB4444',
        borderWidth: 2,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#465954',
        marginRight: 15,
    },
    overdueIconContainer: {
        backgroundColor: '#BB4444',
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#465954',
    },
    overdueText: {
        color: '#BB4444',
        fontWeight: 'bold',
    },
});
