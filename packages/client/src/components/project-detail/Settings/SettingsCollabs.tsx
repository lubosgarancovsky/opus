'use client';

import React from 'react';
import { Avatar, DataSection, DataSectionContent, DataSectionTitle } from '@/components/common';
import { Page, initials } from '@/utils';
import { Collaboration, listCollaborationsByProject } from '@/utils/api/collaborations';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash } from '@/components/icons';

interface SettingsCollabsProps {
  id: string;
}

export const SettingsCollabs: React.FC<SettingsCollabsProps> = ({ id }) => {
  const { data, status } = useQuery<Page<Collaboration>>({
    queryKey: ['collabs', id],
    queryFn: () => listCollaborationsByProject(id)
  });

  return (
    <DataSection>
      <DataSectionTitle>Collaborations</DataSectionTitle>
      <DataSectionContent>
        <div className="bg-white rounded-md p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Collaborator</TableHead>
                <TableHead>Since</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status === 'success' &&
                data.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Avatar name={item.collaborator.displayName}>
                        {initials(item.collaborator.displayName)}
                      </Avatar>
                    </TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell align="right">
                      <Button variant="destructive" size="icon">
                        <Trash className="w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </DataSectionContent>
    </DataSection>
  );
};
