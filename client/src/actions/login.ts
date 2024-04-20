"use server";
import { signIn } from "../../auth";
export const login = async (formData: FormData) => {
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/",
  });
};
