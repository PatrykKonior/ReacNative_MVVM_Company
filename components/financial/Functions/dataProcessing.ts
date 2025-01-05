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
