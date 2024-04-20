"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useState } from "react";

export const Notification = ({ item }) => {
  const [state, setState] = useState<"idle" | "declined" | "accepted">("idle");

  const handleAccept = async () => {
    const res = await api(`/api/collaboration/request/${item.id}/accept`, {
      method: "POST",
    });

    if (res.resolved) {
      setState("accepted");
    }
  };

  const handleDecline = async () => {
    const res = await api(`/api/collaboration/request/${item.id}/decline`, {
      method: "DELETE",
    });

    if (res.resolved) {
      setState("declined");
    }
  };

  return (
    <div key={item.id} className="p-4">
      <b>{item.sender.displayName}</b> is requesting a collaboration on{" "}
      <b>{item.project.title}</b> project.
      <div className="flex gap-3 mt-4">
        {state === "idle" && (
          <>
            <Button onClick={handleAccept}>Accept</Button>
            <Button onClick={handleDecline} variant="destructive">
              Decline
            </Button>
          </>
        )}

        {state === "accepted" && (
          <span className="text-green-500">
            You have accepted the collaboration request
          </span>
        )}

        {state === "declined" && (
          <span className="text-red-500">
            You have declined the collaboration request
          </span>
        )}
      </div>
    </div>
  );
};
