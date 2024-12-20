import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

// Typy dla projektu
interface Project {
    ProjectID?: number;
    ProjectName: string;
    ProjectType: string;
    ProjectStartDate: string;
    ProjectEndDate: string;
    ProjectBudget: string;
    VATRate: string;
    ProjectStatus: string;
    ClientID: string;
    ManagerID: string;
    ClientName?: string;
    ManagerFirstName?: string;
    ManagerLastName?: string;
    ManagerPosition?: string;
}

// Typy dla błędów
interface Errors {
    ProjectName?: string;
    ProjectType?: string;
    ProjectStartDate?: string;
    ProjectEndDate?: string;
    ProjectBudget?: string;
    VATRate?: string;
    ProjectStatus?: string;
    ClientID?: string;
    ManagerID?: string;
}

export default function AddProject() {
    const [project, setProject] = useState<Project>({
        ProjectName: '',
        ProjectType: '',
        ProjectStartDate: '',
        ProjectEndDate: '',
        ProjectBudget: '',
        VATRate: '',
        ProjectStatus: '',
        ClientID: '',
        ManagerID: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isEditing, setIsEditing] = useState(false);

    const apiClient = axios.create({
        baseURL: 'http://localhost:5069/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleInputChange = (field: keyof Project, value: string) => {
        setProject({ ...project, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const validateFields = (): boolean => {
        const newErrors: Partial<Errors> = {};

        if (!project.ProjectName.trim()) newErrors.ProjectName = 'Project Name is required';
        if (!project.ProjectType.trim()) newErrors.ProjectType = 'Project Type is required';
        if (!project.ProjectStartDate.trim()) newErrors.ProjectStartDate = 'Start Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(project.ProjectStartDate)) {
            newErrors.ProjectStartDate = 'Invalid date format (YYYY-MM-DD)';
        }
        if (!project.ProjectEndDate.trim()) newErrors.ProjectEndDate = 'End Date is required';
        if (!/\d{4}-\d{2}-\d{2}/.test(project.ProjectEndDate)) {
            newErrors.ProjectEndDate = 'Invalid date format (YYYY-MM-DD)';
        }
        if (!project.ProjectBudget.trim()) newErrors.ProjectBudget = 'Budget is required';
        if (isNaN(Number(project.ProjectBudget))) {
            newErrors.ProjectBudget = 'Budget must be a number';
        }
        if (!project.VATRate.trim()) newErrors.VATRate = 'VAT Rate is required';
        if (isNaN(Number(project.VATRate))) newErrors.VATRate = 'VAT Rate must be a number';
        if (!project.ProjectStatus.trim()) newErrors.ProjectStatus = 'Status is required';
        if (!project.ClientID.trim()) newErrors.ClientID = 'Client ID is required';
        if (!project.ManagerID.trim()) newErrors.ManagerID = 'Manager ID is required';

        setErrors(newErrors as Errors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveProject = async () => {
        if (!validateFields()) return;

        try {
            if (isEditing && project.ProjectID) {
                // Aktualizacja istniejącego projektu
                await apiClient.put(`/Projects/${project.ProjectID}`, project);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Project updated successfully 🚀',
                    position: 'top',
                    visibilityTime: 4000,
                });
            } else {
                // Tworzenie nowego projektu
                await apiClient.post('/Projects', project);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Project added successfully 🚀',
                    position: 'top',
                    visibilityTime: 4000,
                });
            }

            setProject({
                ProjectName: '',
                ProjectType: '',
                ProjectStartDate: '',
                ProjectEndDate: '',
                ProjectBudget: '',
                VATRate: '',
                ProjectStatus: '',
                ClientID: '',
                ManagerID: '',
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving project:', error);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not save project. Try again.',
                position: 'top',
                visibilityTime: 4000,
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{isEditing ? 'Edit Project' : 'Add New Project'}</Text>

            <TextInput
                placeholder="Project Name"
                style={[styles.input, errors.ProjectName ? styles.errorBorder : null]}
                value={project.ProjectName}
                onChangeText={(text) => handleInputChange('ProjectName', text)}
            />
            {errors.ProjectName && <Text style={styles.errorText}>{errors.ProjectName}</Text>}

            <TextInput
                placeholder="Project Type"
                style={[styles.input, errors.ProjectType ? styles.errorBorder : null]}
                value={project.ProjectType}
                onChangeText={(text) => handleInputChange('ProjectType', text)}
            />
            {errors.ProjectType && <Text style={styles.errorText}>{errors.ProjectType}</Text>}

            <TextInput
                placeholder="Start Date (YYYY-MM-DD)"
                style={[styles.input, errors.ProjectStartDate ? styles.errorBorder : null]}
                value={project.ProjectStartDate}
                onChangeText={(text) => handleInputChange('ProjectStartDate', text)}
            />
            {errors.ProjectStartDate && <Text style={styles.errorText}>{errors.ProjectStartDate}</Text>}

            <TextInput
                placeholder="End Date (YYYY-MM-DD)"
                style={[styles.input, errors.ProjectEndDate ? styles.errorBorder : null]}
                value={project.ProjectEndDate}
                onChangeText={(text) => handleInputChange('ProjectEndDate', text)}
            />
            {errors.ProjectEndDate && <Text style={styles.errorText}>{errors.ProjectEndDate}</Text>}

            <TextInput
                placeholder="Budget"
                style={[styles.input, errors.ProjectBudget ? styles.errorBorder : null]}
                value={project.ProjectBudget}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('ProjectBudget', text)}
            />
            {errors.ProjectBudget && <Text style={styles.errorText}>{errors.ProjectBudget}</Text>}

            <TextInput
                placeholder="VAT Rate"
                style={[styles.input, errors.VATRate ? styles.errorBorder : null]}
                value={project.VATRate}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('VATRate', text)}
            />
            {errors.VATRate && <Text style={styles.errorText}>{errors.VATRate}</Text>}

            <TextInput
                placeholder="Status"
                style={[styles.input, errors.ProjectStatus ? styles.errorBorder : null]}
                value={project.ProjectStatus}
                onChangeText={(text) => handleInputChange('ProjectStatus', text)}
            />
            {errors.ProjectStatus && <Text style={styles.errorText}>{errors.ProjectStatus}</Text>}

            <TextInput
                placeholder="Client ID"
                style={[styles.input, errors.ClientID ? styles.errorBorder : null]}
                value={project.ClientID}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('ClientID', text)}
            />
            {errors.ClientID && <Text style={styles.errorText}>{errors.ClientID}</Text>}

            <TextInput
                placeholder="Manager ID"
                style={[styles.input, errors.ManagerID ? styles.errorBorder : null]}
                value={project.ManagerID}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('ManagerID', text)}
            />
            {errors.ManagerID && <Text style={styles.errorText}>{errors.ManagerID}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleSaveProject}>
                <Text style={styles.addButtonText}>{isEditing ? 'Save Changes' : 'Add Project'}</Text>
            </TouchableOpacity>

            <Toast />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    errorBorder: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
    },
    addButton: {
        backgroundColor: '#465954',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
