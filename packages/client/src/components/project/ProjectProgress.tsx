"use client";

import { useProjectContext } from "@/context/project-detail";
import { Progress } from "../ui/progress";
import { useMemo } from "react";

export const ProjectProgress = () => {
  const { stories } = useProjectContext();

  const value = useMemo(() => {
    return (
      (stories.filter((story) => story.status === "done").length /
        stories.length) *
      100
    );
  }, [stories]);

  return <Progress className="progressbar bg-blue-500 h-3" value={value} />;
};
