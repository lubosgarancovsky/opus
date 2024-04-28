import { cn } from '@/utils';
import React, { forwardRef } from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', fullWidth = false, ...props }, ref) => {
    const classes = cn(
      'px-6 py-2 rounded text-white w-fit',
      {
        'bg-primary text-white': variant === 'primary',
        'text-foreground border border-foreground/10 hover:bg-foreground/5':
          variant === 'secondary',
        'w-full': fullWidth
      },
      className
    );
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
