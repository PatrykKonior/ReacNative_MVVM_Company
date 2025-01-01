import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Przykładowe dane
const initialData = [
    {
        id: '1',
        title: 'Foundation Work',
        date: '2023-12-01',
        isOverdue: true,
        type: 'task',
    },
    {
        id: '2',
        title: 'Invoice Payment',
        date: '2024-01-05',
        isOverdue: false,
        type: 'invoice',
    },
    {
        id: '3',
        title: 'Renovation Project',
        date: '2023-11-20',
        isOverdue: true,
        type: 'task',
    },
    {
        id: '4',
        title: 'Final Payment',
        date: '2024-12-28',
        isOverdue: false,
        type: 'invoice',
    },
];

// Funkcja do pobrania odpowiedniej ikony
const getIcon = (type: string, isOverdue: boolean) => {
    const iconColor = isOverdue ? '#FAD2D2' : '#FFFFFF';
    if (type === 'invoice') {
        return <FontAwesome5 name="file-invoice-dollar" size={24} color={iconColor} />;
    }
    return <MaterialIcons name="assignment" size={24} color={iconColor} />;
};

// Funkcja eksportu do CSV
const exportToCSV = async (data: any[]) => {
    try {
        // Nagłówki CSV
        const headers = 'ID,Title,Date,Status,Type\n';

        // Przekształcenie danych
        const rows = data.map(item =>
            `${item.id},"${item.title}",${item.date},${item.isOverdue ? 'Overdue' : 'On Time'},${item.type}`
        );

        const csvContent = headers + rows.join('\n');

        // Tworzenie pliku
        const fileUri = FileSystem.documentDirectory + 'deadline_report.csv';
        await FileSystem.writeAsStringAsync(fileUri, csvContent);

        // Udostępnienie pliku
        await Sharing.shareAsync(fileUri, {
            mimeType: 'text/csv',
            dialogTitle: 'Export Report',
            UTI: 'public.comma-separated-values-text',
        });
    } catch (error) {
        console.error('Export Error:', error);
    }
};

export default function DeadlineMonitoring() {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        // Sortowanie danych
        const sortedData = [...initialData].sort((a, b) => {
            if (a.isOverdue && !b.isOverdue) return -1;
            if (!a.isOverdue && b.isOverdue) return 1;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        setData(sortedData);
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity>
            <View style={[
                styles.card,
                item.isOverdue && styles.overdueContainer // Styl dla opóźnionych
            ]}>
                <View style={[
                    styles.iconContainer,
                    item.isOverdue && styles.overdueIconContainer // Czerwone tło ikony
                ]}>
                    {getIcon(item.type, item.isOverdue)}
                </View>
                <View style={styles.textContainer}>
                    <Text style={[
                        styles.cardTitle,
                        item.isOverdue && styles.overdueText // Czerwony tekst dla opóźnionych
                    ]}>
                        {item.title}
                    </Text>
                    <Text style={[
                        styles.cardSubtitle,
                        item.isOverdue && styles.overdueText // Czerwony tekst dla daty
                    ]}>
                        {item.date}
                    </Text>
                    {item.isOverdue && (
                        <Text style={styles.overdueLabel}>Overdue</Text> // Etykieta "Overdue"
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

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#465954',
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        paddingVertical: 10,
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
        backgroundColor: '#FAD2D2', // Jasny czerwony kolor tła
        borderColor: '#BB4444', // Delikatne bordowe obramowanie
        borderWidth: 2, // Grubsze obramowanie
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
        backgroundColor: '#BB4444', // Czerwone tło ikony dla opóźnionych
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#465954',
    },
    overdueText: {
        color: '#BB4444', // Kolor czerwony dla tekstu
        fontWeight: 'bold',
    },
    overdueLabel: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#BB4444', // Tekst "Overdue"
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
});
