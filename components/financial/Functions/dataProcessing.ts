import axios from 'axios';

// Interfejs dla danych projektów
export interface ProjectData {
    projectName: string;
    projectType: string;
    projectStatus: string;
    projectBudget: number;
    projectStartDate: string;
    projectEndDate: string;
}

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
    clientRegon: string;
}

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

// PROJEKTY

// Funkcja pobierająca dane z API i filtrująca według miesiąca i roku
export const fetchProjectsData = async (month: string, year: string): Promise<ProjectData[]> => {
    try {
        const response = await axios.get('http://localhost:5069/api/Projects');

        // Filtrowanie danych według daty
        const filteredProjects = response.data.filter((project: any) => {
            const startDate = new Date(project.projectStartDate);
            const endDate = new Date(project.projectEndDate);
            const selectedDate = new Date(`${year}-${month}-01`);

            return startDate <= selectedDate && endDate >= selectedDate;
        });

        // Przetwarzanie danych do ujednoliconego formatu
        return filteredProjects.map((project: any) => ({
            projectName: project.projectName,
            projectType: project.projectType,
            projectStatus: project.projectStatus,
            projectBudget: project.projectBudget,
            projectStartDate: project.projectStartDate,
            projectEndDate: project.projectEndDate,
        }));
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return [];
    }
};

// Funkcja dla wykresu kołowego - budżety według typów projektów
export const processPieChartData = (projects: ProjectData[]) => {
    const budgetByType: { [key: string]: number } = {};
    const projectDetailsByType: { [key: string]: string[] } = {};

    projects.forEach((project) => {
        if (budgetByType[project.projectType]) {
            budgetByType[project.projectType] += project.projectBudget;
            projectDetailsByType[project.projectType].push(`${project.projectName}: $${project.projectBudget}`);
        } else {
            budgetByType[project.projectType] = project.projectBudget;
            projectDetailsByType[project.projectType] = [`${project.projectName}: $${project.projectBudget}`];
        }
    });

    // Konwersja danych do formatu wykresu
    const labels = Object.keys(budgetByType);
    const data = Object.values(budgetByType);

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: ['#034C8C', '#356fa3', '#6793ba', '#012646'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
        tooltipData: projectDetailsByType,
    };
};

