import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#465954' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold' },
                headerBackTitle: '', // Ukryj tekst powrotu
                headerLeft: () => {
                    const navigation = useNavigation();
                    return (
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#FFFFFF"
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.goBack()} // Akcja powrotu
                        />
                    );
                },
            }}
        />
    );
}
