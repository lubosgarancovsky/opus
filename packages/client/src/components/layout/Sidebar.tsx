'use client';

import React from 'react';

import { signOut } from 'next-auth/react';
import { Dashboard, Explore, Folder, Logout, Person, Plus } from '../icons';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { NewProjectDialog } from '../dashboard/ProjectList/NewProjectDialog';

interface SidebarProps {}

const NavLink = ({ href, children, icon, isActive = false }) => {
  return (
    <li>
      <a
        className={cn(
          'p-3 rounded-full flex gap-1.5 hover:bg-neutral-100 duration-150 w-fit text-slate-600',
          {
            'text-white bg-slate-600 hover:bg-slate-500': isActive,
            'hover:bg-slate-300': !isActive
          }
        )}
        href={href}
      >
        {React.isValidElement(icon) && React.cloneElement(icon, { className: 'w-5' })}
      </a>
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const pathName = usePathname();

  const isActive = (label: string) => {
    return pathName.includes(label);
  };

  return (
    <div className="p-8 flex flex-col items-center w-fit gap-8 fixed h-screen">
      <ul className="flex flex-col gap-3 bg-slate-200 w-fit p-1.5 rounded-full">
        <NavLink icon={<Dashboard />} href="/" isActive={pathName === '/'}>
          Dashboard
        </NavLink>
        <NavLink icon={<Folder />} href="/project" isActive={isActive('project')}>
          Projects
        </NavLink>
        <NavLink icon={<Explore />} href="/explore" isActive={isActive('explore')}>
          Explore
        </NavLink>
        <NavLink icon={<Person />} href="/profile" isActive={isActive('profile')}>
          Profile
        </NavLink>
        <NewProjectDialog>
          <Button className="rounded-full" size="icon">
            <Plus className="w-5" />
          </Button>
        </NewProjectDialog>
      </ul>

      <ul className="flex flex-col bg-slate-200 gap-3 w-fit p-1.5 rounded-full">
        <li>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-slate-300 text-slate-600 rounded-full"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <Logout className="w-5" />
          </Button>
        </li>
      </ul>
    </div>
  );
};
