import { Settings, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Editable } from "../ui/editable";
import { useProjectContext } from "@/context/project-detail";
import { PublicAvatar } from "../ui/public-details-avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { timestamp } from "@/utils/date";
import { api } from "@/utils/api";

export const SettingsDialog = () => {
  const { project, collabs, fetchCollabs } = useProjectContext();

  const handleDelete = async (id: string) => {
    const res = await api(`/api/collaboration/${id}`, { method: "DELETE" });
    if (res.resolved) {
      fetchCollabs();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Project settings</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <h5>Title</h5>
            <Editable onApply={() => {}}>{project.title}</Editable>
          </div>

          <div>
            <h5>Description</h5>
            <Editable onApply={() => {}}>{project.description}</Editable>
          </div>

          <div>
            <h5>Collaborators</h5>
            <div className="mt-2">
              {collabs.items.length ? (
                collabs.items.map((item) => (
                  <div className="flex justify-between items-center p-2 border-t last:border-b">
                    <PublicAvatar
                      name={item.collaborator.displayName}
                      showName
                    />

                    <div className="flex gap-8 items-center">
                      <span>Since {timestamp(item.createdAt)}</span>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <span>Empty</span>
              )}
            </div>

            <div className="mt-4 ml-auto w-fit">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink>1</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          <div>
            <h5>Requests</h5>
          </div>

          <div>
            <h5 className="text-red-500">Danger zone</h5>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
