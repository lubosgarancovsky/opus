'use client';

import { Story, storyToDto, updateStory } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { stories as setStories, storyDetail } from '@/store/features/ProjectSlice';

export const useStoryDetail = () => {
  const story = useSelector((state: any) => state.project.storyDetail);
  const stories = useSelector((state: any) => state.project.stories);

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (values: any) => updateStory(story.id, values.newStory),
    mutationKey: ['update-story'],
    onMutate: (values: any) => updateStories(values)
  });

  const updateStories = (values: any) => {
    let newStoryBody;

    const { newStory, assignee } = values;

    const newStories = stories.map((item: Story) => {
      if (item.id === story.id) {
        newStoryBody = {
          ...item,
          title: newStory.title,
          description: newStory.description,
          assignedTo: assignee !== undefined ? assignee : story.assignedTo,
          status: newStory.status
        };
        return newStoryBody;
      }
      return item;
    });

    dispatch(setStories(newStories));
    dispatch(storyDetail(newStoryBody));
  };

  const close = () => {
    dispatch(storyDetail(null));
  };

  const assignTo = (assignee: Story['assignedTo']) => {
    mutation.mutate({
      newStory: storyToDto(story, { assignedTo: assignee?.id ?? null }),
      assignee
    });
  };

  const edit = (value: any) => {
    mutation.mutate({ newStory: storyToDto(story, value) });
  };

  return {
    story,
    close,
    assignTo,
    edit
  };
};
