import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Home Page</Text>
            <Text style={styles.subtitle}>This will display a modern grid.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10,
    },
});
