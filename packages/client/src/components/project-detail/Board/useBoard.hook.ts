'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Story as StoryType, isWithinRect, storyToDto, updateStory } from '@/utils';
import { stories as setStories } from '@/store/features/ProjectSlice';
import { useMutation } from '@tanstack/react-query';
import { useMemo, createRef, useEffect } from 'react';

const updatedStories = (stories: StoryType[], draggedStory: StoryType, newStory: any) => {
  const newStories = stories.map((item: StoryType) => {
    if (item.id === draggedStory.id) {
      return { ...draggedStory, status: newStory.status };
    }
    return item;
  });

  return newStories;
};

export const useBoard = () => {
  const { stories } = useSelector((state: any) => state.project);
  const { position, dragged } = useSelector((state: any) => state.board);
  const dispatch = useDispatch();

  const columns = ['to-do', 'in-progress', 'in-testing', 'done', 'blocked'];

  const mutation = useMutation({
    mutationKey: ['update-story'],
    mutationFn: (newStory: any) => updateStory(dragged.id, newStory),
    onMutate: (newStory: any) => dispatch(setStories(updatedStories(stories, dragged, newStory)))
  });

  const columnRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement> | null> = {};
    columns.forEach((item) => {
      refs[item] = createRef();
    });
    return refs;
  }, []);

  const storiesByColumn: Record<string, StoryType[]> = useMemo(() => {
    if (stories) {
      const result: Record<string, StoryType[]> = {};

      for (const story of stories) {
        if (result[story.status]) {
          result[story.status].push(story);
        } else {
          result[story.status] = [story];
        }
      }
      return result;
    }

    return {};
  }, [stories]);

  useEffect(() => {
    if (position.x > 0 && position.y > 0) {
      Object.entries(columnRefs).forEach(([key, value]) => {
        if (value && value.current) {
          const rect = value.current.getBoundingClientRect();

          if (isWithinRect(position, rect) && dragged.status !== key) {
            mutation.mutate({ ...storyToDto(dragged), status: key as StoryType['status'] });
          }
        }
      });
    }
  }, [position]);

  return {
    columns,
    columnRefs,
    stories: storiesByColumn
  };
};
