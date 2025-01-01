import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export default function Layout() {
    const navigation = useNavigation();

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#465954' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold' },
                headerLeft: ({ canGoBack }) =>
                    canGoBack && (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    ),
            }}
        />
    );
}
