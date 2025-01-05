import axios from 'axios';

// Interfejs dla danych sprzedaży
export interface SalesData {
    saleID: number;
    saleDate: string;
    totalNetAmount: number;
    totalVATAmount: number | null;
    totalGrossAmount: number | null;
    saleStatus: string;
    clientName: string;
    clientNIP: string;
}

// Funkcja pobierająca dane z API i filtrująca według miesiąca i roku
export const fetchSalesData = async (month: string, year: string): Promise<SalesData[]> => {
    try {
        const response = await axios.get('http://localhost:5069/api/Sales');

        // Filtrowanie danych według daty (bez dodatkowej zmiennej)
        return response.data.filter((sale: any) => {
            const saleDate = new Date(sale.saleDate);
            return (
                saleDate.getMonth() + 1 === parseInt(month) && // Dopasowanie miesiąca
                saleDate.getFullYear() === parseInt(year) // Dopasowanie roku
            );
        });
    } catch (error) {
        console.error('Error fetching sales data:', error);
        return [];
    }
};

// Funkcja przetwarzająca dane dla podsumowania sprzedaży
export const processSalesOverviewData = (sales: SalesData[]) => {
    // Suma wartości netto, brutto i VAT
    const totalNet = sales.reduce((sum, sale) => sum + sale.totalNetAmount, 0);
    const totalGross = sales.reduce((sum, sale) => sum + (sale.totalGrossAmount || 0), 0);
    const totalVAT = sales.reduce((sum, sale) => sum + (sale.totalVATAmount || 0), 0);

    // Liczba sprzedaży według statusu
    const activeCount = sales.filter((sale) => sale.saleStatus === 'W trakcie').length;
    const completedCount = sales.filter((sale) => sale.saleStatus === 'Zakończona').length;

    // Sprzedaże o najwyższej i najniższej wartości brutto
    const maxSale = sales.reduce((prev, curr) =>
        (curr.totalGrossAmount || 0) > (prev.totalGrossAmount || 0) ? curr : prev
    );

    const minSale = sales.reduce((prev, curr) =>
        (curr.totalGrossAmount || Infinity) < (prev.totalGrossAmount || Infinity) ? curr : prev
    );

    // Średnia wartość sprzedaży brutto
    const averageGross = sales.length > 0 ? totalGross / sales.length : 0;

    return {
        totalNet,
        totalGross,
        totalVAT,
        activeCount,
        completedCount,
        maxSale: {
            name: maxSale.clientName || 'No data',
            value: maxSale.totalGrossAmount || 0,
        },
        minSale: {
            name: minSale.clientName || 'No data',
            value: minSale.totalGrossAmount || 0,
        },
        averageGross,
    };
};
