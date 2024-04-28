'use client';

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

  return (
    <div className="shadow shadow-slate-200 p-4 rounded-xl bg-white">
      <div className="w-full">
        <h4>My Work</h4>
      </div>
      <div className="my-4">
        {status === 'success' &&
          Object.entries(filteredData).map(([key, value]) => (
            <div key={key}>
              <b>{storyState(key)}</b>
              {value.map((item: Story) => (
                <div key={item.id} className="flex justify-between gap-4 items-center py-3">
                  <div className="col-span-8 flex gap-3 items-center">
                    <div className="p-3 bg-danger"></div>
                    <b className="text-sm">{item.code}</b>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};
