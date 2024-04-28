'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useLoginForm = () => {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const login = async (formData: FormData) => {
    const response = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false
    });

    if (!response?.error) {
      return router.push('/');
    }

    setError(true);
  };

  return { login, error };
};
