'use client';

import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const RecipeMaker = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="container mt-10 ">
      <div className="ml-6">
        <Link
          href={'/scrape'}
          className={clsx(
            buttonVariants({ variant: 'outline' }),
            'relative top-[0.0625rem] rounded-b-none border-b-0',
            pathname !== '/scrape' ? ' border-r-0 bg-gray-200' : false
          )}
        >
          Scrape
        </Link>
        <Link
          href={'/compose'}
          className={clsx(
            buttonVariants({ variant: 'outline' }),
            'relative top-[0.0625rem] rounded-b-none border-b-0',
            pathname !== '/compose' ? 'red border-l-0 bg-gray-200' : false
          )}
        >
          Compose
        </Link>
      </div>

      <div className=" w-[70vw] rounded border">{children}</div>
    </div>
  );
};
