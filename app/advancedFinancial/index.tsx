import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AdvancedIndex() {
    const router = useRouter();

    useEffect(() => {
        // Przekierowanie bez nadpisywania historii (ważne dla powrotu)
        router.push('/advancedFinancial/financialOverview' as const);
    }, []);

    return null;
}
