import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Pie } from 'react-chartjs-2';
import RNPickerSelect from 'react-native-picker-select';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FontAwesome5 } from '@expo/vector-icons';

// Rejestracja komponentów Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function FinancialOverview() {
    const [selectedCategory, setSelectedCategory] = useState('Projects');
    const [selectedMonth, setSelectedMonth] = useState('1');
    const [selectedYear, setSelectedYear] = useState('2024');

    // Dane do wykresu
    const chartData = {
        labels: ['Materials', 'Salaries', 'Utilities', 'Misc'],
        datasets: [
            {
                data: [5000, 7000, 2000, 1500],
                backgroundColor: ['#034C8C', '#356fa3', '#6793ba', '#012646'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
    };

    const totalAmount = chartData.datasets[0].data.reduce((sum, item) => sum + item, 0);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Financial Overview</Text>

            {/* Kategorie */}
            <View style={styles.categoryContainer}>
                {['Projects', 'Sales', 'Payments', 'Invoices'].map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.tile,
                            { backgroundColor: selectedCategory === category ? '#034C8C' : '#356fa3' },
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={styles.tileText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Miesiąc i Rok */}
            <View style={styles.categoryContainer}>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedMonth(value)}
                        items={[...Array(12).keys()].map((i) => ({
                            label: `Month ${i + 1}`,
                            value: `${i + 1}`,
                        }))}
                        style={pickerStyles}
                        placeholder={{ label: `Month: ${selectedMonth}`, value: selectedMonth }}
                    />
                </View>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedYear(value)}
                        items={[2022, 2023, 2024, 2025].map((year) => ({
                            label: `${year}`,
                            value: `${year}`,
                        }))}
                        style={pickerStyles}
                        placeholder={{ label: `Year: ${selectedYear}`, value: selectedYear }}
                    />
                </View>
            </View>

            {/* Wykres i legenda */}
            <View style={[styles.chartContainer, { width: 400, height: 400, alignSelf: 'center' }]}>
                <Pie
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom', // Przeniesiona legenda pod wykres
                                labels: {
                                    color: '#034C8C', // Białe litery
                                    boxWidth: 15, // Rozmiar ikon
                                    padding: 15,
                                    usePointStyle: true, // Okrągłe ikony zamiast kwadratów
                                    font: {
                                        size: 14, // Powiększenie czcionki
                                        weight: 'bold', // Pogrubienie
                                    },
                                },
                            },
                        },
                        layout: {
                            padding: {
                                top: 10,
                                bottom: 10,
                            },
                        },
                    }}
                />
            </View>

            {/* Podsumowanie */}
            <View style={styles.overviewContainer}>
                <Text style={styles.overviewTitle}>Overview</Text>
                <View style={styles.overviewContent}>
                    <View style={styles.overviewColumn}>
                        {chartData.labels.slice(0, 2).map((label, index) => (
                            <View key={label} style={styles.detailsRow}>
                                <FontAwesome5 name="circle" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                                <Text style={styles.detailsRowText}>
                                    {label}: <Text style={styles.amountText}>${chartData.datasets[0].data[index].toFixed(2)}</Text>
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.overviewColumn}>
                        {chartData.labels.slice(2).map((label, index) => (
                            <View key={label} style={styles.detailsRow}>
                                <FontAwesome5 name="circle" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                                <Text style={styles.detailsRowText}>
                                    {label}: <Text style={styles.amountText}>${chartData.datasets[0].data[index].toFixed(2)}</Text>
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
            </View>
        </ScrollView>
    );
}

// Style
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#034C8C',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tile: {
        flex: 1,
        margin: 5,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    tileText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    pickerContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#6793ba',
        borderRadius: 8,
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    overviewContainer: {
        padding: 16,
        backgroundColor: '#356fa3',
        borderRadius: 8,
    },
    overviewColumn: {
        flex: 1,
        paddingHorizontal: 10,
    },
    overviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    overviewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsRowText: {
        fontSize: 14,
        color: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountText: {
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#FFFFFF',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10,
        color: '#FFFFFF',
    },
});

const pickerStyles = {
    inputIOS: {
        fontSize: 16,
        color: '#FFFFFF', // Biały tekst
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#6793ba', // Tło
        borderRadius: 8, // Zaokrąglone rogi
    },
    inputAndroid: {
        fontSize: 16,
        color: '#FFFFFF', // Biały tekst
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#6793ba', // Tło
        borderRadius: 8, // Zaokrąglone rogi
    },
    placeholder: {
        color: '#FFFFFF', // Kolor tekstu w placeholderze
    },
    viewContainer: {
        backgroundColor: '#6793ba', // Tło dla całego kontenera
        borderRadius: 8,
    },
    modalViewBottom: {
        backgroundColor: '#6793ba', // Tło dla listy rozwijanej
    },
    modalViewMiddle: {
        backgroundColor: '#6793ba',
    },
    modalViewTop: {
        backgroundColor: '#6793ba',
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
};



