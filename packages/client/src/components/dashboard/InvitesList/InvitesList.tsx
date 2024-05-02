'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { acceptRequest, listRequests } from '@/utils/api/collaborations';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { User } from '@/utils/auth';
import { toDate } from '@/utils';
import { Button } from '@/components/ui/button';
import { Arrow } from '@/components/icons';
import { useRouter } from 'next/navigation';

interface InvitesListProps {}

const RequestCard = ({
  item,
  user,
  onAction
}: {
  item: any;
  user: User | undefined;
  onAction: () => void;
}) => {
  const router = useRouter();
  const type = item.recipient.id === user?.id ? 'invitation' : 'request';

  const accept: any = useMutation({
    mutationKey: ['accept'],
    mutationFn: (id: string) => acceptRequest(id),
    onSuccess: onAction
  });

  const decline: any = useMutation({
    mutationKey: ['decline'],
    mutationFn: (id: string) => decline(id),
    onSuccess: onAction
  });

  return (
    <div
      className={cn('bg-white rounded-md shadow border-t-4 border-blue-500', {
        'border-success': type === 'invitation'
      })}
    >
      <div>
        <div className="border-b p-3 flex justify-between items-center">
          <b className="block">{type === 'invitation' ? 'Invitation' : 'Pending request'}</b>
          <p className="text-xs text-muted-foreground">{toDate(item.createdAt)}</p>
        </div>
        <div className="p-3">
          {type === 'invitation' ? (
            <p>
              You have been invited to collaborate on a project by <b>{item.sender.displayName}</b>
            </p>
          ) : (
            <p>
              Waiting for approval of a request from <b>{item.recipient.displayName}</b>
            </p>
          )}
        </div>
        <div className="p-3 flex justify-end">
          {type === 'request' ? (
            <Button
              variant="link"
              className="text-blue-500 gap-1.5"
              onClick={() => router.push(`/project/${item.project.id}`)}
            >
              Go to project <Arrow className="w-4" />
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="link"
                className="text-danger gap-1.5"
                onClick={() => decline.mutate(item.id)}
              >
                Decline
              </Button>
              <Button
                variant="link"
                className="text-blue-500 gap-1.5"
                onClick={() => accept.mutate(item.id)}
              >
                Accept
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const InvitesList: React.FC<InvitesListProps> = ({}) => {
  const { data: session } = useSession();

  const { data, status, refetch } = useQuery<any[]>({
    queryKey: ['requests', session?.user],
    queryFn: listRequests
  });

  return (
    <div>
      <div className="flex gap-4 items-center mb-4">
        <h3>Collaboration requests</h3>
        <div className="bg-danger rounded-full w-6 h-6 text-white font-bold flex items-center justify-center">
          {data?.length ?? 0}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {status === 'success' &&
          data.map((item) => (
            <RequestCard key={item.id} item={item} user={session?.user} onAction={refetch} />
          ))}
      </div>
    </div>
  );
};
