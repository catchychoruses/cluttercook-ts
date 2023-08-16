'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MakerNavbar = ({ pathname }: { pathname: string }) => (
  <div className="ml-6">
    <Link
      href={'/scrape'}
      className={cn(
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
      className={cn(
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
    <div className="mt-24 md:mt-12">
      {pathname === '/scrape' || pathname === '/create' ? (
        <MakerNavbar pathname={pathname} />
      ) : null}

      <div className="rounded border p-4 md:w-[75vw]">{children}</div>
    </div>
  );
};
