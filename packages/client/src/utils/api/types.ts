export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface PublicDetails {
  id: string;
  displayName: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  code: string;
  owner: PublicDetails;
  createdAt: string;
}

export interface NewStory {
  title: string;
  description: string;
  assignedTo?: string | null;
  type: "bug" | "story";
  priority: -1 | 0 | 1;
  status?: "to-do" | "in-progress" | "in-testing" | "done" | "blocked";
}

export interface Collaboration {
  id: string;
  createdAt: string;
  collaborator: PublicDetails;
}

export interface CollaborationRequest {
  id: string;
  createdAt: string;
  project: {
    id: string;
    title: string;
    code: string;
  };
  sender: PublicDetails;
  recipient: PublicDetails;
}
