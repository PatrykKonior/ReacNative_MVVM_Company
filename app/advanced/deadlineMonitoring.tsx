import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Przykładowe dane
const initialData = [
    {
        id: '1',
        title: 'Foundation Work',
        date: '2023-12-01',
        isOverdue: true,
        type: 'task',
    },
    {
        id: '2',
        title: 'Invoice Payment',
        date: '2024-01-05',
        isOverdue: false,
        type: 'invoice',
    },
    {
        id: '3',
        title: 'Renovation Project',
        date: '2023-11-20',
        isOverdue: true,
        type: 'task',
    },
    {
        id: '4',
        title: 'Final Payment',
        date: '2024-12-28',
        isOverdue: false,
        type: 'invoice',
    },
];

// Funkcja do pobrania odpowiedniej ikony
const getIcon = (type: string) => {
    if (type === 'invoice') {
        return <FontAwesome5 name="file-invoice-dollar" size={24} color="#FFFFFF" />;
    }
    return <MaterialIcons name="assignment" size={24} color="#FFFFFF" />;
};

export default function DeadlineMonitoring() {
    const [data, setData] = useState(initialData);

    // Animowane wartości dla obramowania
    const animatedBorder = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Sortowanie danych
        const sortedData = [...initialData].sort((a, b) => {
            if (a.isOverdue && !b.isOverdue) return -1;
            if (!a.isOverdue && b.isOverdue) return 1;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        setData(sortedData);

        // Animacja dla opóźnionych kart
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedBorder, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
                Animated.timing(animatedBorder, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    const renderItem = ({ item }: { item: any }) => {
        // Efekt przesuwającego się koloru obramowania
        const borderColor = item.isOverdue
            ? animatedBorder.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['#8C0E03', '#FF6347', '#8C0E03'],
            })
            : '#EBF2EB';

        return (
            <TouchableOpacity>
                <Animated.View style={[
                    styles.card,
                    item.isOverdue && {
                        borderColor: borderColor,
                        borderWidth: 3, // Grubsze obramowanie
                    },
                ]}>
                    <View style={styles.iconContainer}>{getIcon(item.type)}</View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.date}</Text>
                        {item.isOverdue && (
                            <Text style={styles.overdueText}>Overdue</Text>
                        )}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deadline Monitoring</Text>
            <FlatList
                data={data}
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
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        paddingVertical: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#EBF2EB',
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
        backgroundColor: '#465954',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#465954',
    },
    overdueText: {
        fontSize: 14,
        color: '#8C0E03',
        fontWeight: 'bold',
        marginTop: 5,
    },
});
