"use client";

import { useProjectContext } from "@/context/project-detail";
import { NewStoryDialog } from "../story-board";
import { CollabList } from "./CollabList";
import { ProjectProgress } from "./ProjectProgress";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { PublicAvatar } from "../ui/public-details-avatar";
import { timestamp } from "@/utils/date";
import Link from "next/link";
import { SettingsDialog } from "./SettingsDialog";

export const ProjectHeader = () => {
  const { project } = useProjectContext();
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{project.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
            </div>

            <div className="flex gap-8 items-center">
              <b>{timestamp(project.createdAt)}</b>
              {/* <Button variant={"outline"} size={"icon"} asChild>
                <Link href={project.}>

                  <GitBranch />
                </Link>
              </Button> */}
              <PublicAvatar name={project.owner.displayName} />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-24 items-start mt-4">
              <CollabList />
            </div>

            <div className="self-end flex items-center gap-3 w-[48rem]">
              <ProjectProgress />
              <SettingsDialog />
              <NewStoryDialog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/*


*/
