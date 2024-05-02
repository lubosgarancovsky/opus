import axios from 'axios';
import { resolve } from '../client';
import { Page } from '../types';
import { Project } from './types';

export * from './types';

export const listProjects = async (): Promise<Page<Project>> => {
  return resolve(axios.get('/api/v1/project'));
};

export const getProjectDetail = async (id: string): Promise<Project> => {
  return resolve(axios.get(`/api/v1/project/${id}`));
};

export const createProject = async (data: any): Promise<Project> => {
  return resolve(axios.post(`/api/v1/project/`, data));
};
