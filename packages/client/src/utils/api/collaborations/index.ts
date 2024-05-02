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

export const listRequests = async () => {
  return resolve(axios.get(`/api/v1/collaboration/request`));
};

export const listRequestsByProject = async (projectId: string) => {
  return resolve(axios.get(`/api/v1/project/${projectId}/collaboration-request`));
};

export const acceptRequest = async (id: string) => {
  return resolve(axios.post(`/api/v1/collaboration/request/${id}/accept`));
};

export const declineRequest = async (id: string) => {
  return resolve(axios.delete(`/api/v1/collaboration/request/${id}/decline`));
};
