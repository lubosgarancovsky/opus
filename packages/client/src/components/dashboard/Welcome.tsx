'use client';

import { useSession } from 'next-auth/react';

export const Welcome = () => {
  const { data } = useSession();

  return (
    <div>
      <h1 className="text-slate-600">
        <span className="font-normal text-slate-400">Welcome,</span> {data?.user?.firstName}
      </h1>
    </div>
  );
};
