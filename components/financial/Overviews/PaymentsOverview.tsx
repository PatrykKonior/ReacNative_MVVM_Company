import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Interfejs dla danych podsumowania
interface PaymentsOverviewProps {
    overviewData: {
        totalPayments: number;
        totalPending: number;
        totalPaid: number;
        highestPayment: { method: string; amount: number | null };
        lowestPayment: { method: string; amount: number | null };
        averagePayment: number | null;
        paymentMethods: { method: string; amount: number }[];
    };
}

const PaymentsOverview: React.FC<PaymentsOverviewProps> = ({ overviewData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payments Overview</Text>

            {/* Podsumowanie */}
            <View style={styles.overviewContent}>
                {/* Total Payments */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="wallet" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Total Payments:</Text>
                    <Text style={styles.amountText}>
                        ${overviewData.totalPayments.toFixed(2)}
                    </Text>
                </View>

                {/* Total Paid */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="check-circle" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Total Paid:</Text>
                    <Text style={styles.amountText}>
                        ${overviewData.totalPaid.toFixed(2)}
                    </Text>
                </View>

                {/* Total Pending */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="hourglass-half" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Total Pending:</Text>
                    <Text style={styles.amountText}>
                        ${overviewData.totalPending.toFixed(2)}
                    </Text>
                </View>

                {/* Highest Payment */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-up" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Highest Payment:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.highestPayment.amount !== null
                            ? `${overviewData.highestPayment.method} ($${overviewData.highestPayment.amount.toFixed(2)})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Lowest Payment */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="arrow-down" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Lowest Payment:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.lowestPayment.amount !== null
                            ? `${overviewData.lowestPayment.method} ($${overviewData.lowestPayment.amount.toFixed(2)})`
                            : 'No data'}
                    </Text>
                </View>

                {/* Average Payment */}
                <View style={styles.detailsRow}>
                    <FontAwesome5 name="chart-bar" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.detailsRowText}>Average Payment:</Text>
                    <Text style={styles.amountText}>
                        {overviewData.averagePayment !== null
                            ? `$${overviewData.averagePayment.toFixed(2)}`
                            : 'No data'}
                    </Text>
                </View>
            </View>

            {/* Metody płatności */}
            <Text style={styles.sectionTitle}>Payment Methods:</Text>
            {overviewData.paymentMethods.length > 0 ? (
                overviewData.paymentMethods.map((method, index) => (
                    <View key={index} style={styles.detailsRow}>
                        <FontAwesome5 name="tag" size={12} color="#FFFFFF" style={{ marginRight: 8 }} />
                        <Text style={styles.detailsRowText}>{method.method}:</Text>
                        <Text style={styles.amountText}>
                            ${method.amount.toFixed(2)}
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No data available for payment methods.</Text>
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

export default PaymentsOverview;
