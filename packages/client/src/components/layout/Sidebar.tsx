'use client';

import React from 'react';
import { Button } from '../common';
import { signOut } from 'next-auth/react';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="p-8">
      <Button onClick={() => signOut({ callbackUrl: '/login' })}>Log out</Button>
    </div>
  );
};
