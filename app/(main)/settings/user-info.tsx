'use client';

import { User2Icon } from 'lucide-react';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

export default function UserInfo({ name, image, email }: Props) {
  useEffect(() => {
    if (!name) {
      redirect('/');
    }
  });

  return (
    <>
      <h1 className="text-lg font-semibold">User Info</h1>
      {!image ? (
        <User2Icon className="rounded-md border" size="10rem" />
      ) : (
        <Image
          className=" rounded-md border"
          src={image}
          alt={'profile'}
          width={160}
          height={160}
        ></Image>
      )}
      <p>{name}</p> <p>{email}</p>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </Button>
    </>
  );
}
