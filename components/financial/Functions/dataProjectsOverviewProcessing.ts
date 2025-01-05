// Typ dla danych projektu
export interface ProjectData {
    projectName: string;
    projectType: string;
    projectStatus: string;
    projectBudget: number;
}

// Typ dla danych podsumowania
export interface OverviewData {
    totalBudget: number;
    activeCount: number;
    completedCount: number;
    maxBudgetProject: { name: string; budget: number };
    minBudgetProject: { name: string; budget: number };
    averageBudget: number;
    projectTypes: { type: string; budget: number }[];
}

// Funkcja do przetwarzania danych dla podsumowania
export const processOverviewData = (projects: ProjectData[]): OverviewData => {
    const totalBudget = projects.reduce((sum, proj) => sum + proj.projectBudget, 0);

    const activeProjects = projects.filter(proj => proj.projectStatus === 'W trakcie');
    const completedProjects = projects.filter(proj => proj.projectStatus === 'Zakończony');

    const maxBudgetProject = projects.reduce((prev, current) =>
        prev.projectBudget > current.projectBudget ? prev : current
    );

    const minBudgetProject = projects.reduce((prev, current) =>
        prev.projectBudget < current.projectBudget ? prev : current
    );

    const averageBudget = totalBudget / projects.length;

    const projectTypes = projects.reduce((acc: { [key: string]: number }, proj) => {
        acc[proj.projectType] = (acc[proj.projectType] || 0) + proj.projectBudget;
        return acc;
    }, {});

    const projectTypeArray = Object.entries(projectTypes).map(([type, budget]) => ({
        type,
        budget,
    }));

    return {
        totalBudget,
        activeCount: activeProjects.length,
        completedCount: completedProjects.length,
        maxBudgetProject: {
            name: maxBudgetProject.projectName,
            budget: maxBudgetProject.projectBudget,
        },
        minBudgetProject: {
            name: minBudgetProject.projectName,
            budget: minBudgetProject.projectBudget,
        },
        averageBudget,
        projectTypes: projectTypeArray,
    };
};
