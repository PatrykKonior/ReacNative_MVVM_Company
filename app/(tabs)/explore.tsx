import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const categories = [
    { id: '1', title: 'Clients', icon: 'users', iconFamily: FontAwesome5 },
    { id: '2', title: 'Client Details', icon: 'id-card', iconFamily: FontAwesome5 },
    { id: '3', title: 'Projects', icon: 'briefcase', iconFamily: FontAwesome5 },
    { id: '4', title: 'Tasks', icon: 'tasks', iconFamily: FontAwesome5 },
    { id: '5', title: 'Employees', icon: 'people', iconFamily: MaterialIcons },
    { id: '6', title: 'Departments', icon: 'building', iconFamily: FontAwesome5 },
    { id: '7', title: 'Invoices', icon: 'file-invoice-dollar', iconFamily: FontAwesome5 },
    { id: '8', title: 'Payments', icon: 'credit-card', iconFamily: FontAwesome5 },
    { id: '9', title: 'Materials', icon: 'boxes', iconFamily: FontAwesome5 },
    { id: '10', title: 'Project Materials', icon: 'clipboard-list', iconFamily: FontAwesome5 },
    { id: '11', title: 'Sales', icon: 'shopping-cart', iconFamily: FontAwesome5 },
    { id: '12', title: 'Sale Items', icon: 'list', iconFamily: FontAwesome5 },
    { id: '13', title: 'Contracts', icon: 'file-contract', iconFamily: FontAwesome5 },
    { id: '14', title: 'Expenses', icon: 'wallet', iconFamily: FontAwesome5 },
    { id: '15', title: 'Time Logs', icon: 'clock', iconFamily: FontAwesome5 },
];

export default function CategoriesScreen() {
    const renderItem = ({ item }: { item: { id: string; title: string; icon: string; iconFamily: any } }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => alert(`Go to ${item.title}`)}>
            <View style={styles.iconContainer}>
                <item.iconFamily name={item.icon} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#0D0D0D" style={styles.forwardIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose the category you are looking for:</Text>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#465954',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EBF2EB',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#465954',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
        flex: 1,
    },
    forwardIcon: {
        marginLeft: 10,
    },
});
