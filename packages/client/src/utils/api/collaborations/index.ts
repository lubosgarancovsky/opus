import axios from 'axios';
import { resolve } from '../client';

export * from './types';

export const sendInvitation = async (recipient: string, projectId: string) => {
  return resolve(axios.post('/api/v1/collaboration/request', { recipient, projectId }));
};

export const listCollaborationsByProject = async (projectId: string, assignedTo?: string) => {
  return resolve(
    axios.get(
      `/api/v1/project/${projectId}/collaboration?filter=collaborator.displayName=like=(${assignedTo})&page=1&page-size=50`
    )
  );
};
