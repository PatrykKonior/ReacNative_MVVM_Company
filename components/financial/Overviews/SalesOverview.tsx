import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface SalesOverviewProps {
    overviewData: {
        totalNet: number | null;
        totalGross: number | null;
        totalVAT: number | null;
        activeCount: number | null;
        completedCount: number | null;
        maxSale: { name: string | null; value: number | null };
        minSale: { name: string | null; value: number | null };
        averageGross: number | null;
    };
}

const SalesOverview: React.FC<SalesOverviewProps> = ({ overviewData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sales Overview</Text>

            {/* Podsumowanie */}
            <View style={styles.overviewContent}>
                {/* Total Net */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="dollar-sign" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Total Net:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.totalNet !== null
                            ? `$${overviewData.totalNet.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>

                {/* Total Gross */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="dollar-sign" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Total Gross:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.totalGross !== null
                            ? `$${overviewData.totalGross.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>

                {/* Total VAT */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="percent" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Total VAT:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.totalVAT !== null
                            ? `$${overviewData.totalVAT.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>

                {/* Active Sales */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="tasks" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Active Sales:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.activeCount !== null ? overviewData.activeCount : 'No data'}
                    </Text>
                </View>

                {/* Completed Sales */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="check-circle" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Completed Sales:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.completedCount !== null ? overviewData.completedCount : 'No data'}
                    </Text>
                </View>

                {/* Highest Sale */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-up" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Highest Sale:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.maxSale.name && overviewData.maxSale.value !== null
                            ? `${overviewData.maxSale.name} ($${overviewData.maxSale.value.toFixed(2)})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Lowest Sale */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-down" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Lowest Sale:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.minSale.name && overviewData.minSale.value !== null
                            ? `${overviewData.minSale.name} ($${overviewData.minSale.value.toFixed(2)})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Average Sale */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="chart-bar" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Average Sale:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.averageGross !== null
                            ? `$${overviewData.averageGross.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>
            </View>
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
});

export default SalesOverview;
