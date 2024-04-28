'use client';

import { Infobanner } from '@/components';
import React from 'react';
import { useLoginForm } from './useLoginForm.hook';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { login, error } = useLoginForm();

  return (
    <form className="flex flex-col gap-4 mt-12" action={login}>
      {error && (
        <Infobanner title="Login error" variant="danger">
          You have entered invalid credentials
        </Infobanner>
      )}
      <div>
        <Label>E-mail</Label>
        <Input name="email" aria-required required />
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" name="password" aria-required required />
      </div>
      <a href="#" className="text-primary hover:underline w-fit">
        I dont have an account yet.
      </a>
      <div className="flex gap-4 justify-end">
        <Button>Log in</Button>
      </div>
    </form>
  );
};
