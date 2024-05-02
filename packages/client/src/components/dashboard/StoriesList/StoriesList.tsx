'use client';

import React, { useMemo } from 'react';
import { Story, listAssignedStories, storyState } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { StoriesListCard } from './StoriesListCard';

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

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-slate-400">My work</h2>

      <div className="flex gap-4 overflow-x-hidden">
        {status === 'success' &&
          Object.entries(filteredData).map(([key, value]) => (
            <div key={key}>
              <div className="flex gap-4 items-center">
                <b className="text-slate-600 whitespace-nowrap">{storyState(key)}</b>
                <div className="h-[1px] bg-slate-300 w-full"></div>
              </div>
              <div className="flex gap-4 mt-4">
                {value.map((item: Story) => (
                  <StoriesListCard key={item.id} story={item} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
