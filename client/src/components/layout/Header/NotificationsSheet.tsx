"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CollaborationRequest, Page, api, emptyPage } from "@/utils/api";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Notification } from "./Notification";

export const NotificationsSheet = () => {
  const { data } = useSession();
  const [notifications, setNotifications] = useState<
    Page<CollaborationRequest>
  >(emptyPage<any>());

  const fetchRequests = async () => {
    if (data?.user) {
      const response = await api<Page<CollaborationRequest>>(
        "/api/collaboration/request",
        {
          params: {
            filter: `recipientId==${data.user.sub}`,
          },
        }
      );

      if (response.resolved) {
        setNotifications(response.data);
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <Bell className="w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-8">
          {notifications.items.map((item) => (
            <Notification key={item.id} item={item} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
