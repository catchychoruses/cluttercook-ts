'use client';

import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { LiteralUnion } from 'react-hook-form';

export const Auth = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}) => (
  <div className="mr-auto flex-col">
    {Object.values(providers).map((provider) => (
      <div className="m-8" key={provider.name}>
        <Button
          className="flex h-16 w-80 gap-4 text-2xl font-semibold"
          onClick={() => signIn(provider.id)}
        >
          {provider.name === 'GitHub' ? <Github /> : <Mail />}
          Sign in with {provider.name}
        </Button>
      </div>
    ))}
  </div>
);
