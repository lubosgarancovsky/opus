"use client";

import { Collaboration, Page, Project, Story, api } from "@/utils/api";
import { createContext, useContext, useState } from "react";

interface ProjectDetailContextType {
  stories: Story[];
  project: Project;
  collabs: Page<Collaboration>;
  newStoryOpen: boolean;
  setNewStoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detail: Story | null;
  setDetail: React.Dispatch<React.SetStateAction<Story | null>>;
  fetchStories: () => void;
  fetchCollabs: () => void;
}

const ProjectDetailContext = createContext<ProjectDetailContextType | null>(
  null
);

export const useProjectContext = () => {
  const ctx = useContext(ProjectDetailContext);

  if (!ctx) {
    throw new Error(
      "useStoryBoardContext must be used within a StoryBoardProvider"
    );
  }

  return ctx;
};

export const ProjectContextProvider = ({
  children,
  initStories,
  project,
  initCollabs,
}: any) => {
  const [stories, setStories] = useState(initStories);
  const [collabs, setCollabs] = useState(initCollabs);
  const [detail, setDetail] = useState<Story | null>(null);
  const [newStoryOpen, setNewStoryOpen] = useState(false);

  const fetchStories = async () => {
    const res = await api(`/api/project/${project.id}/story`);

    if (res.resolved) {
      setStories(res.data);
    }
  };

  const fetchCollabs = async () => {
    const res = await api(`/api/project/${project.id}/collaboration`);

    if (res.resolved) {
      setCollabs(res.data);
    }
  };

  return (
    <ProjectDetailContext.Provider
      value={{
        stories,
        project,
        newStoryOpen,
        setNewStoryOpen,
        collabs,
        detail,
        setDetail,
        fetchStories,
        fetchCollabs,
      }}
    >
      {children}
    </ProjectDetailContext.Provider>
  );
};
