'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { acceptRequest, listRequests } from '@/utils/api/collaborations';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { User } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { Arrow } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

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
    <div className="w-fit">
      <div className="flex gap-4 items-center">
        <div
          className={cn('w-4 h-4 border-4 rounded-full', {
            'border-primary': type === 'request',
            'border-danger': type === 'invitation'
          })}
        />
        <Badge
          className={cn({
            'bg-primary hover:bg-primary': type === 'request',
            'bg-danger hover:bg-danger': type === 'invitation'
          })}
        >
          {type === 'invitation' ? 'Invitation' : 'Pending request'}
        </Badge>
      </div>
      <div className="ml-8 py-4 text-slate-600 font-medium">
        <b className="block mb-1.5">{item.project.title}</b>
        {user?.id === item.recipient.id ? (
          <p>
            <b>{item.sender.displayName}</b> invited you to collaborate on his project
          </p>
        ) : (
          <p>
            Awaiting approval from <b>{item.recipient.displayName}</b>
          </p>
        )}
      </div>
      <div className="px-4 flex">
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
  );
};

/*
<div className="flex justify-between items-center p-4">
        <div className="text-slate-600">
          <b>
            {user?.id === item.recipient.id ? item.sender.displayName : item.recipient.displayName}
          </b>
          <p className="font-medium">{item.project.title}</p>
        </div>
        <div className="p-3">
          <Badge>{type === 'invitation' ? 'Invitation' : 'Pending request'}</Badge>
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
*/

export const InvitesList: React.FC<InvitesListProps> = ({}) => {
  const { data: session } = useSession();

  const { data, status, refetch } = useQuery<any[]>({
    queryKey: ['requests', session?.user],
    queryFn: listRequests
  });

  return (
    <div>
      <div className="flex gap-4 items-center mb-4">
        <h2 className="text-slate-400">Invitations & Requests</h2>
        <div className="bg-primary rounded-full w-6 h-6 text-white font-bold flex items-center justify-center">
          {data?.length ?? 0}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {status === 'success' &&
          data.map((item) => (
            <RequestCard key={item.id} item={item} user={session?.user} onAction={refetch} />
          ))}
      </div>
    </div>
  );
};
