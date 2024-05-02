'use client';

import { Avatar, DataSection, DataSectionContent, DataSectionTitle } from '@/components/common';
import { Project, getProjectDetail, initials } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface SettingsDetailProps {
  id: string;
}

export const SettingsDetail: React.FC<SettingsDetailProps> = ({ id }) => {
  const { data, status } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProjectDetail(id)
  });

  return (
    <DataSection>
      <DataSectionTitle>Detail</DataSectionTitle>
      <DataSectionContent>
        {status === 'success' && (
          <div className="bg-white rounded-md p-4 flex flex-col gap-4">
            <div>
              <b>ID</b>
              <p>{data.id}</p>
            </div>
            <hr className="my-1.5" />
            <div>
              <b>Title</b>
              <p>{data.title}</p>
            </div>
            <hr className="my-1.5" />

            <div>
              <b>Description</b>
              <p>{data.description}</p>
            </div>
            <hr className="my-1.5" />

            <div>
              <b>Code</b>
              <p>{data.code}</p>
            </div>
            <hr className="my-1.5" />
            <div>
              <b>Created at</b>
              <p>{data.createdAt}</p>
            </div>
            <hr className="my-1.5" />
            <div>
              <b className="mb-1.5 block">Created by</b>
              <Avatar name={data.owner.displayName}>{initials(data.owner.displayName)}</Avatar>
            </div>
          </div>
        )}
      </DataSectionContent>
    </DataSection>
  );
};
