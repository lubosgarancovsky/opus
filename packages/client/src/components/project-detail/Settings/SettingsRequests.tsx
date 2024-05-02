'use client';

import { Avatar, DataSection, DataSectionContent, DataSectionTitle } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { initials } from '@/utils';
import { listRequestsByProject } from '@/utils/api/collaborations';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';

interface SettingsRequestsProps {
  id: string;
}

export const SettingsRequests: React.FC<SettingsRequestsProps> = ({ id }) => {
  const { data: session } = useSession();
  const { data, status } = useQuery<any[]>({
    queryKey: ['requests'],
    queryFn: () => listRequestsByProject(id)
  });

  const result = useMemo(() => {
    if (status === 'success' && session?.user) {
      const invitesArr = [];
      const requestsArr = [];
      for (const request of data) {
        if (request.sender.id === session.user.id) {
          invitesArr.push(request);
        } else {
          requestsArr.push(request);
        }
      }

      return {
        requests: requestsArr,
        invites: invitesArr
      };
    }

    return {
      requests: [],
      invites: []
    };
  }, [id, data]);

  return (
    <div className="grid grid-cols-2 gap-8">
      <DataSection>
        <DataSectionTitle>Requests</DataSectionTitle>
        <DataSectionContent>
          <div className="bg-white rounded-md p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sender</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Avatar name={request.sender.displayName}>
                        {initials(request.sender.displayName)}
                      </Avatar>
                    </TableCell>
                    <TableCell>{request.createdAt}</TableCell>
                    <TableCell>
                      <Button>Accept</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DataSectionContent>
      </DataSection>

      <DataSection>
        <DataSectionTitle>Invites</DataSectionTitle>
        <DataSectionContent>
          <div className="bg-white rounded-md p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Created at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.invites.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell>
                      <Avatar name={invite.recipient.displayName}>
                        {initials(invite.recipient.displayName)}
                      </Avatar>
                    </TableCell>
                    <TableCell>{invite.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DataSectionContent>
      </DataSection>
    </div>
  );
};
