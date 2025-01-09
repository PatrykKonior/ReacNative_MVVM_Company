import axios from 'axios';

// API Client
const apiClient = axios.create({
    baseURL: 'http://localhost:5069/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Pobierz zadania z API
export const fetchTasks = async () => {
    try {
        const response = await apiClient.get('/tasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

// Pobierz pracowników z API
export const fetchEmployees = async () => {
    try {
        const response = await apiClient.get('/employees');
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
};

// Przetwórz dane zadań
export const processTasks = (tasks: any[]) => {
    // Grupowanie zadań według statusu
    const groupedTasks = {
        completed: tasks.filter(task => task.taskStatus === 'Zakończono'),
        inProgress: tasks.filter(task => task.taskStatus === 'W trakcie'),
        overdue: tasks.filter(
            task =>
                task.taskEndDate &&
                new Date(task.taskEndDate) < new Date() &&
                task.taskStatus !== 'Zakończono'
        ),
    };

    // Grupowanie zadań według terminów
    const taskByDeadline = {
        shortTerm: tasks.filter(task => {
            const diff = (new Date(task.taskEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
            return diff >= 0 && diff <= 7;
        }),
        mediumTerm: tasks.filter(task => {
            const diff = (new Date(task.taskEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
            return diff > 7 && diff <= 30;
        }),
        longTerm: tasks.filter(task => {
            const diff = (new Date(task.taskEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
            return diff > 30;
        }),
    };

    return { groupedTasks, taskByDeadline };
};

// Przetwórz dane pracowników
export const processEmployeeLoad = (tasks: any[], employees: any[]) => {
    const employeeLoad = employees.map(employee => {
        const assignedTasks = tasks.filter(task => task.assignedEmployeeID === employee.employeeID);
        const totalHours = assignedTasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0);

        return {
            employeeName: `${employee.firstName} ${employee.lastName}`,
            totalHours,
            assignedTasks,
        };
    });

    return employeeLoad;
};

// Przetwórz dane dla sekcji analitycznej
export const processAnalytics = (tasks: any[]) => {
    const averageDuration =
        tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0) / tasks.length || 0;

    const longestTask = tasks.reduce((prev, current) =>
        (current.estimatedHours || 0) > (prev.estimatedHours || 0) ? current : prev
    );

    const shortestTask = tasks.reduce((prev, current) =>
        (current.estimatedHours || 0) < (prev.estimatedHours || 0) ? current : prev
    );

    return {
        averageDuration: averageDuration.toFixed(2),
        longestTask: {
            name: longestTask.taskName,
            hours: longestTask.estimatedHours || 0,
        },
        shortestTask: {
            name: shortestTask.taskName,
            hours: shortestTask.estimatedHours || 0,
        },
    };
};
