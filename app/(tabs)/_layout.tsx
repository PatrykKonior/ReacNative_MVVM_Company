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
} from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TabLayout() {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const menuHeight = useRef(new Animated.Value(0)).current; // Startowa wysokość menu

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
                toValue: SCREEN_HEIGHT - 115, // Zatrzymaj animację tuż nad zakładkami
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        }
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
                    <View style={styles.menuContent}>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => alert('Go to Clients')}
                        >
                            <Text style={styles.menuButtonText}>Clients</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => alert('Go to Invoices')}
                        >
                            <Text style={styles.menuButtonText}>Invoices</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => alert('Go to Departments')}
                        >
                            <Text style={styles.menuButtonText}>Departments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => alert('Go to Employees')}
                        >
                            <Text style={styles.menuButtonText}>Employees</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => alert('Go to Projects')}
                        >
                            <Text style={styles.menuButtonText}>Projects</Text>
                        </TouchableOpacity>
                    </View>
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
        width: SCREEN_WIDTH * 0.2, // Menu na 15% szerokości ekranu
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
    menuContent: {
        flex: 1,
        padding: 10,
    },
    menuButton: {
        backgroundColor: '#465954',
        paddingVertical: 10,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
    },
    menuButtonText: {
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
