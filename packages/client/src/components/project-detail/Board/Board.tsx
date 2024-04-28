'use client';

import React, { forwardRef } from 'react';
import { Story as StoryType, cn, storyState } from '@/utils';
import { Story } from '../Story';
import { useSelector } from 'react-redux';
import { StoryDetail } from '@/components';
import { useBoard } from './useBoard.hook';

const BoardColumn = forwardRef<HTMLDivElement, { stories: StoryType[]; status: string }>(
  ({ stories, status }, ref) => {
    const { isDragging } = useSelector((state: any) => state.board);

    return (
      <div className="flex flex-col gap-4">
        <div className="font-bold bg-white shadow rounded p-3 flex justify-between items-center">
          <span>{storyState(status)}</span>
          <span className="text-sm text-slate-400">{stories.length}</span>
        </div>
        <div
          ref={ref}
          className={cn('flex flex-col gap-4 rounded min-h-screen', {
            'border-2 border-dashed border-slate-400 bg-slate-200': isDragging,
            'border-success bg-success/20': isDragging && status === 'done',
            'border-danger bg-danger/20': isDragging && status === 'blocked'
          })}
        >
          {stories.map((item) => (
            <Story key={item.id} story={item} />
          ))}
        </div>
      </div>
    );
  }
);

export const Board: React.FC = () => {
  const { columns, columnRefs, stories } = useBoard();
  return (
    <div>
      <StoryDetail />
      <div className="grid grid-cols-5 gap-4 mt-8">
        {columns.map((col, index) => (
          <BoardColumn
            ref={columnRefs[col]}
            key={index}
            stories={stories[col] ?? []}
            status={col}
          />
        ))}
      </div>
    </div>
  );
};
