import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Materials</Text>
            <Text>Manage materials and resources.</Text>
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
