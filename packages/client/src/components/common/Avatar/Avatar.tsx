import { cn } from '@/utils';
import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  color?: string;
  name?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className, color, name, ...props }) => {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={cn(
          'w-8 h-8 rounded-full bg-red-500 grid place-items-center text-white font-medium text-sm',
          className
        )}
        {...(color ? { style: { backgroundColor: color } } : {})}
        {...props}
      >
        {children}
      </div>
      {name && <p>{name}</p>}
    </div>
  );
};
