import React from 'react';

interface CardProps {
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, icon }) => {
  return (
    <div className="rounded-xl shadow shadow-slate-200 bg-white p-4 col-span-3 flex flex-col gap-4">
      {icon && icon}
      <b>{title}</b>
      {children && <p>{children}</p>}
    </div>
  );
};
