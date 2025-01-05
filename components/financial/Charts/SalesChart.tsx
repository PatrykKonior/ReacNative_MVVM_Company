import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Pie, Line } from 'react-chartjs-2';
import { fetchSalesData, processSalesPieChartData, processSalesLineChartData } from '../Functions/dataProcessing';

interface SalesChartProps {
    month: string;
    year: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ month, year }) => {
    // Stany dla danych
    const [pieChartData, setPieChartData] = useState<any>(null);
    const [lineChartData, setLineChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setNoData(false);

            try {
                const sales = await fetchSalesData(month, year);

                if (sales.length === 0) {
                    setNoData(true);
                } else {
                    // Przetwarzanie danych dla wykresów
                    setPieChartData(processSalesPieChartData(sales));
                    setLineChartData(processSalesLineChartData(sales));
                }
            } catch (error) {
                console.error('Error loading sales chart data:', error);
                setNoData(true);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [month, year]);

    // Obsługa ładowania
    if (loading) {
        return <ActivityIndicator size="large" color="#034C8C" />;
    }

    // Obsługa braku danych
    if (noData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available for this period.</Text>
                <Text style={styles.noDataSubText}>Please select a different month or year.</Text>
            </View>
        );
    }

    // Renderowanie wykresów
    return (
        <View style={styles.container}>
            {/* Wykres kołowy - statusy sprzedaży */}
            <Text style={styles.chartTitle}>Sales Status</Text>
            <View style={styles.chartContainer}>
                <Pie
                    data={pieChartData}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#034C8C',
                                    boxWidth: 15,
                                    padding: 15,
                                    usePointStyle: true,
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                    },
                                },
                            },
                        },
                    }}
                />
            </View>

            {/* Wykres liniowy - sprzedaż w czasie */}
            <Text style={styles.chartTitle}>Sales Over Time</Text>
            <View style={styles.chartContainer}>
                <Line
                    data={lineChartData}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#034C8C',
                                    font: {
                                        size: 12,
                                        weight: 'bold',
                                    },
                                },
                            },
                            y: {
                                ticks: {
                                    color: '#034C8C',
                                    font: {
                                        size: 12,
                                        weight: 'bold',
                                    },
                                },
                            },
                        },
                    }}
                />
            </View>
        </View>
    );
};

// Style
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    chartContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
    },
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#034C8C',
    },
    noDataSubText: {
        fontSize: 14,
        color: '#034C8C',
        marginTop: 5,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#034C8C',
    },
});

export default SalesChart;
