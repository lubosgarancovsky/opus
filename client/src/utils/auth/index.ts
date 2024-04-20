import { signOut } from "next-auth/react";
import { TokenUser } from "./types";

export * from "./types";

export const logout = () => {
  signOut({ callbackUrl: "/login" });
};

export const avatar = (user?: TokenUser | string) => {
  if (!user) return "";

  const displayName = typeof user === "string" ? user : user.displayName;

  const [firstName, lastName] = displayName.split(" ");
  return `${firstName[0]}${lastName[0]}`;
};
