'use client';

import { useMemo, useState } from 'react';
import { listCollaborationsByProject } from '@/utils/api/collaborations';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { AssigneeProps } from './Assignee';
import { Story } from '@/utils';

export const useAssignee = ({ label, onChange, assignee }: AssigneeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [assignedTo, setAssignedTo] = useState<any>(assignee);
  const [searchVal, setSearchVal] = useState<string>('');

  const session = useSession();
  const { project } = useSelector((state: any) => state.project);

  const { status, data } = useQuery({
    queryKey: ['collaborations', searchVal],
    queryFn: () => listCollaborationsByProject(project.id, searchVal)
  });

  const assignTo = (user: Story['assignedTo']) => {
    setAssignedTo(user);
    onChange(user);
    setOpen(false);
  };

  const assignToMe = () => {
    const user = session.data?.user;
    assignTo({
      id: user?.id ?? '',
      displayName: user?.displayName ?? ''
    });
  };

  const allData = useMemo(() => {
    if (status === 'success') {
      const users = data.items.map((collab: any) => ({
        id: collab.collaborator.id,
        displayName: collab.collaborator.displayName
      }));

      return [{ id: project.owner.id, displayName: project.owner.displayName }, ...users];
    }

    return [] as Story[];
  }, [status, data]);

  return {
    data: allData,
    open,
    setOpen,
    label,
    assignTo,
    assignedTo,
    searchVal,
    setSearchVal,
    session,
    assignToMe
  };
};
