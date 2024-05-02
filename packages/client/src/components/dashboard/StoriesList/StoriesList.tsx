'use client';

import { Bookmark, Bug } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Story, listAssignedStories, storyState } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

interface StoriesListProps {}

export const StoriesList: React.FC<StoriesListProps> = ({}) => {
  const { data, status } = useQuery<Story[]>({
    queryKey: ['stories'],
    queryFn: listAssignedStories
  });

  const filteredData = useMemo(() => {
    if (status === 'success') {
      const result: Record<string, Story[]> = {};

      for (const item of data) {
        if (result[item.status]) {
          result[item.status].push(item);
        } else {
          result[item.status] = [];
          result[item.status].push(item);
        }
      }

      return result;
    }

    return [] as Story[];
  }, [data]);

  const trunctate = (str: string) => {
    if (str.length > 40) {
      return str.slice(0, 40) + '...';
    }
  };

  return (
    <div>
      <h3 className="mb-4">My work</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {status === 'success' &&
          Object.entries(filteredData).map(([key, value]) => (
            <div
              key={key}
              className="text-slate-500 p-3 rounded-md items-center justify-center border-2 border-dashed border-slate-400 bg-slate-200 w-full"
            >
              <b>{storyState(key)}</b>
              <div className="flex gap-3 mt-3">
                {value.map((item: Story) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-md shadow min-w-[16rem] text-foreground"
                  >
                    <div className="flex gap-2 items-center">
                      <div
                        className={cn('p-2 w-fit rounded', {
                          'text-danger bg-danger/10': item.type === 'bug',
                          'text-success bg-success/10': item.type === 'story'
                        })}
                      >
                        {item.type === 'bug' ? (
                          <Bug className="w-4" />
                        ) : (
                          <Bookmark className="w-4" />
                        )}
                      </div>
                      <b className="text-sm block">{item.code}</b>
                    </div>
                    <div className="mt-4">
                      <b>{item.title}</b>
                      <p className="max-w-[16rem]">{trunctate(item.description)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
