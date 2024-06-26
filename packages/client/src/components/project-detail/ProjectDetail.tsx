'use client';
import React, { useEffect } from 'react';
import { Page, Project, Story } from '@/utils';
import { Board, BoardProgress, NewStoryDialog } from './Board';
import { useDispatch } from 'react-redux';
import {
  collaborations,
  project as setProject,
  stories as setStories
} from '@/store/features/ProjectSlice';
import { Collaborations } from './Collaborations';
import { Button } from '../ui/button';
import { Settings } from '../icons';
import { Collaboration } from '@/utils/api/collaborations';
import { useRouter } from 'next/navigation';

interface ProjectDetailProps {
  project: Project;
  stories: Story[];
  collabs: Page<Collaboration>;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, stories, collabs }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setProject(project));
  }, [project]);

  useEffect(() => {
    dispatch(setStories(stories));
  }, [stories]);

  useEffect(() => {
    dispatch(collaborations(collabs));
  }, [collabs]);

  return (
    <main>
      <div className="flex items-center justify-between w-full">
        <div className="max w-[32rem]">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
        <Collaborations />
        <div className="w-full flex gap-4 items-center justify-end">
          <div className="w-[24rem]">
            <BoardProgress />
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push(`/project/${project.id}/settings`)}
          >
            <Settings className="w-5" />
          </Button>

          <NewStoryDialog>
            <Button>New story</Button>
          </NewStoryDialog>
        </div>
      </div>
      <Board />
    </main>
  );
};
