import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type RoutePaths = "/clients" | "/projects" | "/employees" | "/departments" | "/invoices" | "/materials";

const categories: Array<{
    id: string;
    title: string;
    icon: string;
    iconFamily: any;
    route: RoutePaths;
}> = [
    { id: '1', title: 'Clients', icon: 'users', iconFamily: FontAwesome5, route: '/clients' },
    { id: '2', title: 'Projects', icon: 'briefcase', iconFamily: FontAwesome5, route: '/projects' },
    { id: '3', title: 'Employees', icon: 'people', iconFamily: MaterialIcons, route: '/employees' },
    { id: '4', title: 'Departments', icon: 'building', iconFamily: FontAwesome5, route: '/departments' },
    { id: '5', title: 'Invoices', icon: 'file-invoice-dollar', iconFamily: FontAwesome5, route: '/invoices' },
    { id: '6', title: 'Materials', icon: 'boxes', iconFamily: FontAwesome5, route: '/materials' },
];

export default function CategoriesScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => router.push(item.route)}
        >
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
