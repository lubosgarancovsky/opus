import React from 'react';
import { Bookmark, Bug, Person } from '@/components/icons';
import { Story as StoryType, cn, initials } from '@/utils';
import { Avatar } from '@/components/common';
import { useStory } from './useStory.hook';

const StoryTypeIcon: React.FC<{ type: StoryType['type'] }> = ({ type }) => (
  <>
    {type === 'story' ? (
      <Bookmark className="w-4 text-success" />
    ) : (
      <Bug className="w-4 text-danger" />
    )}
  </>
);

const StoryPriority: React.FC<{ priority: number }> = ({ priority }) => (
  <span
    className={cn('rounded-full w-2 h-2', {
      'bg-green-500': priority === -1,
      'bg-yellow-500': priority === 0,
      'bg-red-500': priority === 1
    })}
  />
);

const StoryAssigneeIcon: React.FC<{ assignedTo: StoryType['assignedTo'] }> = ({ assignedTo }) => (
  <div className="ml-auto">
    <Avatar color={assignedTo ? '#f52738' : '#e0e0e0'}>
      {assignedTo ? initials(assignedTo.displayName) : <Person className="w-4 text-black" />}
    </Avatar>
  </div>
);

export const Story: React.FC<{ story: StoryType }> = ({ story }) => {
  const { onClick, onDragStart, onDragEnd } = useStory(story);

  return (
    <button
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        'bg-white rounded shadow p-3 flex flex-col border-l-4 text-left hover:bg-neutral-50',
        {
          'border-success': story.type === 'story',
          'border-danger': story.type === 'bug'
        }
      )}
    >
      <b className="text-sm">{story.code}</b>
      <span>{story.title}</span>

      <div className="mt-4 flex items-center gap-3 w-full">
        <StoryTypeIcon type={story.type} />
        <StoryPriority priority={story.priority} />
        <StoryAssigneeIcon assignedTo={story.assignedTo} />
      </div>
    </button>
  );
};
