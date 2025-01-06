import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Pie, Bar } from 'react-chartjs-2';
import { fetchPaymentsData, processPaymentsPieChartData, processPaymentsBarChartData } from '../Functions/dataProcessing';

interface PaymentsChartProps {
    month: string;
    year: string;
}

export default function PaymentsChart({ month, year }: PaymentsChartProps) {
    const [pieChartData, setPieChartData] = useState<any>(null);
    const [barChartData, setBarChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [paymentsInfo, setPaymentsInfo] = useState<{ method: string; amount: number; date: string }[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setNoData(false);

            try {
                const payments = await fetchPaymentsData(month, year);

                if (payments.length === 0) {
                    setNoData(true);
                } else {
                    // Przetwarzanie danych
                    setPieChartData(processPaymentsPieChartData(payments));
                    setBarChartData(processPaymentsBarChartData(payments));

                    // Szczegóły płatności
                    const paymentDetails = payments.map((payment) => ({
                        method: payment.paymentMethod,
                        amount: payment.paymentAmount || 0,
                        date: payment.paymentDate,
                    }));
                    setPaymentsInfo(paymentDetails);
                }
            } catch (error) {
                console.error('Error loading payment charts data:', error);
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
            {/* Płatności w wybranym okresie */}
            <View style={styles.paymentsInfoContainer}>
                <Text style={styles.paymentsInfoTitle}>Payments in this period:</Text>
                {paymentsInfo.map((payment, index) => (
                    <Text key={index} style={styles.paymentDetails}>
                        • {payment.method} - ${payment.amount} (Date: {payment.date})
                    </Text>
                ))}
            </View>

            {/* Wykres kołowy */}
            <Text style={styles.chartTitle}>Payment Methods Overview</Text>
            <View style={styles.chartContainer}>
                <Pie
                    data={pieChartData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem: any) => {
                                        // Pobranie metody płatności na podstawie indeksu
                                        const paymentMethod = pieChartData.labels[tooltipItem.dataIndex];

                                        // Filtrowanie danych dla wybranej metody płatności
                                        const filteredPayments = paymentsInfo.filter((p) => p.method === paymentMethod);

                                        // Jeśli dane są puste lub nie istnieją, wyświetl komunikat
                                        if (!filteredPayments || filteredPayments.length === 0) {
                                            return 'No data available';
                                        }

                                        // Generowanie etykiet tooltipów
                                        return filteredPayments.map((p) => `${p.method || 'Unknown'}: $${p.amount || 0}`).join('\n');
                                    },
                                },
                            },
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

            {/* Wykres słupkowy */}
            <Text style={styles.chartTitle}>Payment Count by Method</Text>
            <View style={styles.chartContainer}>
                <Bar
                    data={barChartData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem: any) => {
                                        const method = barChartData.labels[tooltipItem.dataIndex] || 'Unknown';

                                        // Pobranie listy płatności
                                        const paymentsList = barChartData.tooltipData[method] || [];

                                        // Obsługa braku danych
                                        if (paymentsList.length === 0) {
                                            return `${method}: No payments available`;
                                        }

                                        // Wyświetlanie szczegółów
                                        return paymentsList.join('\n');
                                    },
                                },
                            },
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#034C8C',
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                    },
                                },
                            },
                            y: {
                                ticks: {
                                    color: '#034C8C',
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                    },
                                    stepSize: 1,
                                },
                            },
                        },
                    }}
                />
            </View>
        </View>
    );
}

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
    paymentsInfoContainer: {
        marginBottom: 15,
    },
    paymentsInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#034C8C',
        marginBottom: 5,
    },
    paymentDetails: {
        fontSize: 14,
        color: '#034C8C',
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#034C8C',
    },
});

