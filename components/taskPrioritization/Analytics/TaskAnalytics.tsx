import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchTasks, processAnalytics } from '@/components/taskPrioritization/Functions/taskProcessing';

const TaskAnalytics = () => {
    const [analyticsData, setAnalyticsData] = useState<{
        averageDuration: string;
        longestTask: { name: string; hours: number };
        shortestTask: { name: string; hours: number };
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const tasks = await fetchTasks();
                const analytics = processAnalytics(tasks);
                setAnalyticsData(analytics);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#355679" />;
    }

    if (!analyticsData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No analytics data available.</Text>
                <Text style={styles.noDataSubText}>Please check your task data.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.analyticsTitle}>Task Analytics</Text>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Average Duration:</Text>
                <Text style={styles.analyticsValue}>{analyticsData.averageDuration} hours</Text>
            </View>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Longest Task:</Text>
                <Text style={styles.analyticsValue}>
                    {analyticsData.longestTask.name} ({analyticsData.longestTask.hours} hours)
                </Text>
            </View>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Shortest Task:</Text>
                <Text style={styles.analyticsValue}>
                    {analyticsData.shortestTask.name} ({analyticsData.shortestTask.hours} hours)
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
    },
    analyticsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#011a34',
        textAlign: 'center',
        marginBottom: 10,
    },
    analyticsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#96a7bb',
        borderRadius: 5,
    },
    analyticsLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#011a34',
    },
    analyticsValue: {
        fontSize: 16,
        color: '#011a34',
        fontWeight: '500',
    },
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#355679',
    },
    noDataSubText: {
        fontSize: 14,
        color: '#355679',
        marginTop: 5,
    },
});

export default TaskAnalytics;
