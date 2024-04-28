import { auth } from '@/auth';
import { Page, Project, Story, baseUrl, emptyPage } from '@/utils';
import axios from 'axios';
import { ProjectDetail as Detail } from '@/components';
import { Collaboration } from '@/utils/api/collaborations';

const fetchProjectDetail = async (id: string): Promise<Project | null> => {
  try {
    const session = await auth();
    const response = await axios.get(`${baseUrl()}/v1/project/${id}`, {
      headers: {
        ...(session ? { Authorization: `Bearer ${session.accessToken}` } : {})
      }
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

const fetchStories = async (id: string): Promise<Story[]> => {
  try {
    const session = await auth();
    const response = await axios.get(`${baseUrl()}/v1/project/${id}/story`, {
      headers: {
        ...(session ? { Authorization: `Bearer ${session.accessToken}` } : {})
      }
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

const fetchCollaborations = async (id: string): Promise<Page<Collaboration>> => {
  try {
    const session = await auth();
    const response = await axios.get(`${baseUrl()}/v1/project/${id}/collaboration`, {
      headers: {
        ...(session ? { Authorization: `Bearer ${session.accessToken}` } : {})
      }
    });
    return response.data;
  } catch (error) {
    return emptyPage<Collaboration>();
  }
};

const ProjectDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const [project, stories, collabs] = await Promise.all([
    fetchProjectDetail(id),
    fetchStories(id),
    fetchCollaborations(id)
  ]);
  return <>{project && <Detail project={project} stories={stories} collabs={collabs}></Detail>}</>;
};

export default ProjectDetail;
