import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Pie, Bar } from 'react-chartjs-2';
import { fetchProjectsData, processPieChartData, processBarChartData } from '../Functions/dataProcessing';

interface ProjectsChartsProps {
    month: string;
    year: string;
}

export default function ProjectsCharts({ month, year }: ProjectsChartsProps) {
    // Stany dla danych
    const [pieChartData, setPieChartData] = useState<any>(null);
    const [barChartData, setBarChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [projectsInfo, setProjectsInfo] = useState<{ type: string; name: string; budget: number }[]>([]); // Nowy format danych

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setNoData(false);

            try {
                const projects = await fetchProjectsData(month, year);

                if (projects.length === 0) {
                    setNoData(true);
                } else {
                    // Przetwarzanie danych
                    setPieChartData(processPieChartData(projects));
                    setBarChartData(processBarChartData(projects));

                    // Zbieranie szczegółowych informacji
                    const projectDetails = projects.map((proj) => ({
                        type: proj.projectType,
                        name: proj.projectName,
                        budget: proj.projectBudget,
                    }));
                    setProjectsInfo(projectDetails); // Ustawienie stanu
                }
            } catch (error) {
                console.error('Error loading project charts data:', error);
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
            {/* Projekty w wybranym okresie */}
            <View style={styles.projectsInfoContainer}>
                <Text style={styles.projectsInfoTitle}>Projects in this period:</Text>
                {projectsInfo.map((project, index) => (
                    <Text key={index} style={styles.projectName}>
                        • {project.name} - {project.type} (${project.budget})
                    </Text>
                ))}
            </View>

            {/* Wykres kołowy */}
            <Text style={styles.chartTitle}>Project Budgets by Type</Text>
            <View style={styles.chartContainer}>
                <Pie
                    data={pieChartData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem: any) => {
                                        // Tooltip dla wykresu kołowego
                                        const type = pieChartData.labels[tooltipItem.dataIndex];
                                        const filteredProjects = projectsInfo.filter((p) => p.type === type);
                                        return filteredProjects.map((p) => `${p.name}: $${p.budget}`).join('\n');
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
            <Text style={styles.chartTitle}>Project Status Overview</Text>
            <View style={styles.chartContainer}>
                <Bar
                    data={barChartData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem: any) => {
                                        const status = barChartData.labels[tooltipItem.dataIndex]; // 'Active' lub 'Completed'

                                        // Pobranie danych dla tooltipów z tooltipData
                                        const projectsList = barChartData.tooltipData[status];

                                        // Jeśli brak projektów
                                        if (projectsList.length === 0) {
                                            return 'No projects available';
                                        }

                                        // Wyświetlanie listy projektów z budżetem
                                        return projectsList.map((p: string) => p).join('\n');
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
                                    stepSize: 1, // Skala co 1
                                },
                            },
                        },
                    }}
                />
            </View>
        </View>
    );
}

// Style dla wykresów
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
    projectsInfoContainer: {
        marginBottom: 15,
    },
    projectsInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#034C8C',
        marginBottom: 5,
    },
    projectName: {
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
