import axios from 'axios';
import { resolve } from '../client';

export * from './types';

export const sendInvitation = async (recipient: string, projectId: string) => {
  return resolve(axios.post('/api/v1/requests', { recipient, projectId }));
};

export const listCollaborationsByProject = async (projectId: string, assignedTo?: string) => {
  return resolve(
    axios.get(
      `/api/v1/projects/${projectId}/collaborations?filter=collaborator.displayName=like=(${assignedTo})&page=1&page-size=50`
    )
  );
};

export const listRequests = async () => {
  return resolve(axios.get(`/api/v1/requests`));
};

export const listRequestsByProject = async (projectId: string) => {
  return resolve(axios.get(`/api/v1/project/${projectId}/collaboration-request`));
};

export const acceptRequest = async (id: string) => {
  return resolve(axios.post(`/api/v1/requests/${id}/accept`));
};

export const declineRequest = async (id: string) => {
  return resolve(axios.delete(`/api/v1/requests/${id}/decline`));
};
