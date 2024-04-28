'use client';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const BoardProgress: React.FC = () => {
  const stories = useSelector((state: any) => state.project.stories);
  const { done, inProgress } = useMemo(() => {
    if (!stories) return { done: 0, inProgress: 0 };

    const all = stories.length;

    let doneCount = 0;
    let inProgressCount = 0;

    for (const story of stories) {
      if (story.status === 'done') doneCount++;
      if (story.status === 'in-progress' || story.status === 'in-testing') inProgressCount++;
    }

    return { done: (doneCount / all) * 100, inProgress: (inProgressCount / all) * 100 };
  }, [stories]);

  return (
    <div className="h-2 rounded-full overflow-hidden bg-neutral-300 flex">
      <div
        className="bg-success h-2"
        style={{
          width: `${done}%`
        }}
      ></div>
      <div
        className="bg-blue-500 h-2"
        style={{
          width: `${inProgress}%`
        }}
      ></div>
    </div>
  );
};
