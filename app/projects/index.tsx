import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function ProjectsView() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Projects</Text>
            <Button title="Add Project" onPress={() => console.log('Navigate to Add Project')} />
            <FlatList
                data={[{ id: '1', name: 'Project A' }, { id: '2', name: 'Project B' }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.project}>
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
    project: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
