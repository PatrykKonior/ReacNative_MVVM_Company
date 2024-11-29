import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clients</Text>
            <Button title="Add Client" onPress={() => console.log('Navigate to Add Client')} />
            <FlatList
                data={[{ id: '1', name: 'Client A' }, { id: '2', name: 'Client B' }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.client}>
                        <Text>{item.name}</Text>
                        <Button title="Details" onPress={() => console.log(`Navigate to Details of ${item.name}`)} />
                    </View>
                )}
            />
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
    client: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
