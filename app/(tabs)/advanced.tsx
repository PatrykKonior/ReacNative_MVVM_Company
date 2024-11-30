import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const advancedFunctions = [
    {
        id: '1',
        title: 'Deadline Monitoring',
        description: 'Track project deadlines and get timely reminders.',
        renderIcon: () => <FontAwesome5 name="calendar-alt" size={24} color="#FFFFFF" />,
        backgroundColor: '#465954',
    },
    {
        id: '2',
        title: 'Financial Overview',
        description: 'View budgets, invoices, and outstanding payments.',
        renderIcon: () => <FontAwesome5 name="wallet" size={24} color="#FFFFFF" />,
        backgroundColor: '#034C8C',
    },
    {
        id: '3',
        title: 'Task Prioritization',
        description: 'Organize and prioritize tasks effectively.',
        renderIcon: () => <FontAwesome5 name="tasks" size={24} color="#FFFFFF" />,
        backgroundColor: '#023059',
    },
];

export default function ToolsScreen() {
    const renderCard = ({
                            title,
                            description,
                            renderIcon,
                            backgroundColor,
                        }: {
        title: string;
        description: string;
        renderIcon: () => JSX.Element;
        backgroundColor: string;
    }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor }]} key={title}>
            <View style={styles.iconContainer}>{renderIcon()}</View>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Advanced Functions</Text>
            <View style={styles.cardsContainer}>
                {advancedFunctions.map((item) =>
                    renderCard({
                        title: item.title,
                        description: item.description,
                        renderIcon: item.renderIcon,
                        backgroundColor: item.backgroundColor,
                    })
                )}
            </View>
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
        color: '#0D0D0D',
        textAlign: 'center',
        marginBottom: 20,
    },
    cardsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF33',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    cardDescription: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: 5,
    },
});
