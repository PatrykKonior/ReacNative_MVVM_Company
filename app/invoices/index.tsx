import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invoices and Payments</Text>
            <Text>View and manage invoices and payments.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
