'use client';

import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MakerNavbar = ({ pathname }: { pathname: string }) => (
  <div className="ml-6">
    <Link
      href={'/scrape'}
      className={clsx(
        buttonVariants({ variant: 'outline' }),
        'relative top-[0.0625rem] w-24 rounded-b-none border-b-0',
        pathname !== '/scrape'
          ? ' border-r-0 bg-secondary'
          : 'hover:bg-transparent'
      )}
    >
      Scrape
    </Link>
    <Link
      href={'/create'}
      className={clsx(
        buttonVariants({ variant: 'outline' }),
        'relative top-[0.0625rem] w-24 rounded-b-none border-b-0',
        pathname !== '/create'
          ? ' border-l-0 bg-secondary'
          : 'hover:bg-transparent'
      )}
    >
      Compose
    </Link>
  </div>
);

export const RecipeMaker = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="container mt-10 ">
      {pathname === '/scrape' || pathname === '/create' ? (
        <MakerNavbar pathname={pathname} />
      ) : null}

      <div className=" w-[70vw] rounded border">{children}</div>
    </div>
  );
};
