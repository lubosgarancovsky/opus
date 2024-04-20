import { useProjectContext } from "@/context/project-detail";
import { avatar } from "@/utils/auth";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { NewCollabDialog } from "./NewCollabDialog";

export const CollabList = () => {
  const { collabs } = useProjectContext();

  return (
    <div className="flex gap-1">
      {collabs.items.map((collab) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button className="rounded-full p-2 bg-slate-200 grid place-items-center h-fit w-fit">
                {avatar(collab.collaborator.displayName)}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{collab.collaborator.displayName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <NewCollabDialog />
    </div>
  );
};
