'use client';

import React from 'react';
import { Arrow, Folder } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Page, Project, listProjects, toDate } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { NewProjectDialog } from './NewProjectDialog';

const ProjectCard = ({ item, onClick }) => {
  return (
    <div className="shadow rounded-md p-3 bg-white flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Folder className="w-6" />
          <b>{item.title}</b>
        </div>
        <p className="text-xs text-muted-foreground">{toDate(item.createdAt)}</p>
      </div>

      <p className="text-muted-foreground">{item.description}</p>

      <Badge className="w-fit">{item.code}</Badge>

      <div className="flex justify-end">
        <Button variant="link" className="text-blue-500" onClick={onClick}>
          Go to project <Arrow className="w-4" />
        </Button>
      </div>
    </div>
  );
};

export const ProjectList: React.FC = ({}) => {
  const router = useRouter();

  const { data, status } = useQuery<Page<Project>>({
    queryKey: ['projects'],
    queryFn: listProjects
  });

  return (
    <div>
      <div className="flex w-full justify-between">
        <h3>Latest projects</h3>
        <Button>View all</Button>
      </div>
      <div className="my-4 grid grid-cols-4 gap-4">
        {status === 'success' &&
          data.items.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              onClick={() => router.push(`/project/${item.id}`)}
            />
          ))}
        <NewProjectDialog>
          <button className="text-slate-500 p-3 h-full rounded-md items-center justify-center border-2 border-dashed border-slate-400 bg-slate-200 w-full flex hover:bg-slate-300">
            <h3>Start new project</h3>
          </button>
        </NewProjectDialog>
      </div>
    </div>
  );
};
