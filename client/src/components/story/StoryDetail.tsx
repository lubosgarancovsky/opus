import { useProjectContext } from "@/context/project-detail";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { StoryType } from "./StoryType";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { StoryStatus, api } from "@/utils/api";
import { STORY_STATUS } from "@/utils/api/story/helper";
import { PublicAvatar } from "../ui/public-details-avatar";
import React from "react";
import { Editable } from "../ui/editable";
import { cn } from "@/lib/utils";

export const StoryDetail = () => {
  const { detail, setDetail, fetchStories } = useProjectContext();

  const handleStatusChange = async (newStatus: StoryStatus) => {
    if (!detail) return;

    const { title, description, type, priority } = detail;

    const data = {
      title,
      description,
      type,
      priority,
      assignedTo: detail.assignedTo?.id ?? null,
      status: newStatus,
    };

    const res = await api(`/api/story/${detail.id}`, {
      method: "PUT",
      data,
    });

    if (res.resolved) {
      setDetail({ ...detail, status: newStatus });
      fetchStories();
    }
  };

  const handleApplyEditable = async (
    inputType: "title" | "desc",
    value: string
  ) => {
    if (!detail) return;

    const { title, description, type, priority, status } = detail;

    const data = {
      title: inputType === "title" ? value : title,
      description: inputType === "desc" ? value : description,
      type,
      priority,
      assignedTo: detail.assignedTo?.id ?? null,
      status,
    };

    const res = await api(`/api/story/${detail.id}`, {
      method: "PUT",
      data,
    });

    if (res.resolved) {
      setDetail({
        ...detail,
        title: data.title,
        description: data.description,
      });
      fetchStories();
    }
  };

  return (
    <>
      {detail && (
        <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
          <DialogContent className="!max-w-5xl">
            <DialogHeader className="font-bold">{detail.code}</DialogHeader>
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex gap-2 items-start">
                  <StoryType type={detail.type} />
                  <Editable
                    as="h3"
                    onApply={(value) => handleApplyEditable("title", value)}
                  >
                    {detail.title}
                  </Editable>

                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className={cn({
                            "bg-green-700 hover:bg-green-600":
                              detail.status === "done",
                          })}
                        >
                          {STORY_STATUS[detail.status]}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {Object.entries(STORY_STATUS).map(
                          ([key, value], index) => (
                            <DropdownMenuItem
                              key={index}
                              className="cursor-pointer"
                              onClick={() =>
                                handleStatusChange(key as StoryStatus)
                              }
                            >
                              {value}
                            </DropdownMenuItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-4">
                  <Editable
                    onApply={(value) => handleApplyEditable("desc", value)}
                  >
                    {detail.description}
                  </Editable>
                </div>
              </div>

              <div>
                <div className="w-full flex flex-col items-start gap-4">
                  <div>
                    <h5 className="mb-2">Author</h5>
                    <PublicAvatar
                      name={detail.createdBy.displayName}
                      showName
                    />
                  </div>

                  <div>
                    <h5 className="mb-2">Assigned to</h5>
                    <PublicAvatar
                      name={detail.createdBy.displayName}
                      showName
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