// Funkcja dla wykresu słupkowego - liczba zakończonych i aktywnych projektów
export const processBarChartData = (projects: ProjectData[]) => {
    const statusCount = { Active: 0, Completed: 0 };
    const activeProjects: string[] = [];
    const completedProjects: string[] = [];

    projects.forEach((project) => {
        if (project.projectStatus === 'Zakończony') {
            statusCount.Completed++;
            completedProjects.push(`${project.projectName} ($${project.projectBudget})`);
        } else {
            statusCount.Active++;
            activeProjects.push(`${project.projectName} ($${project.projectBudget})`);
        }
    });

    return {
        labels: ['Active', 'Completed'],
        datasets: [
            {
                data: [statusCount.Active, statusCount.Completed],
                backgroundColor: ['#034C8C', '#356fa3'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
        tooltipData: { Active: activeProjects, Completed: completedProjects },
    };
};

// SALES

// Pobieranie danych sprzedaży
export const fetchSalesData = async (month: string, year: string): Promise<SalesData[]> => {
    try {
        const response = await axios.get('http://localhost:5069/api/Sales');
        const filteredSales = response.data.filter((sale: any) => {
            const saleDate = new Date(sale.saleDate);
            const selectedDate = new Date(`${year}-${month}-01`);
            return saleDate.getFullYear() === selectedDate.getFullYear() &&
                saleDate.getMonth() === selectedDate.getMonth();
        });

        return filteredSales.map((sale: any) => ({
            saleID: sale.saleID,
            saleDate: sale.saleDate,
            totalNetAmount: sale.totalNetAmount,
            totalVATAmount: sale.totalVATAmount,
            totalGrossAmount: sale.totalGrossAmount,
            saleStatus: sale.saleStatus,
            clientName: sale.clientName,
            clientNIP: sale.clientNIP,
            clientRegon: sale.clientRegon,
        }));
    } catch (error) {
        console.error('Error fetching sales data:', error);
        return [];
    }
};

// Dane do wykresu kołowego dla sprzedaży (statusy)
export const processSalesPieChartData = (sales: SalesData[]) => {
    const statusCount: { [key: string]: number } = {};
    sales.forEach((sale) => {
        const status = sale.saleStatus || 'Unknown';
        statusCount[status] = (statusCount[status] || 0) + 1;
    });

    return {
        labels: Object.keys(statusCount),
        datasets: [
            {
                data: Object.values(statusCount),
                backgroundColor: ['#034C8C', '#356fa3', '#6793ba', '#012646'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
    };
};

// Dane do wykresu liniowego dla sprzedaży w czasie
export const processSalesLineChartData = (sales: SalesData[]) => {
    const salesByDate: { [key: string]: number } = {};
    sales.forEach((sale) => {
        const date = sale.saleDate.split('T')[0]; // Tylko data bez godziny
        salesByDate[date] = (salesByDate[date] || 0) + (sale.totalGrossAmount || 0);
    });

    return {
        labels: Object.keys(salesByDate).sort(),
        datasets: [
            {
                label: 'Sales Over Time',
                data: Object.values(salesByDate),
                backgroundColor: '#6793ba',
                borderColor: '#034C8C',
                fill: false,
                tension: 0.1,
            },
        ],
    };
};

// PAYMENTS

// Pobieranie danych płatności
export const fetchPaymentsData = async (month: string, year: string): Promise<PaymentsData[]> => {
    try {
        const response = await axios.get('http://localhost:5069/api/Payments');
        return response.data.filter((payment: any) => {
            const paymentDate = new Date(payment.paymentDate);
            const selectedDate = new Date(`${year}-${month}-01`);
            return paymentDate.getFullYear() === selectedDate.getFullYear() &&
                paymentDate.getMonth() === selectedDate.getMonth();
        });
    } catch (error) {
        console.error('Error fetching payments data:', error);
        return [];
    }
};

// Dane do wykresu kołowego - metody płatności (kwoty)
export const processPaymentsPieChartData = (payments: PaymentsData[]) => {
    // Grupowanie według metody płatności
    const methodTotals: { [key: string]: number } = {};

    payments.forEach((payment) => {
        const method = payment.paymentMethod || 'Unknown'; // Domyślna wartość
        const amount = payment.paymentAmount || 0; // Obsługa null

        if (methodTotals[method]) {
            methodTotals[method] += amount;
        } else {
            methodTotals[method] = amount;
        }
    });

    // Tworzenie danych do wykresu
    const labels = Object.keys(methodTotals);
    const data = Object.values(methodTotals);

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: ['#034C8C', '#356fa3', '#6793ba', '#012646'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
    };
};

// Dane do wykresu słupkowego - liczba płatności według metod
export const processPaymentsBarChartData = (payments: PaymentsData[]) => {
    const methodCounts: { [key: string]: number } = {};
    const methodDetails: { [key: string]: string[] } = {}; // Szczegóły dla tooltipów

    payments.forEach((payment) => {
        const method = payment.paymentMethod || 'Unknown';
        const amount = payment.paymentAmount || 0;

        // Zliczanie metod płatności
        methodCounts[method] = (methodCounts[method] || 0) + 1;

        // Szczegóły do tooltipów
        if (!methodDetails[method]) {
            methodDetails[method] = [];
        }
        methodDetails[method].push(`$${amount.toFixed(2)}`);
    });

    return {
        labels: Object.keys(methodCounts),
        datasets: [
            {
                data: Object.values(methodCounts),
                backgroundColor: ['#034C8C', '#356fa3', '#6793ba'],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
        tooltipData: methodDetails, // Dodano tooltipData
    };
};