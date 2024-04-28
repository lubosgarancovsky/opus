export interface Project {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  code: string;
  owner: {
    id: string;
    displayName: string;
  };
  createdAt: string;
}
