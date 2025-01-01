import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AdvancedIndex() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/advanced/deadlineMonitoring');
    }, []);

    return null;
}
