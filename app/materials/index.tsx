import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function MaterialsIndex() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Materials</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/materials/addMaterial')}>
                <Text style={styles.buttonText}>Add New Material</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/materials/viewAllMaterials')}>
                <Text style={styles.buttonText}>View All Materials</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#465954',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#465954',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
