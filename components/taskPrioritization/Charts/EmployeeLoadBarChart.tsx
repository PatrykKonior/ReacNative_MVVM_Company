import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    ChartOptions,
} from 'chart.js';
import { fetchTasks, fetchEmployees, processEmployeeLoad } from '@/components/taskPrioritization/Functions/taskProcessing';

// Rejestracja komponentów Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EmployeeLoadBarChart = () => {
    const [barChartData, setBarChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState<{ name: string; hours: number; tasks: string[] }[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setNoData(false);

            try {
                const tasks = await fetchTasks();
                const employees = await fetchEmployees();

                if (tasks.length === 0 || employees.length === 0) {
                    setNoData(true);
                } else {
                    // Przetwarzanie danych dla wykresu
                    const employeeLoad = processEmployeeLoad(tasks, employees);
                    const labels = employeeLoad.map(emp => emp.employeeName);
                    const data = employeeLoad.map(emp => emp.totalHours);

                    // Szczegóły pracowników do tooltipów
                    const details = employeeLoad.map(emp => ({
                        name: emp.employeeName,
                        hours: emp.totalHours,
                        tasks: emp.assignedTasks.map(task => task.taskName),
                    }));
                    setEmployeeDetails(details);

                    setBarChartData({
                        labels,
                        datasets: [
                            {
                                label: 'Hours Assigned',
                                data,
                                backgroundColor: '#355679',
                                borderColor: '#FFFFFF',
                                borderWidth: 1,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error loading employee load data:', error);
                setNoData(true);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#355679" />;
    }

    if (noData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available for employees.</Text>
                <Text style={styles.noDataSubText}>Please check your tasks or employees data.</Text>
            </View>
        );
    }

    const options: ChartOptions<'bar'> = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const employee = employeeDetails[tooltipItem.dataIndex];
                        if (!employee || employee.tasks.length === 0) {
                            return `${employee?.name || 'Unknown'}: No tasks assigned`;
                        }
                        return [
                            `${employee.name}: ${employee.hours} hours`,
                            ...employee.tasks.map(task => ` - ${task}`),
                        ].join('\n');
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
                    color: '#011a34',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            y: {
                ticks: {
                    color: '#011a34',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    stepSize: 20,
                },
            },
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Employee Workload</Text>
            <View style={styles.chartContainer}>
                <Bar data={barChartData} options={options} />
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
    employeeInfoContainer: {
        marginBottom: 15,
    },
    employeeInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#011a34',
        marginBottom: 5,
    },
    employeeDetails: {
        fontSize: 14,
        color: '#011a34',
    },
});

export default EmployeeLoadBarChart;
