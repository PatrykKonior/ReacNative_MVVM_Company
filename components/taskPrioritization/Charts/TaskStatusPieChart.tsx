import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

// Rejestracja komponentów Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatusPieChart = () => {
    const data = {
        labels: ['Completed', 'In Progress', 'Overdue'],
        datasets: [
            {
                data: [5, 8, 3],
                backgroundColor: ['#96a7bb', '#355679', '#BB4444'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#011a34',
                    boxWidth: 15,
                    padding: 15,
                    usePointStyle: true,
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        const status = data.labels[tooltipItem.dataIndex]; // Nazwa statusu
                        const taskCount = data.datasets[0].data[tooltipItem.dataIndex]; // Liczba zadań
                        return `${status}: ${taskCount} tasks`;
                    },
                },
            },
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Task Status Overview</Text>
            <View style={styles.chartContainer}>
                <Pie data={data} options={options} />
            </View>
        </View>
    );
};

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
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#011a34',
    },
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#011a34',
    },
    noDataSubText: {
        fontSize: 14,
        color: '#011a34',
        marginTop: 5,
    },
    invoicesInfoContainer: {
        marginBottom: 15,
    },
    invoicesInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#011a34',
        marginBottom: 5,
    },
    invoiceDetails: {
        fontSize: 14,
        color: '#011a34',
    },
});

export default TaskStatusPieChart;
