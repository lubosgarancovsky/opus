export type NewCollaboration = {
  email: string;
};

export type Collaboration = {
  id: string;
  createdAt: string;
  collaborator: {
    id: string;
    displayName: string;
  };
};
