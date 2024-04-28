'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Assignee } from '@/components/common';
import { useMutation } from '@tanstack/react-query';
import { createStory, listStoriesByProjectId } from '@/utils';
import { stories } from '@/store/features/ProjectSlice';

export const NewStoryDialog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { project } = useSelector((state: any) => state.project);
  const [assignedTo, setAssignedTo] = React.useState<string | null>(null);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  const refetch = useMutation({
    mutationFn: () => listStoriesByProjectId(project?.id),
    mutationKey: ['stories']
  });

  const mutation = useMutation({
    mutationFn: (newStory: any) => createStory(project?.id, newStory),
    mutationKey: ['create-story'],
    onSuccess: () => refetch.mutate()
  });

  useEffect(() => {
    if (refetch.status === 'success') {
      dispatch(stories(refetch.data ?? []));
    }
  }, [refetch.data]);

  const handleSubmit = (formData: FormData) => {
    const storyDto = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as string,
      priority: Number(formData.get('priority') as string),
      assignedTo: assignedTo
    };

    mutation.mutate(storyDto);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new story</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" action={handleSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>

          <div>
            <Label>Type</Label>
            <Select name="type" defaultValue="story">
              <SelectTrigger>
                <SelectValue placeholder="Story" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="story">Story</SelectItem>
                <SelectItem value="bug">Bug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>
            <Select name="priority" defaultValue="0">
              <SelectTrigger>
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">
                  <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-success block" />
                    <span className="block">Low</span>
                  </div>
                </SelectItem>
                <SelectItem value="0" className="flex gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-warning block" />
                    <span className="block">Medium</span>
                  </div>
                </SelectItem>
                <SelectItem value="1" className="flex flex-row gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-danger block" />
                    <span className="block">Heigh</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Assignee label="Assign to" onChange={(val) => setAssignedTo(val)} />
          </div>

          <DialogFooter>
            <Button type="submit">Create story</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
