import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Page } from './api';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const initials = (name: string): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const parts = name.split(' ');

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  if (parts.length === 1) {
    return `${parts[0].slice(0, 2)}`.toUpperCase();
  }

  return '';
};

export const isWithinRect = (
  cursor: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    cursor.x >= rect.x &&
    cursor.x <= rect.x + rect.width &&
    cursor.y >= rect.y &&
    cursor.y <= rect.y + rect.height
  );
};

export const emptyPage = <T>(): Page<T> => {
  return {
    items: [] as T[],
    totalCount: 0,
    page: 1,
    pageSize: 0
  };
};
