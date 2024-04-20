"use client";

import { Avatar } from "@/components/ui/avatar";
import { avatar } from "@/utils/auth";
import { useSession } from "next-auth/react";

export const User = () => {
  const { data } = useSession();

  return (
    <Avatar className="bg-slate-200 grid place-items-center">
      {avatar(data?.user)}
    </Avatar>
  );
};
