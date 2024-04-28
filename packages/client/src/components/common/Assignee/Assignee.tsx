'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar } from '../Avatar';
import { initials } from '@/utils';
import { Person } from '@/components/icons';
import { useAssignee } from './useAssignee.hook';

export interface AssigneeProps {
  label: string;
  onChange: (assignee: any) => void;
  assignee?: any;
}

export const Assignee: React.FC<AssigneeProps> = (props) => {
  const { data, open, label, assignTo, setSearchVal, searchVal, assignedTo, setOpen, assignToMe } =
    useAssignee(props);

  return (
    <div className="relative">
      <Label>{label}</Label>
      <button
        type="button"
        className="flex gap-3 items-center mt-1.5 bg-neutral-100 hover:bg-neutral-200 w-full p-2 rounded border"
        onClick={() => setOpen((p) => !p)}
      >
        <Avatar
          color={assignedTo ? '#f52738' : '#e0e0e0'}
          name={assignedTo ? assignedTo.displayName : 'No assignee'}
        >
          {assignedTo ? (
            initials(assignedTo.displayName)
          ) : (
            <Person className="text-neutral-600 w-5" />
          )}
        </Avatar>
      </button>

      {open && (
        <div className="absolute left-0 mt-1 bg-background border rounded-lg shadow-lg w-full p-1">
          <Input
            placeholder="Search..."
            onChange={(e) => setSearchVal(e.target.value)}
            value={searchVal}
          />
          <button
            key="no-assignee"
            type="button"
            className="flex gap-3 items-center hover:bg-neutral-100 p-3 w-full"
            onClick={() => assignTo(null)}
          >
            <Avatar color="#e0e0e0" name="No assignee">
              <Person className="text-neutral-600 w-5" />
            </Avatar>
          </button>
          {data.map((item: any) => (
            <button
              key={item.id}
              type="button"
              className="flex gap-3 items-center hover:bg-neutral-100 p-3 w-full"
              onClick={() => assignTo(item)}
            >
              <Avatar name={item.displayName}>{initials(item.displayName)}</Avatar>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="text-blue-600 hover:underline mt-1.5"
        onClick={() => assignToMe()}
      >
        Assign to me
      </button>
    </div>
  );
};
