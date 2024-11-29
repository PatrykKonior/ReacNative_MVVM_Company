import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Employees</Text>
            <Button title="Add Employee" onPress={() => console.log('Navigate to Add Employee')} />
            <FlatList
                data={[{ id: '1', name: 'Employee A' }, { id: '2', name: 'Employee B' }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.employee}>
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
    employee: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
