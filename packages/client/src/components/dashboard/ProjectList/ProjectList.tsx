'use client';

import React from 'react';
import { Arrow, Folder } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Page, Project, listProjects } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const ProjectCard = ({ item, onClick }) => {
  return (
    <div className="rounded-xl p-3 bg-slate-200 flex flex-col gap-3 text-slate-600">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="bg-slate-300 p-3 rounded-full w-fit">
            <Folder className="w-5" />
          </div>
          <Badge className="w-fit h-fit bg-slate-600 hover:bg-slate-500">{item.code}</Badge>
        </div>
        <h4>{item.title}</h4>
      </div>

      <p className="text-slate-500 font-medium">{item.description}</p>

      <div>
        <Button variant="link" className="text-blue-500 px-0" onClick={onClick}>
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
        <h2 className="text-slate-400">Latest projects</h2>
        <Button>View all</Button>
      </div>
      <div className="my-4 flex flex-col gap-4">
        {status === 'success' &&
          data.items.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              onClick={() => router.push(`/project/${item.id}`)}
            />
          ))}
      </div>
    </div>
  );
};
