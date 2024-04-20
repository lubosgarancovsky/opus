import { ProjectHeader, StoryBoard } from "@/components";
import { ProjectContextProvider } from "@/context/project-detail";
import {
  Collaboration,
  Page,
  Project,
  Story,
  api,
  emptyPage,
} from "@/utils/api";
import { baseUrl } from "@/utils/api/axios/server/helper";

const fetchProjectDetail = async (projectId: string) => {
  const response = await api<Project>(`${baseUrl()}/v1/project/${projectId}`);

  if (response.resolved) {
    return response.data;
  }

  throw new Error(JSON.stringify(response.error));
};

const fetchStories = async (projectId: string) => {
  const response = await api<Story[]>(
    `${baseUrl()}/v1/project/${projectId}/story`
  );

  if (response.resolved) {
    return response.data;
  }

  return [];
};

const fetchCollabs = async (projectId: string) => {
  const response = await api<Page<Collaboration>>(
    `${baseUrl()}/v1/project/${projectId}/collaboration`
  );

  if (response.resolved) {
    return response.data;
  }

  return emptyPage<Story>();
};

async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project: Project = await fetchProjectDetail(params.projectId);
  const stories: Story[] = await fetchStories(params.projectId);
  const collabs: Page<Collaboration> = await fetchCollabs(params.projectId);

  return (
    <ProjectContextProvider
      initStories={stories}
      initCollabs={collabs}
      project={project}
    >
      <div className="flex flex-col gap-4">
        <ProjectHeader />
        <StoryBoard />
      </div>
    </ProjectContextProvider>
  );
}

export default ProjectDetailPage;
