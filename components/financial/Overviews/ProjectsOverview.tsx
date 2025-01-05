import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface ProjectsOverviewProps {
    overviewData: {
        totalBudget: number | null;
        activeCount: number | null;
        completedCount: number | null;
        maxBudgetProject: { name: string | null; budget: number | null };
        minBudgetProject: { name: string | null; budget: number | null };
        averageBudget: number | null;
        projectTypes: { type: string; budget: number | null }[];
    };
}

const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({ overviewData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Projects Overview</Text>

            {/* Podsumowanie */}
            <View style={styles.overviewContent}>
                {/* Total Budget */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="briefcase" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Total Budget:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.totalBudget !== null
                            ? `$${overviewData.totalBudget.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>

                {/* Active Projects */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="tasks" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Active Projects:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.activeCount !== null ? overviewData.activeCount : 'No data'}
                    </Text>
                </View>

                {/* Completed Projects */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="check-circle" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Completed Projects:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.completedCount !== null ? overviewData.completedCount : 'No data'}
                    </Text>
                </View>

                {/* Highest Budget */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-up" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Highest Budget:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.maxBudgetProject.name && overviewData.maxBudgetProject.budget !== null
                            ? `${overviewData.maxBudgetProject.name} ($${overviewData.maxBudgetProject.budget})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Lowest Budget */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-down" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Lowest Budget:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.minBudgetProject.name && overviewData.minBudgetProject.budget !== null
                            ? `${overviewData.minBudgetProject.name} ($${overviewData.minBudgetProject.budget})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Average Budget */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="chart-bar" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Average Budget:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.averageBudget !== null
                            ? `$${overviewData.averageBudget.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>
            </View>

            {/* Budżet według typów projektów */}
            <Text style={styles.sectionTitle}>Budget by Project Types:</Text>
            {overviewData.projectTypes.length > 0 ? (
                overviewData.projectTypes.map((type, index) => (
                    <View key={index} style={styles.detailsRow}>
                        <FontAwesome5 name="tag" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                        <Text style={styles.detailsRowText}>{type.type}:</Text>
                        <Text style={styles.amountText}>
                            {type.budget !== null ? `$${type.budget.toFixed(2)}` : 'No data'}
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No data available for project types.</Text>
            )}
        </View>
    );
};

// Style
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#356fa3',
        borderRadius: 8,
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    overviewContent: {
        marginBottom: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailsRowText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    amountText: {
        fontWeight: 'bold',
        marginLeft: 'auto',
        color: '#FFFFFF',
    },
    sectionTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    noDataText: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default ProjectsOverview;