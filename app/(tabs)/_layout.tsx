import { Tabs } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
    Platform,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
    ScrollView,
} from 'react-native';

import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Typy ścieżek
type RoutePaths =
    "/clients" |
    "/projects" |
    "/employees" |
    "/departments" |
    "/invoices" |
    "/materials" |
    "/Tasks" |
    "/timeLogs" |
    "/settings" |
    "/sale" |
    "/payments";

// Definicja kategorii
const categories: Array<{
    id: string;
    title: string;
    icon: string;
    iconFamily: any;
    route: RoutePaths;
}> = [
    { id: '1', title: 'Clients', icon: 'users', iconFamily: FontAwesome5, route: '/clients' },
    { id: '2', title: 'Projects', icon: 'briefcase', iconFamily: FontAwesome5, route: '/projects' },
    { id: '3', title: 'Sales', icon: 'chart-line', iconFamily: FontAwesome5, route: '/sale' },
    { id: '4', title: 'Payments', icon: 'money-check-alt', iconFamily: FontAwesome5, route: '/payments' },
    { id: '5', title: 'Employees', icon: 'people', iconFamily: MaterialIcons, route: '/employees' },
    { id: '6', title: 'Departments', icon: 'building', iconFamily: FontAwesome5, route: '/departments' },
    { id: '7', title: 'Invoices', icon: 'file-invoice-dollar', iconFamily: FontAwesome5, route: '/invoices' },
    { id: '8', title: 'Materials', icon: 'boxes', iconFamily: FontAwesome5, route: '/materials' },
    { id: '9', title: 'Tasks', icon: 'tasks', iconFamily: FontAwesome5, route: '/Tasks' },
    { id: '10', title: 'Time Logs', icon: 'clock', iconFamily: FontAwesome5, route: '/timeLogs' },
    { id: '11', title: 'Settings', icon: 'cogs', iconFamily: FontAwesome5, route: '/settings' },
];

export default function TabLayout() {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const menuHeight = useRef(new Animated.Value(0)).current; // Startowa wysokość menu
    const router = useRouter();

    const toggleMenu = () => {
        if (isMenuVisible) {
            // Zwijanie menu
            Animated.timing(menuHeight, {
                toValue: 0,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start(() => setMenuVisible(false));
        } else {
            // Rozwijanie menu
            setMenuVisible(true);
            Animated.timing(menuHeight, {
                toValue: SCREEN_HEIGHT - 115, // animacja tuż nad zakładkami
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        }
    };

    const navigateTo = (route: RoutePaths) => {
        toggleMenu(); // Zamykam menu przed przejściem
        router.push(route); // Przechodze do wybranej ścieżki
    };

    return (
        <>
            {/* Animowane menu */}
            <Animated.View
                style={[
                    styles.menuContainer,
                    { height: menuHeight },
                ]}
            >
                {isMenuVisible && (
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {categories.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.menuButton}
                                onPress={() => navigateTo(item.route)}
                            >
                                <View style={styles.menuIconContainer}>
                                    <item.iconFamily name={item.icon} size={24} color="#FFFFFF" />
                                </View>
                                <Text style={styles.menuButtonText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </Animated.View>

            {/* Zakładki */}
            <Tabs
                screenOptions={{
                    headerShown: true,
                    tabBarStyle: Platform.select({
                        ios: { position: 'absolute' },
                        default: {},
                    }),
                    tabBarActiveTintColor: '#465954',
                    tabBarInactiveTintColor: '#a1a59b',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={toggleMenu}
                            style={styles.headerButton}
                        >
                            <IconSymbol size={28} name="line.horizontal.3" color="#fff" />
                            <Text style={styles.headerButtonText}>Menu</Text>
                        </TouchableOpacity>
                    ),
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home Page',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol size={28} name="house.fill" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: 'Categories',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol size={28} name="paperplane.fill" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="advanced"
                    options={{
                        title: 'Advanced',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol size={28} name="house.fill" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="tools"
                    options={{
                        title: 'Tools',
                        tabBarIcon: ({ color }) => (
                            <IconSymbol size={28} name="house.fill" color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        top: 63, // lokalizacja menu - od góry
        left: 0,
        width: SCREEN_WIDTH * 0.3, // Menu na 15% szerokości ekranu
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        elevation: 5, // Cień na Androidzie
        shadowColor: '#000', // Cień na iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 1,
    },
    scrollContent: {
        padding: 10,
    },
    menuContent: {
        flex: 1,
        padding: 10,
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#465954',
        paddingVertical: 10,
        borderRadius: 8,
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    menuIconContainer: {
        width: 30,
        alignItems: 'center',
        marginRight: 10,
    },
    menuButtonText: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#465954',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 20,
        marginRight: 10,
    },
    headerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
