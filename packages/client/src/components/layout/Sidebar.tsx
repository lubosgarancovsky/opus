'use client';

import React from 'react';
import { Avatar } from '../common';
import { signOut, useSession } from 'next-auth/react';
import { Dashboard, Explore, Folder, Logout, Opus, Person } from '../icons';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { initials } from '@/utils';
import { Button } from '../ui/button';

interface SidebarProps {}

const NavLink = ({ href, children, icon, isActive = false }) => {
  return (
    <li>
      <a
        className={cn('p-3 rounded-md flex gap-1.5 hover:bg-neutral-100 duration-150', {
          'text-white bg-black hover:bg-neutral-800': isActive
        })}
        href={href}
      >
        {React.isValidElement(icon) && React.cloneElement(icon, { className: 'w-5' })}
        {children}
      </a>
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const pathName = usePathname();
  const { data } = useSession();

  const isActive = (label: string) => {
    return pathName.includes(label);
  };

  return (
    <div className="flex flex-col gap-12 h-screen">
      <div className="p-8">
        <ul className="flex flex-col gap-3">
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
        </ul>
      </div>

      <div className="mt-auto">
        {data?.user && (
          <div className="border-t p-8 flex gap-4">
            <Avatar name={data.user.displayName}>{initials(data.user.displayName)}</Avatar>
            <Button size="icon" variant="ghost" onClick={() => signOut({ callbackUrl: '/login' })}>
              <Logout className="w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
