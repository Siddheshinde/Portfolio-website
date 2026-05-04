import axios from 'axios';
import type { Project, SkillCategories, Experience, ContactFormData, ApiResponse } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await api.get<ApiResponse<Project[]>>('/projects');
  return data.data;
};

export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  const { data } = await api.get<ApiResponse<Project>>(`/projects/${slug}`);
  return data.data;
};

export const fetchAboutData = async (): Promise<{ skills: SkillCategories; experience: Experience[] }> => {
  const { data } = await api.get<ApiResponse<{ skills: SkillCategories; experience: Experience[] }>>('/about');
  return data.data;
};

export const submitContact = async (formData: ContactFormData): Promise<{ message: string }> => {
  const { data } = await api.post<{ success: boolean; message: string }>('/contact', formData);
  return data;
};
