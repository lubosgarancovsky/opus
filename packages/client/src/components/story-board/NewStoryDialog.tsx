import { useProjectContext } from "@/context/project-detail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "next-auth/react";
import { NewStory, api } from "@/utils/api";

export const NewStoryDialog = () => {
  const { project, collabs, newStoryOpen, setNewStoryOpen, fetchStories } =
    useProjectContext();
  const { data } = useSession();

  const handleSubmit = async (formData: FormData) => {
    const assignee = formData.get("assignee") as string;
    console.log("ASSIGNEE", assignee);
    const newStory: NewStory = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as "bug" | "story",
      assignedTo: assignee === "no-assignee" ? null : assignee,
      priority: Number(formData.get("priority")) as -1 | 0 | 1,
    };

    const response = await api(`/api/project/${project.id}/story`, {
      method: "POST",
      data: newStory,
    });

    if (response.resolved) {
      fetchStories();
      setNewStoryOpen(false);
    }
  };

  return (
    <Dialog open={newStoryOpen} onOpenChange={setNewStoryOpen}>
      <DialogTrigger asChild>
        <Button>New story</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Story</DialogTitle>
          <DialogDescription>
            Create new user story for this project
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-3" action={handleSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select name="type">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Choose story type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority">
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Low</SelectItem>
                  <SelectItem value="0">Medium</SelectItem>
                  <SelectItem value="1">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="Assign to">Assign to</Label>
              <Select name="assignee">
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="No assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"no-assignee"}>No assignee</SelectItem>
                  {data?.user && (
                    <SelectItem value={data.user.sub}>
                      {data.user.displayName}
                    </SelectItem>
                  )}
                  {collabs.items.map((collab) => (
                    <SelectItem value={collab.collaborator.id}>
                      {collab.collaborator.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
