'use client';
import { Check, Close } from '@/components/icons';
import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';

interface EditableProps {
  as?: keyof JSX.IntrinsicElements;
  children?: string;
  onEdit: (value: string) => void;
  className?: string;
}

export const Editable: React.FC<EditableProps> = ({
  onEdit,
  children,
  className,
  as: Component = 'p'
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const value = useRef<string>(children ?? '');

  const handleSave = () => {
    setIsEditing(false);
    onEdit(value.current);
  };

  return (
    <>
      {isEditing ? (
        <div>
          <Component
            contentEditable
            autoFocus
            className="p-2 border-2 border-primary rounded active:outline-2 outline-primary w-full"
            onInput={(e: any) => (value.current = e.target.textContent)}
          >
            {children}
          </Component>
          <div className="flex gap-3 w-full justify-end mt-1.5">
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded bg-danger text-white"
            >
              <Close className="w-5" />
            </button>
            <button onClick={handleSave} className="p-1.5 rounded bg-primary text-white">
              <Check className="w-5" />
            </button>
          </div>
        </div>
      ) : (
        <Component
          onDoubleClick={() => setIsEditing(true)}
          className={cn('cursor-pointer', className)}
        >
          {children}
        </Component>
      )}
    </>
  );
};
