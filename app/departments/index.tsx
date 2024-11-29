import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Departments</Text>
            <Text>List of departments and their managers.</Text>
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
