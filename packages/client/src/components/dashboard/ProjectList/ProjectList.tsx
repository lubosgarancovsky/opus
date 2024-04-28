'use client';

import { Button } from '@/components/common';
import { Page, Project, listProjects } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProjectListProps {}

export const ProjectList: React.FC<ProjectListProps> = ({}) => {
  //const [page, setPage] = useState<number>(1);
  const { data, status } = useQuery<Page<Project>>({
    queryKey: ['projects'],
    queryFn: listProjects
  });

  const router = useRouter();

  return (
    <div className="p-4 rounded-xl bg-white border-foreground/10 shadow shadow-slate-200">
      <div>
        <h4>Projects</h4>
      </div>
      <div className="my-4">
        {status === 'success' &&
          data.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 items-center p-3 border-t">
              <div className="col-span-8">
                <b>{item.title}</b>
                <p>{item.description}</p>
              </div>
              <Button variant="secondary" onClick={() => router.push(`/project/${item.id}`)}>
                Open
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};
