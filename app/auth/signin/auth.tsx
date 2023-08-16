'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Github, Mail } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { LiteralUnion } from 'react-hook-form';

export const Auth = ({
  providers,
  token,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  token: string | undefined;
}) => {
  const [formValues, setFormValues] = useState({
    email: 'user@email.com',
    password: '1234',
  });
  const { toast } = useToast();
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      if (!res?.error) {
        toast({ description: 'Logged in!' });
        router.refresh();
      } else {
        console.log('invalid email or password');
      }
    } catch (error: any) {}
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="mr-auto flex-col p-8">
      <div className="m-2" key={providers['github'].name}>
        <Button
          className="w-62 flex h-16 text-xl font-semibold"
          onClick={() => signIn(providers['github'].id)}
        >
          {providers['github'].name === 'GitHub' ? <Github /> : <Mail />}
          Sign in with {providers['github'].name}
        </Button>
      </div>
      <Separator className="mt-8" />
      <div className=" m-auto flex w-full flex-col items-center p-4">
        <h2 className="m-4 mb-2 text-xl font-semibold">Credentials signin: </h2>

        <form onSubmit={onSubmit}>
          <input name="crsfToken" hidden defaultValue={token} />
          <div>
            <Label className="text-md py-2" htmlFor="email">
              Username:
            </Label>
            <Input
              className="m-auto mb-4 h-10 w-60"
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              defaultValue={'user@email.com'}
            />
          </div>
          <div>
            <Label className="text-md py-2" htmlFor="password">
              Password:
            </Label>
            <Input
              className="m-auto h-10 w-60"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              defaultValue={'1234'}
            />
          </div>
          <Button type="submit" className="m-4 w-28 font-semibold">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
