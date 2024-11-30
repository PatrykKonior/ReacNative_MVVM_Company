import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    FlatList,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

export default function ToolsScreen() {
    const [isToolsVisible, setToolsVisible] = useState(false);
    const menuHeight = useRef(new Animated.Value(0)).current;

    const toggleTools = () => {
        if (isToolsVisible) {
            Animated.timing(menuHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setToolsVisible(false));
        } else {
            setToolsVisible(true);
            Animated.timing(menuHeight, {
                toValue: SCREEN_HEIGHT * 0.5, // Tools zajmuje 50% ekranu
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const renderCategory = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <item.iconFamily name={item.icon} size={20} color="#465954" style={styles.icon} />
            <Text style={styles.categoryText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Napis "Choose Category" */}
            <Text style={styles.sectionTitle}>Choose Category</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategory}
                style={styles.categoryList}
            />

            {/* Miejsce na wyniki */}
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Results will appear here</Text>
            </View>

            {/* Przycisk "OPEN TOOLS" */}
            <TouchableOpacity style={styles.openButton} onPress={toggleTools}>
                <MaterialIcons name="filter-list" size={20} color="#FFFFFF" style={styles.actionIcon} />
                <Text style={styles.buttonText}>
                    {isToolsVisible ? 'Close Tools' : 'Open Tools'}
                </Text>
            </TouchableOpacity>

            {/* Sekcja narzędzi */}
            <Animated.View style={[styles.toolsContainer, { height: menuHeight }]}>
                {isToolsVisible && (
                    <>
                        {/* Przycisk zamknięcia */}
                        <TouchableOpacity style={styles.closeButton} onPress={toggleTools}>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        {/* Filtrowanie */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Filters</Text>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.filterButton}>
                                    <FontAwesome5 name="calendar-alt" size={16} color="#FFFFFF" style={styles.iconLeft} />
                                    <Text style={styles.buttonText}>By Date</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filterButton}>
                                    <FontAwesome5 name="user" size={16} color="#FFFFFF" style={styles.iconLeft} />
                                    <Text style={styles.buttonText}>By Client</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sortowanie */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sorting</Text>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.sortButton}>
                                    <FontAwesome5 name="arrow-up" size={16} color="#FFFFFF" style={styles.iconLeft} />
                                    <Text style={styles.buttonText}>Ascending</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sortButton}>
                                    <FontAwesome5 name="arrow-down" size={16} color="#FFFFFF" style={styles.iconLeft} />
                                    <Text style={styles.buttonText}>Descending</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#465954',
        marginBottom: 10,
    },
    categoryList: {
        marginBottom: 20,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    categoryText: {
        fontSize: 16,
        color: '#465954',
        marginLeft: 10,
    },
    icon: {
        marginLeft: 5,
    },
    resultContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#EBF2EB',
        borderRadius: 8,
        alignItems: 'center',
    },
    resultText: {
        color: '#465954',
        fontSize: 16,
    },
    openButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#465954', // Zmiana koloru
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 20,
    },
    actionIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    toolsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#EBF2EB',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    closeButton: {
        alignSelf: 'center', // Środek
        backgroundColor: '#465954',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    section: {
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    filterButton: {
        flex: 1,
        backgroundColor: '#023059',
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    sortButton: {
        flex: 1,
        backgroundColor: '#034C8C',
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconLeft: {
        marginRight: 10,
        marginLeft: 10,
    },
});
