"use client";

import { Story } from "@/utils/api";
import { useEffect, useMemo, useState } from "react";
import { StoryCard } from "./StoryCard";
import { Badge } from "../ui/badge";
import {
  ProjectContextProvider,
  useProjectContext,
} from "@/context/project-detail";
import { NewStoryDialog } from "./NewStoryDialog";
import { StoryDetail } from "../story/StoryDetail";

const sortStories = (stories: Story[]) => {
  const todo: Story[] = [];
  const inProgress: Story[] = [];
  const inTesting: Story[] = [];
  const done: Story[] = [];

  for (const story of stories) {
    switch (story.status) {
      case "to-do":
        todo.push(story);
        break;
      case "in-progress":
        inProgress.push(story);
        break;
      case "in-testing":
        inTesting.push(story);
        break;
      case "done":
        done.push(story);
        break;
    }
  }

  return { todo, inProgress, inTesting, done };
};

const StoryBoardColumn = ({
  title,
  status,
}: {
  title: string;
  status: string;
}) => {
  const { stories } = useProjectContext();

  const filteredStories = useMemo(() => {
    return stories.filter((story) => story.status === status);
  }, [stories]);

  return (
    <div className="rounded-md shadow bg-slate-50 overflow-hidden">
      <div className="p-3 flex justify-between items-center bg-white">
        <b>{title}</b>
        <Badge>{filteredStories.length}</Badge>
      </div>

      <hr />

      <div className="flex flex-col gap-3 p-3">
        {filteredStories.map((item) => (
          <StoryCard story={item} />
        ))}
      </div>
    </div>
  );
};

export const StoryBoard = () => {
  return (
    <>
      <StoryDetail />
      <div className="grid grid-cols-5 gap-3">
        <StoryBoardColumn title="To do" status="to-do" />
        <StoryBoardColumn title="In progress" status="in-progress" />
        <StoryBoardColumn title="In testing" status="in-testing" />
        <StoryBoardColumn title="Done" status="done" />
        <StoryBoardColumn title="Blocked" status="blocked" />
      </div>
    </>
  );
};
