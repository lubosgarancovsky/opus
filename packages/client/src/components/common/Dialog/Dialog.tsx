'use client';

import { Close } from '@/components/icons';
import React from 'react';

export interface DialogProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed grid place-items-center top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm">
      <div role="dialog" autoFocus className="p-4 w-[48rem] rounded bg-white relative">
        <button
          className="absolute top-2 right-2 ml-auto hover:bg-slate-100 p-1.5 rounded-full duration-150"
          onClick={onClose}
        >
          <Close className="w-4" />
        </button>

        {children}
      </div>
    </div>
  );
};
