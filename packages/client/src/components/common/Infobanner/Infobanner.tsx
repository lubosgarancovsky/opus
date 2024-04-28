import { cn } from '@/utils';
import React from 'react';

interface InfobannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

export const Infobanner: React.FC<InfobannerProps> = ({
  title,
  children,
  variant = 'info',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-3 border rounded',
        {
          'bg-primary/20 text-primary border-primary': variant === 'info',
          'bg-success/20 text-success border-success': variant === 'success',
          'bg-warning/20 text-warning border-warning': variant === 'warning',
          'bg-danger/20 text-danger border-danger': variant === 'danger'
        },
        className
      )}
      {...props}
    >
      <span className="font-bold">{title}</span>
      {children && <div className="text-foreground">{children}</div>}
    </div>
  );
};
