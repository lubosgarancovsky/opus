'use client';

import { startDragging, stopDragging } from '@/store/features/BoardSlice';
import { storyDetail } from '@/store/features/ProjectSlice';
import { Story } from '@/utils';
import { useDispatch } from 'react-redux';

export const useStory = (story: Story) => {
  const dispatch = useDispatch();

  const onDragStart = () => {
    dispatch(startDragging(story));
  };

  const onDragEnd = (event: React.MouseEvent) => {
    dispatch(stopDragging({ x: event.clientX, y: event.clientY }));
  };

  const onClick = () => {
    dispatch(storyDetail(story));
  };

  return {
    onClick,
    onDragStart,
    onDragEnd
  };
};
