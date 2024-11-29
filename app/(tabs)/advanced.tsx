import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToolsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Advanced</Text>
            <Text style={styles.subtitle}>There will be advanced functions.</Text>
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
