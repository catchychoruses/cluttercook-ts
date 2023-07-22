'use client';

import { Card } from '@/components/ui/card';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const Auth = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });

  return status === 'loading' ? (
    <p>logging in...</p>
  ) : (
    <Card className="flex h-[70vh] w-[20rem] justify-center p-4">
      <h1>ClutterCook</h1>
      <button onClick={() => signIn()}>Sign In</button>
    </Card>
  );
};
