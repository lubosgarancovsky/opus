'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createProject } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const NewProjectDialog = ({ children }) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createProject,
    mutationKey: ['create-project'],
    onSuccess: (data) => router.push(`/project/${data.id}`)
  });

  const handleSubmit = (formData: FormData) => {
    const data = {
      title: formData.get('title'),
      description: formData.get('desription'),
      code: formData.get('code'),
      public: formData.get('public') === 'on'
    };

    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-4" action={handleSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
            </div>

            <div>
              <Label htmlFor="desc">Desription</Label>
              <Textarea id="desc" name="desription" />
            </div>

            <div>
              <Label htmlFor="code">Code</Label>
              <Input id="code" name="code" />
            </div>

            <div>
              <Checkbox id="public" className="mr-3" />
              <Label htmlFor="public">Set project as public</Label>
            </div>

            <DialogFooter>
              <Button type="submit">Create project</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
