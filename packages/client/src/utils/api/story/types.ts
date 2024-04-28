export type Story = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  createdAt: string;
  createdBy: {
    id: string;
    displayName: string;
  };
  assignedTo: {
    id: string;
    displayName: string;
  } | null;
  status: string;
  type: 'story' | 'bug';
  code: string;
  priority: number;
};
