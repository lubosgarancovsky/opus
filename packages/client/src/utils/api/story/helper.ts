import { Story } from './types';

export const storyState = (state: string) => {
  switch (state) {
    case 'to-do':
      return 'To do';
    case 'in-progress':
      return 'In progress';
    case 'done':
      return 'Done';
    case 'in-testing':
      return 'In testing';
    default:
      return 'Blocked';
  }
};

export const storyToDto = (story: Story, mutations?: object) => {
  return {
    title: story.title,
    description: story.description,
    assignedTo: story.assignedTo ? story.assignedTo.id : null,
    type: story.type,
    priority: story.priority,
    status: story.status,
    ...mutations
  };
};
