"use client";
import { useProjectContext } from "@/context/project-detail";
import { cn } from "@/lib/utils";
import { Story } from "@/utils/api";
import { Bookmark, LucideBug } from "lucide-react";
import { PublicAvatar } from "../ui/public-details-avatar";

export const StoryCard = ({ story }: { story: Story }) => {
  const { setDetail } = useProjectContext();
  const getPriorityLabel = () => {
    switch (story.priority) {
      case -1:
        return "Low";
      case 0:
        return "Medium";
      case 1:
        return "High";
    }
  };

  return (
    <button
      onClick={() => setDetail(story)}
      className={cn(
        "p-2 border rounded-md shadow-sm bg-white border-l-4 gap-4 flex flex-col cursor-pointer hover:bg-neutral-50 text-left",
        {
          "border-l-red-500": story.type === "bug",
          "border-l-green-500": story.type === "story",
          "bg-green-500/10": story.status === "done",
        }
      )}
    >
      <div className="flex justify-between w-full">
        <div>
          <b>{story.code}</b>
          <p className="text-sm">{story.title}</p>
        </div>
        {story.assignedTo && (
          <PublicAvatar name={story.assignedTo.displayName} />
        )}
      </div>
      <div className="flex gap-3 items-center">
        {story.type === "story" ? (
          <Bookmark className="w-4 text-[#00C917]" fill="#00C917" />
        ) : (
          <LucideBug className="w-4 text-[#E11501]" fill="#E11501" />
        )}
        <div className="flex gap-2 items-center">
          <div
            className={cn("w-2 h-2 rounded-full", {
              "bg-green-500": story.priority === -1,
              "bg-yellow-500": story.priority === 0,
              "bg-red-500": story.priority === 1,
            })}
          ></div>
          <b className="text-xs text-muted-foreground">{getPriorityLabel()}</b>
        </div>
      </div>
    </button>
  );
};
