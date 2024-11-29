import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ClientsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <Text style={styles.subtitle}>Here you can choose which category you are looking for.</Text>
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
