"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { login } from "@/actions/login";

const LoginForm = () => {
  return (
    <Card className="border-none w-[32rem]">
      <CardHeader>
        <CardTitle>
          <h1>Opus</h1>
        </CardTitle>
        <CardDescription>
          <p>Manage your projects with ease</p>
        </CardDescription>
      </CardHeader>
      <form action={login}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input type="email" id="email" name="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" required />
            </div>
          </div>
        </CardContent>

        <CardFooter className="gap-4 justify-end">
          <Button variant="ghost">Create account</Button>
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
