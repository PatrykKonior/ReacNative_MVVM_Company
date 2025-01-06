import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface InvoicesOverviewProps {
    overviewData: {
        totalAmount: number | null;
        paidCount: number | null;
        unpaidCount: number | null;
        partiallyPaidCount: number | null;
        highestInvoice: { date: string | null; amount: number | null };
        lowestInvoice: { date: string | null; amount: number | null };
        averageAmount: number | null;
        statusSummary: { status: string; amount: number | null }[];
    };
}

const InvoicesOverview: React.FC<InvoicesOverviewProps> = ({ overviewData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invoices Overview</Text>

            {/* Podsumowanie */}
            <View style={styles.overviewContent}>
                {/* Total Amount */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="file-invoice-dollar" size={12} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.detailsRowText}>Total Amount:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.totalAmount !== null
                            ? `$${overviewData.totalAmount.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>

                {/* Paid Invoices */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="check-circle" size={12} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.detailsRowText}>Paid Invoices:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.paidCount !== null ? overviewData.paidCount : 'No data'}
                    </Text>
                </View>

                {/* Unpaid Invoices */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="times-circle" size={12} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.detailsRowText}>Unpaid Invoices:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.unpaidCount !== null ? overviewData.unpaidCount : 'No data'}
                    </Text>
                </View>

                {/* Partially Paid Invoices */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="adjust" size={12} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.detailsRowText}>Partially Paid:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.partiallyPaidCount !== null ? overviewData.partiallyPaidCount : 'No data'}
                    </Text>
                </View>

                {/* Highest Invoice */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-up" size={12} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.detailsRowText}>Highest Invoice:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.highestInvoice.date && overviewData.highestInvoice.amount !== null
                            ? `${overviewData.highestInvoice.date} ($${overviewData.highestInvoice.amount})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Lowest Invoice */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-down" size={12} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.detailsRowText}>Lowest Invoice:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.lowestInvoice.date && overviewData.lowestInvoice.amount !== null
                            ? `${overviewData.lowestInvoice.date} ($${overviewData.lowestInvoice.amount})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Average Amount */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="chart-bar" size={12} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.detailsRowText}>Average Amount:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.averageAmount !== null
                            ? `$${overviewData.averageAmount.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>
            </View>

            {/* Status Summary */}
            <Text style={styles.sectionTitle}>Amount by Status:</Text>
            {overviewData.statusSummary.length > 0 ? (
                overviewData.statusSummary.map((status, index) => (
                    <View key={index} style={styles.detailsRow}>
                        <FontAwesome5 name="tag" size={12} color="#FFFFFF" style={styles.icon} />
                        <Text style={styles.detailsRowText}>{status.status}:</Text>
                        <Text style={styles.amountText}>
                            {status.amount !== null ? `$${status.amount.toFixed(2)}` : 'No data'}
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No data available for invoice statuses.</Text>
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
    icon: {
        marginRight: 8,
    },
});

export default InvoicesOverview;
