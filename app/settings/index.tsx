import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const settingsOptions = [
    { id: '1', title: 'Profile Settings', icon: 'user-cog', iconFamily: FontAwesome5 },
    { id: '2', title: 'Notifications', icon: 'bell', iconFamily: FontAwesome5 },
    { id: '3', title: 'Privacy & Security', icon: 'shield-lock', iconFamily: MaterialIcons },
    { id: '4', title: 'Language', icon: 'language', iconFamily: FontAwesome5 },
    { id: '5', title: 'Theme', icon: 'color-palette', iconFamily: Ionicons },
    { id: '6', title: 'Data & Storage', icon: 'database', iconFamily: FontAwesome5 },
    { id: '7', title: 'Account Management', icon: 'account-box', iconFamily: MaterialIcons },
    { id: '8', title: 'Help & Support', icon: 'help-circle', iconFamily: Ionicons },
    { id: '9', title: 'About', icon: 'information-circle', iconFamily: Ionicons },
    { id: '10', title: 'Log Out', icon: 'log-out', iconFamily: Ionicons },
];

export default function Settings() {
    const renderItem = ({ item }: { item: typeof settingsOptions[0] }) => (
        <TouchableOpacity style={styles.optionContainer} onPress={() => alert(`Selected: ${item.title}`)}>
            <View style={styles.iconContainer}>
                <item.iconFamily name={item.icon} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.optionText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#0D0D0D" style={styles.chevronIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <FlatList
                data={settingsOptions}
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
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#465954',
    },
    listContainer: {
        paddingVertical: 10,
    },
    optionContainer: {
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
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
        flex: 1,
    },
    chevronIcon: {
        marginLeft: 10,
    },
});
