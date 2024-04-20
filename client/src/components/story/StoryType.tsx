import { cn } from "@/lib/utils";
import { Bookmark, LucideBug } from "lucide-react";

export const StoryType = ({
  type,
  withLabel = false,
}: {
  type: string;
  withLabel?: boolean;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={cn("h-8 w-8 rounded-sm grid place-items-center", {
          "bg-[#00C917]": type === "story",
          "bg-[#E11501]": type === "bug",
        })}
      >
        {type === "story" ? (
          <Bookmark className="w-5 text-white" fill="#FFFF" />
        ) : (
          <LucideBug className="w-5 text-white" fill="#FFFF" />
        )}
      </div>
      {withLabel && <b>{type === "story" ? "Story" : "Bug"}</b>}
    </div>
  );
};
