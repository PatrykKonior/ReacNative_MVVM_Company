import axios from 'axios';

// Interfejs dla danych płatności
export interface PaymentsData {
    paymentID: number;
    paymentDate: string;
    paymentAmount: number | null;
    paymentMethod: string;
    invoiceDate: string;
    invoiceStatus: string;
    totalAmount: number;
}

// Funkcja pobierająca dane z API i filtrująca według miesiąca i roku
export const fetchPaymentsData = async (month: string, year: string): Promise<PaymentsData[]> => {
    try {
        const response = await axios.get('http://localhost:5069/api/Payments');
        return response.data.filter((payment: any) => {
            const paymentDate = new Date(payment.paymentDate);
            return (
                paymentDate.getMonth() + 1 === parseInt(month) && // Dopasowanie miesiąca
                paymentDate.getFullYear() === parseInt(year) // Dopasowanie roku
            );
        });
    } catch (error) {
        console.error('Error fetching payments data:', error);
        return [];
    }
};

// Interfejs dla podsumowania płatności
export interface PaymentsOverviewData {
    totalPayments: number;
    totalPending: number;
    totalPaid: number;
    highestPayment: { method: string; amount: number | null };
    lowestPayment: { method: string; amount: number | null };
    averagePayment: number | null;
    paymentMethods: { method: string; amount: number }[];
}

// Funkcja przetwarzająca dane dla podsumowania płatności
export const processPaymentsOverviewData = (payments: PaymentsData[]): PaymentsOverviewData => {
    // Suma wszystkich płatności
    const totalPayments = payments.reduce((sum, payment) => sum + (payment.paymentAmount || 0), 0);

    // Suma dla opłaconych i nieopłaconych faktur
    const totalPaid = payments
        .filter((payment) => payment.invoiceStatus === 'Opłacona')
        .reduce((sum, payment) => sum + (payment.paymentAmount || 0), 0);

    const totalPending = payments
        .filter((payment) => payment.invoiceStatus !== 'Opłacona')
        .reduce((sum, payment) => sum + (payment.paymentAmount || 0), 0);

    // Najwyższa i najniższa płatność
    const highestPayment = payments.reduce((prev, curr) =>
        (curr.paymentAmount || 0) > (prev.paymentAmount || 0) ? curr : prev
    );

    const lowestPayment = payments.reduce((prev, curr) =>
        (curr.paymentAmount || Infinity) < (prev.paymentAmount || Infinity) ? curr : prev
    );

    // Średnia wartość płatności
    const averagePayment = payments.length > 0 ? totalPayments / payments.length : 0;

    // Płatności według metod
    const paymentMethods = payments.reduce((acc: { [key: string]: number }, payment) => {
        const method = payment.paymentMethod || 'Unknown';
        acc[method] = (acc[method] || 0) + (payment.paymentAmount || 0);
        return acc;
    }, {});

    const paymentMethodsArray = Object.entries(paymentMethods).map(([method, amount]) => ({
        method,
        amount,
    }));

    return {
        totalPayments,
        totalPending,
        totalPaid,
        highestPayment: {
            method: highestPayment.paymentMethod || 'No data',
            amount: highestPayment.paymentAmount || 0,
        },
        lowestPayment: {
            method: lowestPayment.paymentMethod || 'No data',
            amount: lowestPayment.paymentAmount || 0,
        },
        averagePayment,
        paymentMethods: paymentMethodsArray,
    };
};
