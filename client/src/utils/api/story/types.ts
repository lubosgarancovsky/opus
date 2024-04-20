import { PublicDetails } from "../types";

export type StoryStatus =
  | "to-do"
  | "in-progress"
  | "in-testing"
  | "done"
  | "blocked";

export interface Story {
  id: string;
  title: string;
  description: string;
  projectId: string;
  createdAt: string;
  createdBy: PublicDetails;
  assignedTo: PublicDetails;
  status: StoryStatus;
  type: string;
  code: string;
  priority: number;
}
