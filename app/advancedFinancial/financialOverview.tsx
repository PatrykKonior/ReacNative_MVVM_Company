import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { FontAwesome5 } from '@expo/vector-icons';
import ProjectsCharts from "@/components/financial/Charts/ProjectsChart";
import SalesCharts from "@/components/financial/Charts/SalesChart";
import PaymentsChart from "@/components/financial/Charts/PaymentsChart";
import InvoicesChart from "@/components/financial/Charts/InvoicesChart";
import ProjectsOverview from "@/components/financial/Overviews/ProjectsOverview";
import SalesOverview from "@/components/financial/Overviews/SalesOverview";
import PaymentsOverview from "@/components/financial/Overviews/PaymentsOverview";
import InvoicesOverview from "@/components/financial/Overviews/InvoicesOverview";
import { fetchProjectsData } from "@/components/financial/Functions/dataProcessing";
import { fetchSalesData } from "@/components/financial/Functions/dataProcessing";
import { fetchPaymentsData } from "@/components/financial/Functions/dataProcessing";
import { fetchInvoicesData } from "@/components/financial/Functions/dataProcessing";
import { processOverviewData, OverviewData } from "@/components/financial/Functions/dataProjectsOverviewProcessing"
import { processSalesOverviewData } from "@/components/financial/Functions/dataSalesOverviewProcessing";
import { processPaymentsOverviewData } from "@/components/financial/Functions/dataPaymentsOverviewProcessing";
import { processInvoicesOverviewData } from "@/components/financial/Functions/dataInvoicesOverviewProcessing";

// Rejestracja komponentów Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

export default function FinancialOverview() {
    const [selectedCategory, setSelectedCategory] = useState('Projects'); // Domyślna kategoria
    const [selectedMonth, setSelectedMonth] = useState('1'); // Domyślny miesiąc
    const [selectedYear, setSelectedYear] = useState('2024'); // Domyślny rok
    const [overviewData, setOverviewData] = useState<OverviewData | null>(null); // Projects
    const [salesOverviewData, setSalesOverviewData] = useState<any | null>(null); // Sales
    const [paymentsOverviewData, setPaymentsOverviewData] = useState<any | null>(null); // Payments
    const [invoicesOverviewData, setInvoicesOverviewData] = useState<any | null>(null); // Invoices
    const [loading, setLoading] = useState(false);

    // Funkcja do pobrania danych na podstawie daty
    const loadOverviewData = async () => {
        setLoading(true);
        try {
            const projects = await fetchProjectsData(selectedMonth, selectedYear);
            const processedData = processOverviewData(projects); // Przetwarzanie danych
            setOverviewData(processedData); // Ustawienie przetworzonych danych
        } catch (error) {
            console.error('Error loading overview data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Funkcja do pobrania danych dla Sales
    const loadSalesOverviewData = async () => {
        setLoading(true);
        try {
            const sales = await fetchSalesData(selectedMonth, selectedYear);
            const processedData = processSalesOverviewData(sales);
            setSalesOverviewData(processedData);
        } catch (error) {
            console.error('Error loading sales data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Funkcja do pobrania danych dla Payments
    const loadPaymentsOverviewData = async () => {
        setLoading(true);
        try {
            const payments = await fetchPaymentsData(selectedMonth, selectedYear);
            const processedData = processPaymentsOverviewData(payments); // Przetwarzanie danych
            setPaymentsOverviewData(processedData); // Ustawienie przetworzonych danych
        } catch (error) {
            console.error('Error loading payments data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Funkcja do pobrania danych dla Invoices
    const loadInvoicesOverviewData = async () => {
        setLoading(true);
        try {
            const invoices = await fetchInvoicesData(selectedMonth, selectedYear);
            const processedData = processInvoicesOverviewData(invoices);
            setInvoicesOverviewData(processedData);
        } catch (error) {
            console.error('Error loading invoices data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Efekt dla załadowania danych po zmianie daty lub kategorii
    useEffect(() => {
        if (selectedCategory === 'Projects') {
            loadOverviewData();
        } else if (selectedCategory === 'Sales') {
            loadSalesOverviewData();
        } else if (selectedCategory === 'Payments') {
            loadPaymentsOverviewData();
        } else if (selectedCategory === 'Invoices') {
            loadInvoicesOverviewData();
        }
    }, [selectedMonth, selectedYear, selectedCategory]);


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
                        onPress={() => setSelectedCategory(category)} // Ustawienie wybranej kategorii
                    >
                        <Text style={styles.tileText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Miesiąc i Rok */}
            <View style={styles.categoryContainer}>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedMonth(value)} // Zmiana miesiąca
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
                        onValueChange={(value) => setSelectedYear(value)} // Zmiana roku
                        items={[2022, 2023, 2024, 2025].map((year) => ({
                            label: `${year}`,
                            value: `${year}`,
                        }))}
                        style={pickerStyles}
                        placeholder={{ label: `Year: ${selectedYear}`, value: selectedYear }}
                    />
                </View>
            </View>

            {/* Wykresy i podsumowanie dla Projects */}
            {selectedCategory === 'Projects' && (
                <>
                    <ProjectsCharts month={selectedMonth} year={selectedYear} />
                    {loading ? (
                        <ActivityIndicator size="large" color="#034C8C" />
                    ) : (
                        overviewData && <ProjectsOverview overviewData={overviewData} />
                    )}
                </>
            )}
            {/* Wykresy i podsumowanie dla Sales */}
            {selectedCategory === 'Sales' && (
                <>
                    <SalesCharts month={selectedMonth} year={selectedYear} />
                    {loading ? (
                        <ActivityIndicator size="large" color="#034C8C" />
                    ) : (
                        salesOverviewData && <SalesOverview overviewData={salesOverviewData} />
                    )}
                </>
            )}
            {/* Wykresy i podsumowanie dla Payments */}
            {selectedCategory === 'Payments' && (
                <>
                    <PaymentsChart month={selectedMonth} year={selectedYear} />
                    {loading ? (
                        <ActivityIndicator size="large" color="#034C8C" />
                    ) : (
                        paymentsOverviewData && <PaymentsOverview overviewData={paymentsOverviewData} />
                    )}
                </>
            )}
            {selectedCategory === 'Invoices' && (
                <>
                    <InvoicesChart month={selectedMonth} year={selectedYear} />
                    {loading ? (
                        <ActivityIndicator size="large" color="#034C8C" />
                    ) : (
                        invoicesOverviewData && <InvoicesOverview overviewData={invoicesOverviewData} />
                    )}
                </>
            )}
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



