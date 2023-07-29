'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function Page() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });

  return (
    <div className=" m-auto flex w-1/3 flex-col items-center gap-4 p-4">
      <p>{session.data?.user?.name}</p> <p>{session.data?.user?.email}</p>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
