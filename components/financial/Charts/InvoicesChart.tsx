import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Pie, Bar } from 'react-chartjs-2';
import {
    fetchInvoicesData,
    processInvoicesPieChartData,
    processInvoicesBarChartData,
} from '../Functions/dataProcessing';

interface InvoicesChartProps {
    month: string;
    year: string;
}

export default function InvoicesChart({ month, year }: InvoicesChartProps) {
    const [pieChartData, setPieChartData] = useState<any>(null);
    const [barChartData, setBarChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [invoicesInfo, setInvoicesInfo] = useState<
        { date: string; status: string; amount: number }[]
    >([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setNoData(false);

            try {
                const invoices = await fetchInvoicesData(month, year);

                if (invoices.length === 0) {
                    setNoData(true);
                } else {
                    // Przetwarzanie danych
                    setPieChartData(processInvoicesPieChartData(invoices));
                    setBarChartData(processInvoicesBarChartData(invoices));

                    // Szczegóły faktur
                    const invoiceDetails = invoices.map((invoice) => ({
                        date: invoice.invoiceDate,
                        status: invoice.invoiceStatus,
                        amount: invoice.totalAmount,
                    }));
                    setInvoicesInfo(invoiceDetails);
                }
            } catch (error) {
                console.error('Error loading invoice charts data:', error);
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
            {/* Faktury w wybranym okresie */}
            <View style={styles.invoicesInfoContainer}>
                <Text style={styles.invoicesInfoTitle}>Invoices in this period:</Text>
                {invoicesInfo.map((invoice, index) => (
                    <Text key={index} style={styles.invoiceDetails}>
                        • {invoice.date ? invoice.date.split('T')[0] : 'N/A'} - {invoice.status} (${invoice.amount})
                    </Text>
                ))}
            </View>

            {/* Wykres kołowy */}
            <Text style={styles.chartTitle}>Invoice Amounts Overview</Text>
            <View style={styles.chartContainer}>
                <Pie
                    data={pieChartData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem: any) => {
                                        const status = pieChartData.labels[tooltipItem.dataIndex];
                                        const filteredInvoices = invoicesInfo.filter(
                                            (inv) => inv.status === status
                                        );
                                        if (!filteredInvoices || filteredInvoices.length === 0) {
                                            return 'No data available';
                                        }
                                        return filteredInvoices
                                            .map((inv) => `${inv.date}: $${inv.amount}`)
                                            .join('\n');
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
            <Text style={styles.chartTitle}>Paid vs Unpaid Invoices</Text>
            <View style={styles.chartContainer}>
                <Bar
                    data={barChartData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem: any) => {
                                        const status = barChartData.labels[tooltipItem.dataIndex] || 'Unknown';
                                        const invoicesList = barChartData.tooltipData[status] || [];
                                        if (invoicesList.length === 0) {
                                            return `${status}: No invoices available`;
                                        }
                                        return invoicesList.join('\n');
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
    invoicesInfoContainer: {
        marginBottom: 15,
    },
    invoicesInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#034C8C',
        marginBottom: 5,
    },
    invoiceDetails: {
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
