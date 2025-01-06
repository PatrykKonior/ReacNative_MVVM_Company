import { InvoicesData } from './dataProcessing';

// Interfejs dla danych podsumowania faktur
export interface InvoicesOverviewData {
    totalAmount: number;
    paidCount: number;
    unpaidCount: number;
    partiallyPaidCount: number;
    highestInvoice: { date: string | null; amount: number | null };
    lowestInvoice: { date: string | null; amount: number | null };
    averageAmount: number | null;
    statusSummary: { status: string; amount: number | null }[];
}

// Funkcja przetwarzająca dane dla podsumowania faktur
export const processInvoicesOverviewData = (invoices: InvoicesData[]): InvoicesOverviewData => {
    if (!invoices || invoices.length === 0) {
        return {
            totalAmount: 0,
            paidCount: 0,
            unpaidCount: 0,
            partiallyPaidCount: 0,
            highestInvoice: { date: null, amount: null },
            lowestInvoice: { date: null, amount: null },
            averageAmount: null,
            statusSummary: [],
        };
    }

    // Inicjalizacja zmiennych
    let totalAmount = 0;
    let paidCount = 0;
    let unpaidCount = 0;
    let partiallyPaidCount = 0;

    let highestInvoice = invoices[0];
    let lowestInvoice = invoices[0];

    // Suma całkowita i statusy
    const statusSummary: { [key: string]: number } = {};

    invoices.forEach((invoice) => {
        const amount = invoice.totalAmount || 0;

        // Suma wartości faktur
        totalAmount += amount;

        // Statusy faktur
        const status = invoice.invoiceStatus || 'Unknown';
        statusSummary[status] = (statusSummary[status] || 0) + amount;

        // Zliczanie według statusu
        if (status === 'Opłacona') {
            paidCount++;
        } else if (status === 'Nieopłacona') {
            unpaidCount++;
        } else if (status === 'Częściowo opłacona') {
            partiallyPaidCount++;
        }

        // Najwyższa faktura
        if (invoice.totalAmount > highestInvoice.totalAmount) {
            highestInvoice = invoice;
        }

        // Najniższa faktura
        if (invoice.totalAmount < lowestInvoice.totalAmount) {
            lowestInvoice = invoice;
        }
    });

    // Średnia wartość faktury
    const averageAmount = totalAmount / invoices.length;

    return {
        totalAmount,
        paidCount,
        unpaidCount,
        partiallyPaidCount,
        highestInvoice: {
            date: highestInvoice.invoiceDate,
            amount: highestInvoice.totalAmount,
        },
        lowestInvoice: {
            date: lowestInvoice.invoiceDate,
            amount: lowestInvoice.totalAmount,
        },
        averageAmount,
        statusSummary: Object.keys(statusSummary).map((status) => ({
            status,
            amount: statusSummary[status],
        })),
    };
};
