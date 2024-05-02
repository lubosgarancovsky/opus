import axios from 'axios';
import { resolve } from '../client';

export * from './types';
export * from './helper';

export const listAssignedStories = async () => {
  return resolve(axios.get('/api/v1/stories'));
};

export const listStoriesByProjectId = async (projectId: string) => {
  return resolve(axios.get(`/api/v1/projects/${projectId}/stories`));
};

export const updateStory = async (id: string, story: any) => {
  return resolve(axios.put(`/api/v1/stories/${id}`, story));
};

export const createStory = async (projectId: number, story: any) => {
  return resolve(axios.post(`/api/v1/projects/${projectId}/stories`, story));
};
