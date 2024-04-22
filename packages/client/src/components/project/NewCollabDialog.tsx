"use client";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRef } from "react";
import { useProjectContext } from "@/context/project-detail";
import { api } from "@/utils/api";

export const NewCollabDialog = () => {
  const { project } = useProjectContext();

  const emailRef = useRef<HTMLInputElement>(null);

  const sendInviation = async () => {
    await api("/api/collaboration/request", {
      method: "POST",
      data: {
        projectId: project.id,
        recipient: emailRef.current?.value ?? "",
      },
    });

    if (emailRef.current) {
      emailRef.current.value = "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button className="rounded-full p-2 border-2 border-dashed border-slate-400 grid place-items-center h-fit w-fit">
                <Plus className="text-slate-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add collaborator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite collaborator</DialogTitle>
          <DialogDescription>
            Send an invitation to potential collaborator
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input ref={emailRef} id="email" />
        </div>
        <DialogFooter>
          <Button onClick={sendInviation}>Send invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
