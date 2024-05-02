import axios from 'axios';
import { resolve } from '../client';
import { Page } from '../types';
import { Project } from './types';

export * from './types';

export const listProjects = async (): Promise<Page<Project>> => {
  return resolve(axios.get('/api/v1/projects'));
};

export const getProjectDetail = async (id: string): Promise<Project> => {
  return resolve(axios.get(`/api/v1/projects/${id}`));
};

export const createProject = async (data: any): Promise<Project> => {
  return resolve(axios.post(`/api/v1/projects/`, data));
};
