'use client';

import React from 'react';
import { Assignee, Avatar, Editable } from '@/components/common';
import { initials, storyState } from '@/utils';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useStoryDetail } from './useStoryDetail.hook';

export const StoryDetail: React.FC = () => {
  const { story, close, assignTo, edit } = useStoryDetail();
  return (
    <>
      {story && (
        <Dialog open={!!story} onOpenChange={close}>
          <DialogContent>
            <DialogHeader>
              <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center">
                  <div className="p-3 bg-danger h-fit"></div>
                  <b className="text-sm">{story.code}</b>
                </div>
                <div className="mr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>{storyState(story.status)}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {['to-do', 'in-progress', 'in-testing', 'done', 'blocked'].map(
                        (item, index) => (
                          <DropdownMenuItem key={index} onClick={() => edit({ status: item })}>
                            {storyState(item)}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </DialogHeader>
            <div>
              <Editable as="h4" onEdit={(title) => edit({ title })}>
                {story.title}
              </Editable>
              <Editable as="p" onEdit={(description) => edit({ description })}>
                {story.description}
              </Editable>

              <div className="mt-8 flex flex-col gap-4">
                <div>
                  <Label>Created by</Label>
                  <div className="flex gap-3 items-center mt-1.5 bg-neutral-100 w-full p-2 rounded border">
                    <Avatar color="#f52738">{initials(story.createdBy.displayName)}</Avatar>
                    <p>{story.createdBy.displayName}</p>
                  </div>
                </div>

                <Assignee
                  label={'Assigned to'}
                  assignee={story.assignedTo ?? null}
                  onChange={assignTo}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
