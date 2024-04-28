import axios from 'axios';
import { resolve } from '../client';
import { Page } from '../types';
import { Project } from './types';

export * from './types';

export const listProjects = async (): Promise<Page<Project>> => {
  return resolve(axios.get('/api/v1/project'));
};
