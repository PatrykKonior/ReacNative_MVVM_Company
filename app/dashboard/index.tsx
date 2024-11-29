import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';

export default function DashboardView() {
    const drawer = useRef<DrawerLayout>(null);

    const renderDrawerContent = () => (
        <View style={styles.drawerContent}>
            <Text style={styles.drawerTitle}>Menu</Text>
            <Button title="Home" onPress={() => alert('Navigate to Home')} />
            <Button title="Departments" onPress={() => alert('Navigate to departments')} />
            <Button title="Employees" onPress={() => alert('Navigate to employees')} />
            <Button title="Invoices" onPress={() => alert('Navigate to invoices')} />
            <Button title="Projects" onPress={() => alert('Navigate to projects')} />
        </View>
    );

    return (
        <DrawerLayout
            ref={drawer}
            drawerWidth={240}
            drawerPosition="left"
            renderNavigationView={renderDrawerContent}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Dashboard</Text>
                <Text>Overview of projects, deadlines, and budgets.</Text>
                <Button
                    title="Open Menu"
                    onPress={() => {
                        if (drawer.current) {
                            drawer.current.openDrawer();
                        }
                    }}
                />
            </View>
        </DrawerLayout>
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
        marginBottom: 16,
    },
    drawerContent: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    drawerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
