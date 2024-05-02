'use client';

import React from 'react';
import { Avatar } from '@/components/common';
import { Plus } from '@/components/icons';
import { initials } from '@/utils';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { sendInvitation } from '@/utils/api/collaborations';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const InvitationDialog: React.FC<{ isOpen: boolean; onClose: () => void; projectId: string }> = ({
  isOpen,
  onClose,
  projectId
}) => {
  const mutation = useMutation({
    mutationKey: ['invite'],
    mutationFn: (recipient: string) => sendInvitation(recipient, projectId)
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      if (!inputRef.current.value) return;

      mutation.mutate(inputRef.current.value);
      onClose();
      inputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite collaborator</DialogTitle>
        </DialogHeader>
        <div>
          <Label>E-mail</Label>
          <Input ref={inputRef} type="email" placeholder="john.doe@gmail.com" />
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const Collaborations: React.FC = () => {
  const { collaborations, project } = useSelector((state: any) => state.project);
  const { data } = useSession();

  const [isInviteOpen, setIsInviteOpen] = React.useState<boolean>(false);

  return (
    <>
      <InvitationDialog
        projectId={project?.id}
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
      <div className="flex gap-1.5 items-center">
        {collaborations?.items &&
          collaborations.items.map((item: any) => (
            <Avatar key={item.id} className="">
              {initials(item.collaborator.displayName)}
            </Avatar>
          ))}
        {data?.user?.id === project?.owner.id && (
          <button
            className="border border-dashed border-black rounded-full p-1.5"
            onClick={() => setIsInviteOpen(true)}
          >
            <Plus className="w-6" />
          </button>
        )}
      </div>
    </>
  );
};
