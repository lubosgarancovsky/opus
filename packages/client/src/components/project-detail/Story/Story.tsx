import React from 'react';
import { Bookmark, Bug, Person } from '@/components/icons';
import { Story as StoryType, cn, initials } from '@/utils';
import { Avatar } from '@/components/common';
import { useStory } from './useStory.hook';
import { Badge } from '@/components/ui/badge';

const StoryTypeIcon: React.FC<{ type: StoryType['type'] }> = ({ type }) => (
  <>
    {type === 'story' ? (
      <Badge>
        <div className="flex gap-2">
          <Bookmark className="w-4" />
          STORY
        </div>
      </Badge>
    ) : (
      <Badge className="bg-danger hover:bg-danger">
        <div className="flex gap-2">
          <Bug className="w-4" />
          BUG
        </div>
      </Badge>
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
      className={cn('bg-slate-200 rounded p-4 flex flex-col text-left hover:bg-slate-300')}
    >
      <b className="text-sm">{story.code}</b>
      <p>{story.title}</p>

      <div className="mt-4 flex items-center gap-3 w-full">
        <StoryTypeIcon type={story.type} />
        <StoryPriority priority={story.priority} />
        <StoryAssigneeIcon assignedTo={story.assignedTo} />
      </div>
    </button>
  );
};
