import { Page, Project, Story, emptyPage } from "@/utils/api";
import { api } from "@/utils/api/axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useNavigation = () => {
  const { data, status } = useSession();

  const [stories, setStories] = useState<Story[]>([]);
  const [projects, setProjects] = useState(emptyPage<Project>());

  const getAssignedStories = async () => {
    const res = await api<Story[]>("/api/story");

    if (res.resolved) {
      setStories(res.data);
    }
  };

  const getProjects = async () => {
    const res = await api<Page<Project>>("/api/project");
    console.log("PROJECTS", res);

    if (res.resolved) {
      setProjects(res.data);
    }
  };

  useEffect(() => {
    getAssignedStories();
    getProjects();
  }, []);

  return {
    stories,
    projects,
  };
};
